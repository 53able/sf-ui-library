import type { StorybookConfig } from "@storybook/nextjs-vite";
import { mergeConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../components/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
  ],
  framework: "@storybook/nextjs-vite",
  async viteFinal(config) {
    const rootDir = path.resolve(__dirname, "../");
    return mergeConfig(config, {
      // Vercel環境で/storybookパスでホストするためのベースパス設定
      base: "/storybook/",
      resolve: {
        alias: {
          "@": rootDir,
        },
      },
      // "use client" ディレクティブの警告を抑制
      build: {
        // 本番ビルドではsourcemapを無効化（エラー回避のため）
        sourcemap: false,
        rollupOptions: {
          onwarn(warning, warn) {
            // "use client" ディレクティブに関する警告を無視
            if (
              warning.code === "MODULE_LEVEL_DIRECTIVE" &&
              warning.message?.includes("use client")
            ) {
              return;
            }
            // sourcemap関連のエラーを無視
            if (
              warning.message?.includes("sourcemap") ||
              warning.message?.includes("Can't resolve original location")
            ) {
              return;
            }
            warn(warning);
          },
        },
      },
    });
  },
};
export default config;
