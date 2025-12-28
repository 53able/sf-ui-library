import type { Meta, StoryObj } from '@storybook/react';
import { GlowButton } from './glow-button';

/**
 * GlowButtonコンポーネントのStory定義
 */
const meta: Meta<typeof GlowButton> = {
  title: 'Atoms/GlowButton',
  component: GlowButton,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#000000' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'warning', 'purple', 'green', 'outline', 'ghost', 'link'],
      description: 'ボタンのバリアント',
    },
    shape: {
      control: 'select',
      options: ['default', 'pill', 'lcars'],
      description: 'ボタンの形状',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'ボタンのサイズ',
    },
    glow: {
      control: 'select',
      options: ['none', 'subtle', 'normal', 'intense'],
      description: '発光効果の強さ',
    },
    disabled: {
      control: 'boolean',
      description: '無効化状態',
    },
  },
};

export default meta;
type Story = StoryObj<typeof GlowButton>;

/**
 * デフォルトのGlowButton
 */
export const Default: Story = {
  args: {
    children: 'Engage',
  },
};

/**
 * 破壊的なアクション用のボタン
 */
export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Emergency',
  },
};

/**
 * 警告用のボタン
 */
export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
};

/**
 * 紫のバリアント
 */
export const Purple: Story = {
  args: {
    variant: 'purple',
    children: 'Purple',
  },
};

/**
 * 緑のバリアント（安全/ハッカー）
 */
export const Green: Story = {
  args: {
    variant: 'green',
    children: 'Green',
  },
};

/**
 * アウトラインスタイルのボタン
 */
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

/**
 * ゴーストスタイルのボタン
 */
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};

/**
 * リンクスタイルのボタン
 */
export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link',
  },
};

/**
 * サイズバリエーション
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <GlowButton size="sm">Small</GlowButton>
      <GlowButton size="default">Default</GlowButton>
      <GlowButton size="lg">Large</GlowButton>
      <GlowButton size="icon">🚀</GlowButton>
    </div>
  ),
};

/**
 * 発光効果のバリエーション
 */
export const GlowVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <GlowButton glow="none">No Glow</GlowButton>
      <GlowButton glow="subtle">Subtle Glow</GlowButton>
      <GlowButton glow="normal">Normal Glow</GlowButton>
      <GlowButton glow="intense">Intense Glow</GlowButton>
    </div>
  ),
};

/**
 * 形状バリエーション
 */
export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <GlowButton shape="default">Default</GlowButton>
      <GlowButton shape="pill">Pill Shape</GlowButton>
      <GlowButton shape="lcars">LCARS Shape</GlowButton>
    </div>
  ),
};

/**
 * 無効化状態
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <GlowButton disabled>Disabled</GlowButton>
      <GlowButton variant="destructive" disabled>
        Disabled Destructive
      </GlowButton>
      <GlowButton variant="outline" disabled>
        Disabled Outline
      </GlowButton>
    </div>
  ),
};

