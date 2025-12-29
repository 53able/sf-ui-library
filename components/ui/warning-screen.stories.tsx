import type { Meta, StoryObj } from "@storybook/react";
import { WarningScreen } from "@/registry/sf-ui/warning-screen/warning-screen";

/**
 * WarningScreenコンポーネントのStory定義
 */
const meta: Meta<typeof WarningScreen> = {
  title: "Molecules/WarningScreen",
  component: WarningScreen,
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
      options: ["warning", "danger", "restricted", "standby"],
      description: "警告の種類",
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
      description: "画面のサイズ",
    },
    animate: {
      control: "select",
      options: ["none", "pulse", "intense"],
      description: "アニメーション効果",
    },
    mainText: {
      control: "text",
      description: "メインテキスト",
    },
    subText: {
      control: "text",
      description: "サブテキスト",
    },
  },
};

export default meta;
type Story = StoryObj<typeof WarningScreen>;

/**
 * デフォルトの警告画面
 */
export const Default: Story = {
  args: {
    mainText: "WARNING",
  },
};

/**
 * アクセス制限画面
 */
export const Restricted: Story = {
  args: {
    variant: "restricted",
    mainText: "ACCESS RESTRICTED",
    subText: "Unauthorized access detected",
  },
};

/**
 * スタンバイ画面
 */
export const Standby: Story = {
  args: {
    variant: "standby",
    mainText: "STANDBY",
    subText: "System is in standby mode",
  },
};

/**
 * 危険警告画面
 */
export const Danger: Story = {
  args: {
    variant: "danger",
    mainText: "DANGER",
    subText: "Critical system failure detected",
  },
};

/**
 * バリアントバリエーション
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <WarningScreen variant="warning" mainText="WARNING" subText="System alert" />
      <WarningScreen variant="danger" mainText="DANGER" subText="Critical alert" />
      <WarningScreen
        variant="restricted"
        mainText="ACCESS RESTRICTED"
        subText="Unauthorized access"
      />
      <WarningScreen variant="standby" mainText="STANDBY" subText="System standby" />
    </div>
  ),
};

/**
 * サイズバリエーション
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <WarningScreen size="sm" mainText="SMALL" subText="Small size warning" />
      <WarningScreen size="default" mainText="DEFAULT" subText="Default size warning" />
      <WarningScreen size="lg" mainText="LARGE" subText="Large size warning" />
    </div>
  ),
};

/**
 * アニメーション効果
 */
export const Animations: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <WarningScreen animate="none" mainText="NO ANIMATION" subText="Static display" />
      <WarningScreen animate="pulse" mainText="PULSE" subText="Pulsing animation" />
      <WarningScreen animate="intense" mainText="INTENSE" subText="Intense animation" />
    </div>
  ),
};

/**
 * アイコン付き
 */
export const WithIcon: Story = {
  args: {
    mainText: "WARNING",
    subText: "System alert with icon",
    icon: <span className="text-4xl">⚠️</span>,
  },
};
