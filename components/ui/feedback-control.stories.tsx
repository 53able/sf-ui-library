import type { Meta, StoryObj } from '@storybook/react';
import { FeedbackControl } from './feedback-control';
import { DataDisplay } from './data-display';

/**
 * FeedbackControlコンポーネントのStory定義
 */
const meta: Meta<typeof FeedbackControl> = {
  title: 'Molecules/FeedbackControl',
  component: FeedbackControl,
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
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '入力と出力の配置方向',
    },
    alignment: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: '配置の整列',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FeedbackControl>;

/**
 * デフォルトのフィードバックコントロール
 */
export const Default: Story = {
  args: {
    input: (
      <input
        type="range"
        min="0"
        max="100"
        defaultValue="50"
        className="w-32 h-2 bg-lcars-dark border border-lcars-blue rounded-lg appearance-none cursor-pointer"
      />
    ),
    output: <DataDisplay value={50} label="Power" unit="%" />,
    label: 'Warp Core',
  },
};

/**
 * 水平配置
 */
export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
    input: (
      <input
        type="range"
        min="0"
        max="100"
        defaultValue="75"
        className="w-32 h-2 bg-lcars-dark border border-lcars-blue rounded-lg appearance-none cursor-pointer"
      />
    ),
    output: <DataDisplay value={75} label="Shield" unit="%" />,
    label: 'Shield Generator',
  },
};

/**
 * 垂直配置
 */
export const Vertical: Story = {
  args: {
    direction: 'vertical',
    input: (
      <input
        type="range"
        min="0"
        max="100"
        defaultValue="25"
        className="w-32 h-2 bg-lcars-dark border border-lcars-blue rounded-lg appearance-none cursor-pointer"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      />
    ),
    output: <DataDisplay value={25} label="Temperature" unit="°C" />,
    label: 'Cooling System',
  },
};

/**
 * ノブコントロールの例
 */
export const KnobControl: Story = {
  args: {
    input: (
      <div className="w-16 h-16 rounded-full border-2 border-lcars-blue bg-lcars-dark flex items-center justify-center cursor-pointer hover:bg-lcars-blue/10">
        <div className="w-2 h-2 bg-lcars-blue rounded-full" />
      </div>
    ),
    output: <DataDisplay value={45} label="Frequency" unit="MHz" />,
    label: 'Communication Array',
    description: 'Adjust frequency for optimal signal',
  },
};

/**
 * 複数のコントロール
 */
export const MultipleControls: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-full max-w-md">
      <FeedbackControl
        input={
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="90"
            className="w-32 h-2 bg-lcars-dark border border-lcars-blue rounded-lg appearance-none cursor-pointer"
          />
        }
        output={<DataDisplay value={90} label="Warp Core" unit="%" />}
        label="Warp Core Efficiency"
      />
      <FeedbackControl
        input={
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="65"
            className="w-32 h-2 bg-lcars-dark border border-lcars-yellow rounded-lg appearance-none cursor-pointer"
          />
        }
        output={<DataDisplay value={65} label="Shields" unit="%" variant="yellow" />}
        label="Shield Strength"
      />
      <FeedbackControl
        input={
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="30"
            className="w-32 h-2 bg-lcars-dark border border-lcars-red rounded-lg appearance-none cursor-pointer"
          />
        }
        output={<DataDisplay value={30} label="Hull" unit="%" variant="red" />}
        label="Hull Integrity"
      />
    </div>
  ),
};

/**
 * 配置の整列バリエーション
 */
export const AlignmentVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-full max-w-md">
      <FeedbackControl
        alignment="start"
        input={
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="50"
            className="w-32 h-2 bg-lcars-dark border border-lcars-blue rounded-lg appearance-none cursor-pointer"
          />
        }
        output={<DataDisplay value={50} label="Start" unit="%" />}
      />
      <FeedbackControl
        alignment="center"
        input={
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="50"
            className="w-32 h-2 bg-lcars-dark border border-lcars-blue rounded-lg appearance-none cursor-pointer"
          />
        }
        output={<DataDisplay value={50} label="Center" unit="%" />}
      />
      <FeedbackControl
        alignment="end"
        input={
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="50"
            className="w-32 h-2 bg-lcars-dark border border-lcars-blue rounded-lg appearance-none cursor-pointer"
          />
        }
        output={<DataDisplay value={50} label="End" unit="%" />}
      />
    </div>
  ),
};

