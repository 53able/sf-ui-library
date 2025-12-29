import type { Meta, StoryObj } from "@storybook/react";
import { TransparentLayer } from "@/registry/sf-ui/transparent-layer/transparent-layer";

/**
 * TransparentLayerコンポーネントのStory定義
 */
const meta: Meta<typeof TransparentLayer> = {
  title: "Molecules/TransparentLayer",
  component: TransparentLayer,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#000000" },
        { name: "light", value: "#ffffff" },
      ],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "orange", "red", "yellow", "purple", "green"],
      description: "レイヤーのバリアント",
    },
    opacity: {
      control: "select",
      options: ["subtle", "normal", "strong"],
      description: "透明度の強さ",
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
      description: "レイヤーのサイズ",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TransparentLayer>;

/**
 * デフォルトの透過レイヤー
 */
export const Default: Story = {
  args: {
    foregroundContent: <div className="text-lcars-blue">Important Information</div>,
  },
};

/**
 * 背景と前景の組み合わせ
 */
export const WithBackground: Story = {
  args: {
    backgroundContent: (
      <div className="p-8 text-lcars-blue/50">
        <div className="text-2xl mb-4">Background Context</div>
        <div className="text-sm">
          This is contextual information that appears behind the main content.
        </div>
      </div>
    ),
    foregroundContent: (
      <div className="text-lcars-blue">
        <div className="text-xl font-bold mb-2">Foreground Information</div>
        <div className="text-sm">This is the important information displayed on top.</div>
      </div>
    ),
  },
};

/**
 * バリアントバリエーション
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <TransparentLayer
        variant="default"
        foregroundContent={<div className="text-lcars-blue">Blue Layer</div>}
      />
      <TransparentLayer
        variant="orange"
        foregroundContent={<div className="text-lcars-orange">Orange Layer</div>}
      />
      <TransparentLayer
        variant="red"
        foregroundContent={<div className="text-lcars-red">Red Layer</div>}
      />
      <TransparentLayer
        variant="yellow"
        foregroundContent={<div className="text-lcars-yellow">Yellow Layer</div>}
      />
      <TransparentLayer
        variant="purple"
        foregroundContent={<div className="text-lcars-purple">Purple Layer</div>}
      />
      <TransparentLayer
        variant="green"
        foregroundContent={<div className="text-lcars-green">Green Layer</div>}
      />
    </div>
  ),
};

/**
 * 透明度のバリエーション
 */
export const OpacityVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <TransparentLayer
        opacity="subtle"
        foregroundContent={<div className="text-lcars-blue">Subtle Opacity</div>}
      />
      <TransparentLayer
        opacity="normal"
        foregroundContent={<div className="text-lcars-blue">Normal Opacity</div>}
      />
      <TransparentLayer
        opacity="strong"
        foregroundContent={<div className="text-lcars-blue">Strong Opacity</div>}
      />
    </div>
  ),
};

/**
 * サイズバリエーション
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <TransparentLayer
        size="sm"
        foregroundContent={<div className="text-lcars-blue">Small Layer</div>}
      />
      <TransparentLayer
        size="default"
        foregroundContent={<div className="text-lcars-blue">Default Layer</div>}
      />
      <TransparentLayer
        size="lg"
        foregroundContent={<div className="text-lcars-blue">Large Layer</div>}
      />
    </div>
  ),
};

/**
 * 実用例：情報階層の視覚化
 */
export const InformationHierarchy: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <TransparentLayer
        variant="default"
        size="lg"
        backgroundContent={
          <div className="p-8 text-lcars-blue/30">
            <div className="text-4xl mb-4">System Overview</div>
            <div className="space-y-2 text-sm">
              <div>• Warp Core: Operational</div>
              <div>• Shields: Active</div>
              <div>• Weapons: Standby</div>
              <div>• Life Support: Nominal</div>
            </div>
          </div>
        }
        foregroundContent={
          <div className="p-6">
            <div className="text-2xl font-bold text-lcars-blue mb-4">Critical Alert</div>
            <div className="text-lcars-blue">
              Warp core efficiency has dropped below 85%. Immediate attention required.
            </div>
          </div>
        }
      />
    </div>
  ),
};
