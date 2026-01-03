#!/usr/bin/env tsx

/**
 * Registry JSONファイル内の相対パスインポートをエイリアスパスに変換するスクリプト
 *
 * 変換対象:
 * - `from "../lcars-panel/lcars-panel"` → `from "@/components/lcars-panel"`
 * - `from "@/components/ui/lcars-panel"` → `from "@/components/lcars-panel"`
 * - `"use client"`ディレクティブの削除（Viteプロジェクト対応）
 * - その他の相対パスも同様に変換
 */

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = fileURLToPath(new URL(".", import.meta.url));

/**
 * Registry JSONファイルの構造
 */
interface RegistryFile {
  files?: Array<{
    content?: string;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}

/**
 * 相対パスをエイリアスパスに変換する
 * @param content - 変換対象のコード文字列
 * @returns 変換後のコード文字列
 */
const transformImports = (content: string): string => {
  let transformed = content;

  // NOTE: "use client" ディレクティブは削除しない
  // - Next.js App Router: 必須（Reactフックを使用するClient Componentに必要）
  // - Vite/その他: 無視されるだけで害はない
  // 参考: https://github.com/53able/sf-ui-library/issues/2

  // `@/registry/sf-ui/[name]/[name]` → `@/components/[name]` に変換
  // 公式推奨: レジストリ内のインポートは @/registry パスを使用
  // shadcn/ui CLIでインストールすると `@/components/` に配置されるため変換が必要
  transformed = transformed.replace(
    /from\s+["']@\/registry\/sf-ui\/([^/"']+)\/[^"']+["']/g,
    'from "@/components/$1"'
  );

  // 後方互換性: `@/components/ui/` → `@/components/` に変換
  transformed = transformed.replace(
    /from\s+["']@\/components\/ui\/([^"']+)["']/g,
    'from "@/components/$1"'
  );

  // 後方互換性: `from "../lcars-panel/lcars-panel"` → `from "@/components/lcars-panel"`
  transformed = transformed.replace(
    /from\s+["']\.\.\/lcars-panel\/lcars-panel["']/g,
    'from "@/components/lcars-panel"'
  );

  return transformed;
};

/**
 * Registry JSONファイルを変換する
 * @param filePath - JSONファイルのパス
 */
const transformRegistryFile = async (filePath: string): Promise<void> => {
  try {
    const content = await readFile(filePath, "utf-8");
    const json = JSON.parse(content) as RegistryFile;

    // files配列内の各ファイルのcontentを変換
    if (json.files && Array.isArray(json.files)) {
      let hasChanges = false;
      for (const file of json.files) {
        if (file.content && typeof file.content === "string") {
          const originalContent = file.content;
          const transformedContent = transformImports(originalContent);
          if (originalContent !== transformedContent) {
            file.content = transformedContent;
            hasChanges = true;
          }
        }
      }

      if (hasChanges) {
        await writeFile(filePath, `${JSON.stringify(json, null, 2)}\n`, "utf-8");
        console.log(`✓ Transformed: ${filePath}`);
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`✗ Error processing ${filePath}:`, errorMessage);
    throw error;
  }
};

/**
 * メイン処理
 */
const main = async (): Promise<void> => {
  const registryDir = join(__dirname, "..", "public", "r");

  try {
    const files = await readdir(registryDir);
    const jsonFiles = files.filter((file) => file.endsWith(".json"));

    if (jsonFiles.length === 0) {
      console.log("No JSON files found in public/r/");
      return;
    }

    console.log(`Found ${jsonFiles.length} JSON file(s) to process...`);

    for (const file of jsonFiles) {
      const filePath = join(registryDir, file);
      await transformRegistryFile(filePath);
    }

    console.log("\n✓ All registry files processed successfully!");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error:", errorMessage);
    process.exit(1);
  }
};

main();
