import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const rootDir = resolve(__dirname, "..");

/**
 * Registryエントリの型定義
 * 最新のshadcn/ui Registry仕様に準拠（2025年7月のユニバーサルレジストリアイテム対応を含む）
 */
interface RegistryEntry {
  name: string;
  type: "components" | "hooks" | "utils" | "universal";
  files: Array<{
    path: string;
    content: string;
    type: "component" | "lib" | "registry" | "css" | "style";
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
  // import文を解析
  const importRegex = /import\s+.*?\s+from\s+["']([^"']+)["']/g;
  const importPaths = Array.from(content.matchAll(importRegex), (match) =>
    match[1]
  );

  const { dependencies, registryDependencies } = importPaths.reduce(
    (acc, importPath) => {
      // 外部パッケージの依存関係
      if (!importPath.startsWith(".") && !importPath.startsWith("@/")) {
        // ReactやReact DOMは除外（peerDependenciesとして扱う）
        if (
          !importPath.startsWith("react") &&
          !importPath.startsWith("@types/")
        ) {
          const packageName = importPath.split("/")[0];
          const dependency = packageName.startsWith("@")
            ? `${packageName}/${importPath.split("/")[1]}`
            : packageName;
          return {
            dependencies: [...acc.dependencies, dependency],
            registryDependencies: acc.registryDependencies,
          };
        }
      }

      // 内部のRegistryコンポーネントへの依存
      if (importPath.startsWith("@/components/ui/")) {
        const componentName = importPath
          .replace("@/components/ui/", "")
          .split("/")[0]
          .replace(/\.tsx?$/, "");
        if (componentName && componentName !== "button") {
          return {
            dependencies: acc.dependencies,
            registryDependencies: [
              ...acc.registryDependencies,
              componentName,
            ],
          };
        }
      }

      return acc;
    },
    { dependencies: [] as string[], registryDependencies: [] as string[] }
  );

  // 重複を削除
  return {
    dependencies: Array.from(new Set(dependencies)),
    registryDependencies: Array.from(new Set(registryDependencies)),
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

    const baseFiles: RegistryEntry["files"] = [
      {
        path: `components/ui/${componentPath}`,
        content,
        type: "component",
      },
    ];

    // utilsが必要な場合は追加
    const files: RegistryEntry["files"] = needsUtils
      ? (() => {
          const utilsPath = join(rootDir, "lib", "utils.ts");
          const utilsContent = readFileSync(utilsPath, "utf-8");
          return [
            ...baseFiles,
            {
              path: "lib/utils.ts",
              content: utilsContent,
              type: "lib" as const,
            },
          ];
        })()
      : baseFiles;

    // Storybook URLを生成
    const storybookUrl = getStorybookUrl(componentName, storybookBaseUrl);

    const entry: RegistryEntry = {
      name: componentName,
      type: "components",
      files,
      dependencies: dependencies.length > 0 ? dependencies : undefined,
      registryDependencies:
        registryDependencies.length > 0 ? registryDependencies : undefined,
      peerDependencies: ["react", "react-dom"],
      ...(storybookUrl
        ? {
            storybook: {
              url: storybookUrl,
              title: componentName,
            },
          }
        : {}),
    };

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

  // コンポーネントエントリを生成
  const registry = componentFiles
    .map((file) => {
      const componentName = file.replace(/\.tsx$/, "");
      return createRegistryEntry(file, componentName, storybookBaseUrl);
    })
    .filter((entry): entry is RegistryEntry => entry !== null);

  // utilsファイルの重複を削除（各コンポーネントに含まれているutilsを統合）
  const hasUtils = registry.some((entry) =>
    entry.files.some((f) => f.path === "lib/utils.ts")
  );

  const registryWithUtilsRemoved = registry.map((entry) => {
    const hasUtilsFile = entry.files.some((f) => f.path === "lib/utils.ts");
    if (!hasUtilsFile) {
      return entry;
    }

    const filesWithoutUtils = entry.files.filter(
      (f) => f.path !== "lib/utils.ts"
    );
    const registryDependencies = entry.registryDependencies
      ? entry.registryDependencies.includes("utils")
        ? entry.registryDependencies
        : [...entry.registryDependencies, "utils"]
      : ["utils"];

    return {
      ...entry,
      files: filesWithoutUtils,
      registryDependencies,
    };
  });

  // utilsエントリを追加（必要な場合）
  const registryWithUtils = hasUtils
    ? (() => {
        const utilsPath = join(rootDir, "lib", "utils.ts");
        const utilsContent = readFileSync(utilsPath, "utf-8");
        return [
          {
            name: "utils",
            type: "utils" as const,
            files: [
              {
                path: "lib/utils.ts",
                content: utilsContent,
                type: "lib" as const,
              },
            ],
            dependencies: ["clsx", "tailwind-merge"],
          },
          ...registryWithUtilsRemoved,
        ];
      })()
    : registryWithUtilsRemoved;

  // スタイルファイルとフォントローダーを追加
  const themePath = join(rootDir, "styles", "sf-ui-theme.css");
  const fontsPath = join(rootDir, "styles", "fonts.tsx");
  const themeContent = readFileSync(themePath, "utf-8");
  const fontsContent = readFileSync(fontsPath, "utf-8");

  const finalRegistry = [
    // テーマスタイル（ユニバーサルアイテム - フレームワーク非依存）
    // 最新仕様（2025年7月）のユニバーサルレジストリアイテムを使用
    {
      name: "sf-ui-theme",
      type: "universal" as const,
      files: [
        {
          path: "styles/sf-ui-theme.css",
          content: themeContent,
          type: "css" as const,
        },
      ],
      peerDependencies: ["tailwindcss"],
    },
    // フォントローダー（Reactコンポーネントなのでcomponentsタイプ）
    {
      name: "sf-ui-fonts",
      type: "components" as const,
      files: [
        {
          path: "styles/fonts.tsx",
          content: fontsContent,
          type: "component" as const,
        },
      ],
      peerDependencies: ["react", "react-dom"],
    },
    ...registryWithUtils,
  ];

  // registry.jsonを出力
  const outputPath = join(rootDir, "registry.json");
  writeFileSync(
    outputPath,
    JSON.stringify(finalRegistry, null, 2),
    "utf-8"
  );

  console.log(`✅ Registry generated: ${outputPath}`);
  console.log(`📦 Components registered: ${finalRegistry.length}`);
};

// スクリプト実行
buildRegistry();

