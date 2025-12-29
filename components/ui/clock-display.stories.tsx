import type { Meta, StoryObj } from "@storybook/react";
import { ClockDisplay } from "@/registry/sf-ui/clock-display/clock-display";

/**
 * ClockDisplayコンポーネントのStory定義
 */
const meta: Meta<typeof ClockDisplay> = {
  title: "Atoms/ClockDisplay",
  component: ClockDisplay,
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
      options: ["default", "orange", "red", "yellow"],
      description: "カラーバリアント",
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg", "xl"],
      description: "サイズ",
    },
    glow: {
      control: "select",
      options: ["none", "subtle", "normal", "intense"],
      description: "発光効果の強さ",
    },
    use24Hour: {
      control: "boolean",
      description: "24時間形式で表示するか",
    },
    showSeconds: {
      control: "boolean",
      description: "秒を表示するか",
    },
    showDate: {
      control: "boolean",
      description: "日付を表示するか",
    },
    label: {
      control: "text",
      description: "ラベルテキスト",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ClockDisplay>;

/**
 * デフォルトの時計表示（24時間形式）
 */
export const Default: Story = {
  args: {
    use24Hour: true,
    showSeconds: false,
  },
};

/**
 * 秒表示付き
 */
export const WithSeconds: Story = {
  args: {
    use24Hour: true,
    showSeconds: true,
  },
};

/**
 * 12時間形式
 */
export const TwelveHour: Story = {
  args: {
    use24Hour: false,
    showSeconds: true,
  },
};

/**
 * 日付表示付き
 */
export const WithDate: Story = {
  args: {
    use24Hour: true,
    showSeconds: true,
    showDate: true,
    label: "Stardate",
  },
};

/**
 * カラーバリエーション
 */
export const ColorVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <ClockDisplay variant="default" label="Default" />
      <ClockDisplay variant="orange" label="Orange" />
      <ClockDisplay variant="red" label="Red" />
      <ClockDisplay variant="yellow" label="Yellow" />
    </div>
  ),
};

/**
 * 発光効果のバリエーション
 */
export const GlowVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <ClockDisplay glow="none" label="None" />
      <ClockDisplay glow="subtle" label="Subtle" />
      <ClockDisplay glow="normal" label="Normal" />
      <ClockDisplay glow="intense" label="Intense" />
    </div>
  ),
};

/**
 * サイズバリエーション
 */
export const SizeVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ClockDisplay size="sm" label="Small" />
      <ClockDisplay size="default" label="Default" />
      <ClockDisplay size="lg" label="Large" />
      <ClockDisplay size="xl" label="Extra Large" />
    </div>
  ),
};

/**
 * カスタム時刻
 */
export const CustomTime: Story = {
  args: {
    customTime: new Date("2024-01-01T12:34:56"),
    use24Hour: true,
    showSeconds: true,
    showDate: true,
    label: "Custom Time",
  },
};
