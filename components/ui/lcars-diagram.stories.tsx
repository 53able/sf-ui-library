import type { Meta, StoryObj } from '@storybook/react';
import { LCARSDiagram } from './lcars-diagram';

/**
 * LCARSDiagramコンポーネントのStory定義
 */
const meta: Meta<typeof LCARSDiagram> = {
  title: 'Molecules/LCARSDiagram',
  component: LCARSDiagram,
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
      options: ['default', 'orange', 'red', 'yellow'],
      description: 'グラフのカラーバリアント',
    },
    type: {
      control: 'select',
      options: ['bar', 'line', 'area'],
      description: 'グラフのタイプ',
    },
    title: {
      control: 'text',
      description: 'グラフのタイトル',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LCARSDiagram>;

/**
 * デフォルトの棒グラフ
 */
export const Default: Story = {
  args: {
    title: 'Power Levels',
    data: [75, 90, 60, 85],
    labels: ['Core', 'Shields', 'Weapons', 'Sensors'],
    type: 'bar',
  },
};

/**
 * バリアントのバリエーション
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <LCARSDiagram
        variant="default"
        title="Blue System"
        data={[80, 70, 90]}
        labels={['A', 'B', 'C']}
        type="bar"
      />
      <LCARSDiagram
        variant="orange"
        title="Orange System"
        data={[80, 70, 90]}
        labels={['A', 'B', 'C']}
        type="bar"
      />
      <LCARSDiagram
        variant="red"
        title="Red System"
        data={[80, 70, 90]}
        labels={['A', 'B', 'C']}
        type="bar"
      />
      <LCARSDiagram
        variant="yellow"
        title="Yellow System"
        data={[80, 70, 90]}
        labels={['A', 'B', 'C']}
        type="bar"
      />
    </div>
  ),
};

/**
 * グラフタイプのバリエーション
 */
export const GraphTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <LCARSDiagram
        title="Bar Chart"
        data={[75, 90, 60, 85, 70]}
        labels={['Q1', 'Q2', 'Q3', 'Q4', 'Q5']}
        type="bar"
      />
      <LCARSDiagram
        title="Line Chart"
        data={[75, 90, 60, 85, 70]}
        labels={['Q1', 'Q2', 'Q3', 'Q4', 'Q5']}
        type="line"
      />
      <LCARSDiagram
        title="Area Chart"
        data={[75, 90, 60, 85, 70]}
        labels={['Q1', 'Q2', 'Q3', 'Q4', 'Q5']}
        type="area"
      />
    </div>
  ),
};

/**
 * 大きなデータセット
 */
export const LargeDataset: Story = {
  args: {
    title: 'Monthly Performance',
    data: [65, 72, 80, 75, 85, 90, 88, 92, 87, 95, 90, 88],
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    type: 'bar',
  },
};

/**
 * カスタムコンテンツ
 */
export const CustomContent: Story = {
  args: {
    title: 'Custom Diagram',
    children: (
      <div className="space-y-2">
        <div className="text-lcars-blue">Custom content can be placed here</div>
        <div className="text-lcars-orange">Any React node is supported</div>
      </div>
    ),
  },
};

/**
 * リアルタイムデータ風
 */
export const RealTimeData: Story = {
  args: {
    title: 'Real-time Sensor Data',
    data: [45, 67, 89, 34, 56, 78, 90, 23, 45, 67],
    labels: [
      'Sensor 1',
      'Sensor 2',
      'Sensor 3',
      'Sensor 4',
      'Sensor 5',
      'Sensor 6',
      'Sensor 7',
      'Sensor 8',
      'Sensor 9',
      'Sensor 10',
    ],
    type: 'bar',
  },
};

