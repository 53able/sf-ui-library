import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

/**
 * ButtonコンポーネントのStory定義
 */
const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'ボタンのバリアント',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'ボタンのサイズ',
    },
    asChild: {
      control: 'boolean',
      description: 'Radix UIのSlotコンポーネントとして使用するか',
    },
    disabled: {
      control: 'boolean',
      description: '無効化状態',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * デフォルトのボタン
 */
export const Default: Story = {
  args: {
    children: 'Button',
  },
};

/**
 * 破壊的なアクション用のボタン
 */
export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
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
 * セカンダリスタイルのボタン
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
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
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">🚀</Button>
    </div>
  ),
};

/**
 * 無効化状態
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button disabled>Disabled</Button>
      <Button variant="destructive" disabled>
        Disabled Destructive
      </Button>
      <Button variant="outline" disabled>
        Disabled Outline
      </Button>
    </div>
  ),
};

