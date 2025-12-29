import type { Meta, StoryObj } from '@storybook/react';
import { StatusIndicator } from '@/registry/sf-ui/status-indicator/status-indicator';

/**
 * StatusIndicatorコンポーネントのStory定義
 */
const meta: Meta<typeof StatusIndicator> = {
  title: 'Atoms/StatusIndicator',
  component: StatusIndicator,
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
    status: {
      control: 'select',
      options: ['normal', 'warning', 'danger', 'success'],
      description: 'ステータスの種類',
    },
    shape: {
      control: 'select',
      options: ['circle', 'square', 'rounded'],
      description: 'インジケーターの形状',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'インジケーターのサイズ',
    },
    pulse: {
      control: 'select',
      options: ['none', 'subtle', 'normal', 'intense'],
      description: 'パルスアニメーション',
    },
    label: {
      control: 'text',
      description: 'ラベルテキスト',
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'ラベルの位置',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusIndicator>;

/**
 * デフォルトのステータスインジケーター
 */
export const Default: Story = {
  args: {},
};

/**
 * ステータスバリエーション
 */
export const StatusVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <StatusIndicator status="normal" label="Normal" />
      <StatusIndicator status="warning" label="Warning" />
      <StatusIndicator status="danger" label="Danger" />
      <StatusIndicator status="success" label="Success" />
    </div>
  ),
};

/**
 * 形状のバリエーション
 */
export const Shapes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <StatusIndicator shape="circle" label="Circle" />
      <StatusIndicator shape="square" label="Square" />
      <StatusIndicator shape="rounded" label="Rounded" />
    </div>
  ),
};

/**
 * サイズバリエーション
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <StatusIndicator size="sm" label="Small" />
      <StatusIndicator size="default" label="Default" />
      <StatusIndicator size="lg" label="Large" />
      <StatusIndicator size="xl" label="Extra Large" />
    </div>
  ),
};

/**
 * パルスアニメーションのバリエーション
 */
export const PulseVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <StatusIndicator pulse="none" label="No Pulse" />
      <StatusIndicator pulse="subtle" label="Subtle Pulse" />
      <StatusIndicator pulse="normal" label="Normal Pulse" />
      <StatusIndicator pulse="intense" label="Intense Pulse" />
    </div>
  ),
};

/**
 * ラベル位置のバリエーション
 */
export const LabelPositions: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <StatusIndicator label="Left" labelPosition="left" />
      <StatusIndicator label="Right" labelPosition="right" />
      <StatusIndicator label="Top" labelPosition="top" />
      <StatusIndicator label="Bottom" labelPosition="bottom" />
    </div>
  ),
};

/**
 * ラベルなし
 */
export const WithoutLabel: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <StatusIndicator status="normal" />
      <StatusIndicator status="warning" />
      <StatusIndicator status="danger" />
      <StatusIndicator status="success" />
    </div>
  ),
};

