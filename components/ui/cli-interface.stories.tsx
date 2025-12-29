import type { Meta, StoryObj } from "@storybook/react";
import { CLIInterface } from "@/registry/sf-ui/cli-interface/cli-interface";

/**
 * CLIInterfaceコンポーネントのStory定義
 */
const meta: Meta<typeof CLIInterface> = {
  title: "Molecules/CLIInterface",
  component: CLIInterface,
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
      options: ["default", "hacker", "retro", "warning", "error"],
      description: "CLIのバリアント",
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
      description: "CLIのサイズ",
    },
    glow: {
      control: "select",
      options: ["none", "subtle", "normal", "intense"],
      description: "発光効果の強さ",
    },
    prompt: {
      control: "text",
      description: "プロンプト記号",
    },
    showCursor: {
      control: "boolean",
      description: "カーソルを表示するか",
    },
    cursorBlink: {
      control: "boolean",
      description: "カーソルの点滅アニメーション",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CLIInterface>;

/**
 * デフォルトのCLIインターフェース
 */
export const Default: Story = {
  args: {
    content: "SYSTEM ACCESS GRANTED",
    prompt: "$",
  },
};

/**
 * 複数行の出力
 */
export const MultiLine: Story = {
  args: {
    content: [
      "INITIALIZING SYSTEM...",
      "LOADING MODULES...",
      "CONNECTING TO DATABASE...",
      "SYSTEM READY",
    ],
    prompt: ">",
  },
};

/**
 * ハッカーバリアント
 */
export const Hacker: Story = {
  args: {
    variant: "hacker",
    content: [
      "ACCESSING SECURE SERVER...",
      "BYPASSING FIREWALL...",
      "ENCRYPTION BREACHED",
      "ROOT ACCESS OBTAINED",
    ],
    prompt: "#",
    glow: "intense",
  },
};

/**
 * レトロバリアント
 */
export const Retro: Story = {
  args: {
    variant: "retro",
    content: ["COMPUTER SYSTEM v2.0", "COPYRIGHT 1985", "READY"],
    prompt: ">",
  },
};

/**
 * 警告バリアント
 */
export const Warning: Story = {
  args: {
    variant: "warning",
    content: [
      "WARNING: UNAUTHORIZED ACCESS DETECTED",
      "SECURITY PROTOCOL ACTIVATED",
      "SYSTEM LOCKDOWN IN 10 SECONDS",
    ],
    prompt: "!",
  },
};

/**
 * エラーバリアント
 */
export const ErrorVariant: Story = {
  args: {
    variant: "error",
    content: [
      "ERROR: SYSTEM FAILURE",
      "CRITICAL COMPONENT OFFLINE",
      "EMERGENCY SHUTDOWN INITIATED",
    ],
    prompt: "X",
    glow: "intense",
  },
};

/**
 * カーソル付き
 */
export const WithCursor: Story = {
  args: {
    content: "READY FOR COMMAND",
    prompt: "$",
    showCursor: true,
    cursorBlink: true,
  },
};

/**
 * サイズバリエーション
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      <CLIInterface size="sm" content="SMALL SIZE CLI" prompt="$" />
      <CLIInterface size="default" content="DEFAULT SIZE CLI" prompt="$" />
      <CLIInterface size="lg" content="LARGE SIZE CLI" prompt="$" />
    </div>
  ),
};

/**
 * 発光効果のバリエーション
 */
export const GlowVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      <CLIInterface glow="none" content="NO GLOW" prompt="$" />
      <CLIInterface glow="subtle" content="SUBTLE GLOW" prompt="$" />
      <CLIInterface glow="normal" content="NORMAL GLOW" prompt="$" />
      <CLIInterface glow="intense" content="INTENSE GLOW" prompt="$" />
    </div>
  ),
};

/**
 * 実用例：システムログ
 */
export const SystemLog: Story = {
  args: {
    variant: "default",
    content: [
      "[2024-01-15 10:23:45] SYSTEM BOOT INITIATED",
      "[2024-01-15 10:23:46] LOADING CORE MODULES...",
      "[2024-01-15 10:23:47] INITIALIZING NETWORK INTERFACE",
      "[2024-01-15 10:23:48] CONNECTING TO DATABASE...",
      "[2024-01-15 10:23:49] DATABASE CONNECTION ESTABLISHED",
      "[2024-01-15 10:23:50] ALL SYSTEMS OPERATIONAL",
      "[2024-01-15 10:23:51] READY FOR COMMANDS",
    ],
    prompt: ">",
    showCursor: true,
  },
};

/**
 * 実用例：ハッキングシーン
 */
export const HackingScene: Story = {
  args: {
    variant: "hacker",
    content: [
      "CONNECTING TO TARGET SYSTEM...",
      "SCANNING FOR VULNERABILITIES...",
      "FIREWALL DETECTED",
      "ATTEMPTING BYPASS...",
      "...",
      "ACCESS GRANTED",
      "DOWNLOADING DATA...",
      "TRANSFER COMPLETE",
    ],
    prompt: "#",
    glow: "intense",
    showCursor: true,
  },
};
