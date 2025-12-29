import type { Meta, StoryObj } from '@storybook/react';
import { DisplayPanel } from '@/registry/sf-ui/display-panel/display-panel';

/**
 * DisplayPanelコンポーネントのStory定義
 */
const meta: Meta<typeof DisplayPanel> = {
  title: 'Molecules/DisplayPanel',
  component: DisplayPanel,
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
    transparency: {
      control: 'select',
      options: ['none', 'subtle', 'medium', 'high', 'full'],
      description: '透過度レベル',
    },
    border: {
      control: 'select',
      options: ['none', 'subtle', 'normal', 'intense'],
      description: 'ボーダーの強調レベル',
    },
    animated: {
      control: 'boolean',
      description: 'モーショングラフィックス効果',
    },
    title: {
      control: 'text',
      description: 'パネルのタイトル',
    },
    description: {
      control: 'text',
      description: 'パネルの説明文',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DisplayPanel>;

/**
 * デフォルトのディスプレイパネル
 */
export const Default: Story = {
  args: {
    title: 'Sensor Data',
    children: 'Reading: 42.7',
  },
};

/**
 * 透過度のバリエーション
 */
export const TransparencyVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <DisplayPanel transparency="none" title="No Transparency">
        Fully opaque
      </DisplayPanel>
      <DisplayPanel transparency="subtle" title="Subtle Transparency">
        Slightly transparent
      </DisplayPanel>
      <DisplayPanel transparency="medium" title="Medium Transparency">
        Medium transparency
      </DisplayPanel>
      <DisplayPanel transparency="high" title="High Transparency">
        Highly transparent
      </DisplayPanel>
      <DisplayPanel transparency="full" title="Full Transparency">
        Fully transparent
      </DisplayPanel>
    </div>
  ),
};

/**
 * ボーダーのバリエーション
 */
export const BorderVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <DisplayPanel border="none" title="No Border">
        No border
      </DisplayPanel>
      <DisplayPanel border="subtle" title="Subtle Border">
        Subtle border
      </DisplayPanel>
      <DisplayPanel border="normal" title="Normal Border">
        Normal border
      </DisplayPanel>
      <DisplayPanel border="intense" title="Intense Border">
        Intense border with glow
      </DisplayPanel>
    </div>
  ),
};

/**
 * アニメーション効果
 */
export const Animated: Story = {
  args: {
    title: 'Animated Panel',
    children: 'Hover to see animation',
    animated: true,
  },
};

/**
 * タイトルと説明付き
 */
export const WithDescription: Story = {
  args: {
    title: 'Warp Core',
    description: 'Main propulsion system status',
    children: 'Status: Nominal',
  },
};

/**
 * 組み合わせ例
 */
export const Combinations: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <DisplayPanel
        transparency="medium"
        border="intense"
        title="Critical System"
        description="High priority monitoring"
        animated
      >
        Status: Operational
      </DisplayPanel>
      <DisplayPanel
        transparency="high"
        border="subtle"
        title="Background Data"
        description="Low priority information"
      >
        Ambient temperature: 22°C
      </DisplayPanel>
    </div>
  ),
};

