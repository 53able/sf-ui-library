import type { Meta, StoryObj } from '@storybook/react';
import { WarningScreen } from '@/registry/sf-ui/warning-screen/warning-screen';

/**
 * WarningScreenコンポーネントのStory定義
 */
const meta: Meta<typeof WarningScreen> = {
  title: 'Molecules/WarningScreen',
  component: WarningScreen,
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
      options: ['warning', 'danger', 'restricted', 'standby'],
      description: '警告の種類',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: '画面のサイズ',
    },
    animate: {
      control: 'select',
      options: ['none', 'pulse', 'intense'],
      description: 'アニメーション効果',
    },
    title: {
      control: 'text',
      description: 'メインテキスト',
    },
    message: {
      control: 'text',
      description: 'サブテキスト',
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
    title: 'WARNING',
  },
};

/**
 * アクセス制限画面
 */
export const Restricted: Story = {
  args: {
    variant: 'restricted',
    title: 'ACCESS RESTRICTED',
    message: 'Unauthorized access detected',
  },
};

/**
 * スタンバイ画面
 */
export const Standby: Story = {
  args: {
    variant: 'standby',
    title: 'STANDBY',
    message: 'System is in standby mode',
  },
};

/**
 * 危険警告画面
 */
export const Danger: Story = {
  args: {
    variant: 'danger',
    title: 'DANGER',
    message: 'Critical system failure detected',
  },
};

/**
 * バリアントバリエーション
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <WarningScreen variant="warning" title="WARNING" message="System alert" />
      <WarningScreen variant="danger" title="DANGER" message="Critical alert" />
      <WarningScreen
        variant="restricted"
        title="ACCESS RESTRICTED"
        message="Unauthorized access"
      />
      <WarningScreen variant="standby" title="STANDBY" message="System standby" />
    </div>
  ),
};

/**
 * サイズバリエーション
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <WarningScreen size="sm" title="SMALL" message="Small size warning" />
      <WarningScreen size="default" title="DEFAULT" message="Default size warning" />
      <WarningScreen size="lg" title="LARGE" message="Large size warning" />
    </div>
  ),
};

/**
 * アニメーション効果
 */
export const Animations: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <WarningScreen animate="none" title="NO ANIMATION" message="Static display" />
      <WarningScreen animate="pulse" title="PULSE" message="Pulsing animation" />
      <WarningScreen animate="intense" title="INTENSE" message="Intense animation" />
    </div>
  ),
};

/**
 * アイコン付き
 */
export const WithIcon: Story = {
  args: {
    title: 'WARNING',
    message: 'System alert with icon',
    icon: <span className="text-4xl">⚠️</span>,
  },
};

