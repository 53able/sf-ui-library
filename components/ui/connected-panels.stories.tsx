import type { Meta, StoryObj } from '@storybook/react';
import { ConnectedPanels } from './connected-panels';

/**
 * ConnectedPanelsコンポーネントのStory定義
 */
const meta: Meta<typeof ConnectedPanels> = {
  title: 'Molecules/ConnectedPanels',
  component: ConnectedPanels,
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
      description: 'パネルの配置方向',
    },
    connection: {
      control: 'select',
      options: ['none', 'curve', 'line'],
      description: '接続線のスタイル',
    },
    connectorStyle: {
      control: 'select',
      options: ['solid', 'dashed', 'glow'],
      description: '接続線のスタイル',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ConnectedPanels>;

/**
 * デフォルトの接続パネル（水平）
 */
export const Default: Story = {
  args: {
    panels: [
      { content: 'Panel 1', panelProps: { variant: 'default' } },
      { content: 'Panel 2', panelProps: { variant: 'orange' } },
      { content: 'Panel 3', panelProps: { variant: 'default' } },
    ],
  },
};

/**
 * 垂直配置
 */
export const Vertical: Story = {
  args: {
    direction: 'vertical',
    panels: [
      { content: 'Panel 1', panelProps: { variant: 'default' } },
      { content: 'Panel 2', panelProps: { variant: 'orange' } },
      { content: 'Panel 3', panelProps: { variant: 'default' } },
    ],
  },
};

/**
 * 接続線なし
 */
export const NoConnection: Story = {
  args: {
    connection: 'none',
    panels: [
      { content: 'Panel 1', panelProps: { variant: 'default' } },
      { content: 'Panel 2', panelProps: { variant: 'orange' } },
      { content: 'Panel 3', panelProps: { variant: 'default' } },
    ],
  },
};

/**
 * 直線接続
 */
export const LineConnection: Story = {
  args: {
    connection: 'line',
    connectorStyle: 'solid',
    panels: [
      { content: 'Panel 1', panelProps: { variant: 'default' } },
      { content: 'Panel 2', panelProps: { variant: 'orange' } },
      { content: 'Panel 3', panelProps: { variant: 'default' } },
    ],
  },
};

/**
 * カーブ接続（デフォルト）
 */
export const CurveConnection: Story = {
  args: {
    connection: 'curve',
    connectorStyle: 'glow',
    panels: [
      { content: 'Panel 1', panelProps: { variant: 'default' } },
      { content: 'Panel 2', panelProps: { variant: 'orange' } },
      { content: 'Panel 3', panelProps: { variant: 'default' } },
    ],
  },
};

/**
 * 接続線スタイルのバリエーション
 */
export const ConnectorStyles: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-sm text-lcars-blue">Solid</p>
        <ConnectedPanels
          connectorStyle="solid"
          panels={[
            { content: 'Panel 1', panelProps: { variant: 'default' } },
            { content: 'Panel 2', panelProps: { variant: 'orange' } },
          ]}
        />
      </div>
      <div>
        <p className="mb-2 text-sm text-lcars-blue">Dashed</p>
        <ConnectedPanels
          connectorStyle="dashed"
          panels={[
            { content: 'Panel 1', panelProps: { variant: 'default' } },
            { content: 'Panel 2', panelProps: { variant: 'orange' } },
          ]}
        />
      </div>
      <div>
        <p className="mb-2 text-sm text-lcars-blue">Glow</p>
        <ConnectedPanels
          connectorStyle="glow"
          panels={[
            { content: 'Panel 1', panelProps: { variant: 'default' } },
            { content: 'Panel 2', panelProps: { variant: 'orange' } },
          ]}
        />
      </div>
    </div>
  ),
};

/**
 * 複数パネル（4つ）
 */
export const MultiplePanels: Story = {
  args: {
    panels: [
      { content: 'System 1', panelProps: { variant: 'default', title: 'Core' } },
      { content: 'System 2', panelProps: { variant: 'orange', title: 'Shields' } },
      { content: 'System 3', panelProps: { variant: 'default', title: 'Weapons' } },
      { content: 'System 4', panelProps: { variant: 'yellow', title: 'Sensors' } },
    ],
  },
};

