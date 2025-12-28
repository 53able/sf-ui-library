import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const rootDir = resolve(__dirname, "..");

/**
 * Registryエントリの型定義
 */
interface RegistryEntry {
  name: string;
  type: "components" | "hooks" | "utils";
  files: Array<{
    path: string;
    content: string;
    type: "component" | "lib" | "registry";
  }>;
  dependencies?: string[];
  registryDependencies?: string[];
  peerDependencies?: string[];
  devDependencies?: string[];
  storybook?: {
    url: string;
    title?: string;
  };
}

/**
 * コンポーネントファイルから依存関係を解析
 */
const analyzeDependencies = (content: string): {
  dependencies: string[];
  registryDependencies: string[];
} => {
  const dependencies = new Set<string>();
  const registryDependencies = new Set<string>();

  // import文を解析
  const importRegex = /import\s+.*?\s+from\s+["']([^"']+)["']/g;
  let match: RegExpExecArray | null;

  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];

    // 外部パッケージの依存関係
    if (!importPath.startsWith(".") && !importPath.startsWith("@/")) {
      // ReactやReact DOMは除外（peerDependenciesとして扱う）
      if (
        !importPath.startsWith("react") &&
        !importPath.startsWith("@types/")
      ) {
        const packageName = importPath.split("/")[0];
        if (packageName.startsWith("@")) {
          dependencies.add(`${packageName}/${importPath.split("/")[1]}`);
        } else {
          dependencies.add(packageName);
        }
      }
    }

    // 内部のRegistryコンポーネントへの依存
    if (importPath.startsWith("@/components/ui/")) {
      const componentName = importPath
        .replace("@/components/ui/", "")
        .split("/")[0]
        .replace(/\.tsx?$/, "");
      if (componentName && componentName !== "button") {
        registryDependencies.add(componentName);
      }
    }
  }

  return {
    dependencies: Array.from(dependencies),
    registryDependencies: Array.from(registryDependencies),
  };
};

/**
 * Storybook URLを生成
 */
const getStorybookUrl = (
  componentName: string,
  baseUrl?: string
): string | undefined => {
  if (!baseUrl) {
    return undefined;
  }

  // StorybookのURL形式: {baseUrl}/?path=/story/{componentName}--default
  // コンポーネント名をケバブケースに変換
  const kebabCase = componentName
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .replace(/^-/, "");

  // Storybookのタイトル構造を推測
  // 実際のStorybookのタイトル構造に合わせて調整が必要
  return `${baseUrl}/?path=/story/${kebabCase}--default`;
};

/**
 * コンポーネントファイルを読み込んでRegistryエントリを生成
 */
const createRegistryEntry = (
  componentPath: string,
  componentName: string,
  storybookBaseUrl?: string
): RegistryEntry | null => {
  try {
    const fullPath = join(rootDir, "components", "ui", componentPath);
    const content = readFileSync(fullPath, "utf-8");

    const { dependencies, registryDependencies } = analyzeDependencies(content);

    // utilsへの依存を確認
    const needsUtils = content.includes("@/lib/utils");

    const files: RegistryEntry["files"] = [
      {
        path: `components/ui/${componentPath}`,
        content,
        type: "component",
      },
    ];

    // utilsが必要な場合は追加
    if (needsUtils) {
      const utilsPath = join(rootDir, "lib", "utils.ts");
      const utilsContent = readFileSync(utilsPath, "utf-8");
      files.push({
        path: "lib/utils.ts",
        content: utilsContent,
        type: "lib",
      });
    }

    const entry: RegistryEntry = {
      name: componentName,
      type: "components",
      files,
      dependencies: dependencies.length > 0 ? dependencies : undefined,
      registryDependencies:
        registryDependencies.length > 0 ? registryDependencies : undefined,
      peerDependencies: ["react", "react-dom"],
    };

    // Storybook URLを追加
    const storybookUrl = getStorybookUrl(componentName, storybookBaseUrl);
    if (storybookUrl) {
      entry.storybook = {
        url: storybookUrl,
        title: componentName,
      };
    }

    return entry;
  } catch (error) {
    console.error(`Failed to process ${componentPath}:`, error);
    return null;
  }
};

/**
 * すべてのコンポーネントをスキャンしてRegistryを生成
 */
const buildRegistry = (): void => {
  const componentsDir = join(rootDir, "components", "ui");
  const componentFiles = readdirSync(componentsDir).filter(
    (file) => file.endsWith(".tsx") && !file.endsWith(".stories.tsx")
  );

  const storybookBaseUrl =
    process.env.STORYBOOK_URL || process.env.NEXT_PUBLIC_STORYBOOK_URL;

  const registry: RegistryEntry[] = [];

  for (const file of componentFiles) {
    const componentName = file.replace(/\.tsx$/, "");
    const entry = createRegistryEntry(file, componentName, storybookBaseUrl);

    if (entry) {
      registry.push(entry);
    }
  }

  // utilsファイルの重複を削除（各コンポーネントに含まれているutilsを統合）
  const utilsFiles = new Map<string, string>();
  for (const entry of registry) {
    const utilsFile = entry.files.find((f) => f.path === "lib/utils.ts");
    if (utilsFile) {
      utilsFiles.set(utilsFile.path, utilsFile.content);
      // コンポーネントエントリからutilsファイルを削除
      entry.files = entry.files.filter((f) => f.path !== "lib/utils.ts");
      // registryDependenciesにutilsを追加
      if (!entry.registryDependencies) {
        entry.registryDependencies = [];
      }
      if (!entry.registryDependencies.includes("utils")) {
        entry.registryDependencies.push("utils");
      }
    }
  }

  // utilsエントリを追加（必要な場合）
  if (utilsFiles.size > 0) {
    const utilsPath = join(rootDir, "lib", "utils.ts");
    const utilsContent = readFileSync(utilsPath, "utf-8");
    registry.unshift({
      name: "utils",
      type: "utils",
      files: [
        {
          path: "lib/utils.ts",
          content: utilsContent,
          type: "lib",
        },
      ],
      dependencies: ["clsx", "tailwind-merge"],
    });
  }

  // registry.jsonを出力
  const outputPath = join(rootDir, "registry.json");
  writeFileSync(outputPath, JSON.stringify(registry, null, 2), "utf-8");

  console.log(`✅ Registry generated: ${outputPath}`);
  console.log(`📦 Components registered: ${registry.length}`);
};

// スクリプト実行
buildRegistry();

