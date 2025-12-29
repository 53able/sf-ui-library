import type { Meta, StoryObj } from "@storybook/react";
import { GlowText } from "@/registry/sf-ui/glow-text/glow-text";

/**
 * GlowTextコンポーネントのStory定義
 */
const meta: Meta<typeof GlowText> = {
  title: "Atoms/GlowText",
  component: GlowText,
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
    color: {
      control: "select",
      options: [
        "blue",
        "orange",
        "red",
        "yellow",
        "purple",
        "gray",
        "green",
        "blue-glow",
        "red-glow",
        "yellow-glow",
        "purple-glow",
        "gray-glow",
        "green-glow",
      ],
      description: "テキストの色",
    },
    intensity: {
      control: "select",
      options: ["none", "subtle", "normal", "intense"],
      description: "発光効果の強さ",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl"],
      description: "テキストのサイズ",
    },
    weight: {
      control: "select",
      options: ["normal", "medium", "semibold", "bold"],
      description: "フォントの太さ",
    },
    animate: {
      control: "select",
      options: ["none", "pulse", "glow"],
      description: "アニメーション効果",
    },
    as: {
      control: "select",
      options: ["span", "p", "h1", "h2", "h3", "h4", "h5", "h6", "div"],
      description: "レンダリングするHTML要素",
    },
  },
};

export default meta;
type Story = StoryObj<typeof GlowText>;

/**
 * デフォルトのGlowText
 */
export const Default: Story = {
  args: {
    children: "SYSTEM ONLINE",
  },
};

/**
 * カラーバリエーション
 */
export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <GlowText color="blue">Blue Glow Text</GlowText>
      <GlowText color="orange">Orange Glow Text</GlowText>
      <GlowText color="red">Red Glow Text</GlowText>
      <GlowText color="yellow">Yellow Glow Text</GlowText>
      <GlowText color="purple">Purple Glow Text</GlowText>
      <GlowText color="gray">Gray Glow Text</GlowText>
      <GlowText color="green">Green Glow Text</GlowText>
      <GlowText color="blue-glow">Blue Glow (Intense)</GlowText>
      <GlowText color="red-glow">Red Glow (Intense)</GlowText>
      <GlowText color="yellow-glow">Yellow Glow (Intense)</GlowText>
      <GlowText color="purple-glow">Purple Glow (Intense)</GlowText>
      <GlowText color="gray-glow">Gray Glow (Intense)</GlowText>
      <GlowText color="green-glow">Green Glow (Intense)</GlowText>
    </div>
  ),
};

/**
 * 発光強度のバリエーション
 */
export const IntensityVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <GlowText intensity="none">No Glow</GlowText>
      <GlowText intensity="subtle">Subtle Glow</GlowText>
      <GlowText intensity="normal">Normal Glow</GlowText>
      <GlowText intensity="intense">Intense Glow</GlowText>
    </div>
  ),
};

/**
 * サイズバリエーション
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <GlowText size="xs">Extra Small</GlowText>
      <GlowText size="sm">Small</GlowText>
      <GlowText size="base">Base</GlowText>
      <GlowText size="lg">Large</GlowText>
      <GlowText size="xl">Extra Large</GlowText>
      <GlowText size="2xl">2X Large</GlowText>
      <GlowText size="3xl">3X Large</GlowText>
      <GlowText size="4xl">4X Large</GlowText>
    </div>
  ),
};

/**
 * アニメーション効果
 */
export const Animations: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <GlowText animate="none">No Animation</GlowText>
      <GlowText animate="pulse">Pulse Animation</GlowText>
      <GlowText animate="glow">Glow Animation</GlowText>
    </div>
  ),
};

/**
 * HTML要素のバリエーション
 */
export const ElementVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <GlowText as="h1" size="4xl">
        Heading 1
      </GlowText>
      <GlowText as="h2" size="3xl">
        Heading 2
      </GlowText>
      <GlowText as="p" size="lg">
        Paragraph text with glow effect
      </GlowText>
      <GlowText as="span" size="base">
        Span text
      </GlowText>
    </div>
  ),
};

/**
 * 組み合わせ例
 */
export const Combinations: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <GlowText color="blue" intensity="intense" size="3xl" weight="bold" animate="pulse">
        SYSTEM ONLINE
      </GlowText>
      <GlowText color="red" intensity="normal" size="2xl" weight="semibold">
        WARNING
      </GlowText>
      <GlowText color="yellow" intensity="subtle" size="xl" weight="medium">
        STANDBY MODE
      </GlowText>
    </div>
  ),
};
