import type { StorybookConfig } from '@storybook/nextjs-vite';
import { mergeConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: [
    '../components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../registry/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/nextjs-vite',
  async viteFinal(config) {
    const rootDir = path.resolve(__dirname, '../');
    return mergeConfig(config, {
      // Vercel環境で/storybookパスでホストするためのベースパス設定
      base: '/storybook/',
      resolve: {
        alias: {
          '@': rootDir,
        },
      },
    });
  },
};
export default config;