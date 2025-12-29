import type { Meta, StoryObj } from '@storybook/react';
import { DataDisplay } from '@/registry/sf-ui/data-display/data-display';

/**
 * DataDisplayコンポーネントのStory定義
 */
const meta: Meta<typeof DataDisplay> = {
  title: 'Atoms/DataDisplay',
  component: DataDisplay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'orange', 'red', 'yellow', 'purple', 'gray', 'green'],
      description: 'カラーバリアント',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl', '2xl', '3xl', '4xl'],
      description: 'サイズ',
    },
    glow: {
      control: 'select',
      options: ['none', 'subtle', 'normal', 'intense'],
      description: '発光効果の強さ',
    },
    value: {
      control: 'number',
      description: '表示する値',
    },
    label: {
      control: 'text',
      description: 'ラベルテキスト',
    },
    unit: {
      control: 'text',
      description: '単位テキスト',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataDisplay>;

/**
 * デフォルトのデータ表示
 */
export const Default: Story = {
  args: {
    value: 1009,
    label: 'Warp Core',
    unit: '%',
  },
};

/**
 * 大きな数値表示
 */
export const LargeValue: Story = {
  args: {
    value: 7490,
    label: 'Power',
    unit: 'MW',
    size: '2xl',
    glow: 'intense',
  },
};

/**
 * カラーバリエーション
 */
export const ColorVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <DataDisplay value={100} label="Default" unit="%" variant="default" />
      <DataDisplay value={200} label="Orange" unit="%" variant="orange" />
      <DataDisplay value={300} label="Red" unit="%" variant="red" />
      <DataDisplay value={400} label="Yellow" unit="%" variant="yellow" />
      <DataDisplay value={500} label="Purple" unit="%" variant="purple" />
      <DataDisplay value={600} label="Gray" unit="%" variant="gray" />
      <DataDisplay value={700} label="Green" unit="%" variant="green" />
    </div>
  ),
};

/**
 * 発光効果のバリエーション
 */
export const GlowVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 bg-black p-8">
      <DataDisplay value={1000} label="None" glow="none" />
      <DataDisplay value={2000} label="Subtle" glow="subtle" />
      <DataDisplay value={3000} label="Normal" glow="normal" />
      <DataDisplay value={4000} label="Intense" glow="intense" />
    </div>
  ),
};

/**
 * サイズバリエーション
 */
export const SizeVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <DataDisplay value={100} label="Small" size="sm" />
      <DataDisplay value={200} label="Default" size="default" />
      <DataDisplay value={300} label="Large" size="lg" />
      <DataDisplay value={400} label="XL" size="xl" />
      <DataDisplay value={500} label="2XL" size="2xl" />
      <DataDisplay value={600} label="3XL" size="3xl" />
      <DataDisplay value={700} label="4XL" size="4xl" />
    </div>
  ),
};

/**
 * 文字列値の表示
 */
export const StringValue: Story = {
  args: {
    value: 'ST-001',
    label: 'Station ID',
  },
};

/**
 * カスタムフォーマット
 */
export const CustomFormat: Story = {
  args: {
    value: 1234567.89,
    label: 'Balance',
    unit: 'USD',
    formatValue: (value: number | string) => {
      if (typeof value === 'number') {
        return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }
      return String(value);
    },
  },
};

