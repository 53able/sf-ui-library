import type { Meta, StoryObj } from '@storybook/react';
import { LCARSPanel } from '@/registry/sf-ui/lcars-panel/lcars-panel';

/**
 * LCARSPanelコンポーネントのStory定義
 */
const meta: Meta<typeof LCARSPanel> = {
  title: 'Molecules/LCARSPanel',
  component: LCARSPanel,
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
      options: ['default', 'orange', 'red', 'yellow', 'purple', 'gray', 'green', 'filled'],
      description: 'パネルのバリアント',
    },
    shape: {
      control: 'select',
      options: ['default', 'pill', 'lcars'],
      description: 'パネルの形状',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'パネルのサイズ',
    },
    glow: {
      control: 'select',
      options: ['none', 'subtle', 'normal', 'intense'],
      description: '発光効果の強さ',
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
type Story = StoryObj<typeof LCARSPanel>;

/**
 * デフォルトのLCARSパネル
 */
export const Default: Story = {
  args: {
    children: 'All systems operational',
  },
};

/**
 * タイトル付きパネル
 */
export const WithTitle: Story = {
  args: {
    title: 'System Status',
    children: 'All systems operational',
  },
};

/**
 * タイトルと説明付きパネル
 */
export const WithTitleAndDescription: Story = {
  args: {
    title: 'Warp Core',
    description: 'Main propulsion system',
    children: 'Status: Nominal',
  },
};

/**
 * バリアントバリエーション
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <LCARSPanel variant="default" title="Default">
        Default variant
      </LCARSPanel>
      <LCARSPanel variant="orange" title="Orange">
        Orange variant
      </LCARSPanel>
      <LCARSPanel variant="red" title="Red">
        Red variant
      </LCARSPanel>
      <LCARSPanel variant="yellow" title="Yellow">
        Yellow variant
      </LCARSPanel>
      <LCARSPanel variant="purple" title="Purple">
        Purple variant
      </LCARSPanel>
      <LCARSPanel variant="gray" title="Gray">
        Gray variant (Legacy)
      </LCARSPanel>
      <LCARSPanel variant="green" title="Green">
        Green variant (Safe/Hacker)
      </LCARSPanel>
      <LCARSPanel variant="filled" title="Filled">
        Filled variant
      </LCARSPanel>
    </div>
  ),
};

/**
 * 形状バリエーション
 */
export const Shapes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <LCARSPanel shape="default" title="Default Shape">
        Default rounded shape
      </LCARSPanel>
      <LCARSPanel shape="pill" title="Pill Shape">
        LCARS pill shape
      </LCARSPanel>
      <LCARSPanel shape="lcars" title="LCARS Shape">
        LCARS characteristic shape
      </LCARSPanel>
    </div>
  ),
};

/**
 * サイズバリエーション
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <LCARSPanel size="sm" title="Small">
        Small panel
      </LCARSPanel>
      <LCARSPanel size="default" title="Default">
        Default panel
      </LCARSPanel>
      <LCARSPanel size="lg" title="Large">
        Large panel
      </LCARSPanel>
    </div>
  ),
};

/**
 * 発光効果のバリエーション
 */
export const GlowVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <LCARSPanel glow="none" title="No Glow">
        No glow effect
      </LCARSPanel>
      <LCARSPanel glow="subtle" title="Subtle Glow">
        Subtle glow effect
      </LCARSPanel>
      <LCARSPanel glow="normal" title="Normal Glow">
        Normal glow effect
      </LCARSPanel>
      <LCARSPanel glow="intense" title="Intense Glow">
        Intense glow effect
      </LCARSPanel>
    </div>
  ),
};

