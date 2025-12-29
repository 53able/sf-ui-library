import type { Meta, StoryObj } from '@storybook/react';
import { LCARSGrid } from '@/registry/sf-ui/lcars-grid/lcars-grid';
import { LCARSPanel } from '@/registry/sf-ui/lcars-panel/lcars-panel';

/**
 * LCARSGridコンポーネントのStory定義
 */
const meta: Meta<typeof LCARSGrid> = {
  title: 'Molecules/LCARSGrid',
  component: LCARSGrid,
  parameters: {
    layout: 'padded',
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
    columns: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: 'グリッドの列数',
    },
    gap: {
      control: 'select',
      options: ['none', 'sm', 'default', 'lg', 'xl'],
      description: 'グリッドアイテム間の間隔',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LCARSGrid>;

/**
 * デフォルトのグリッド（3列）
 */
export const Default: Story = {
  render: () => (
    <LCARSGrid>
      <LCARSPanel>Panel 1</LCARSPanel>
      <LCARSPanel>Panel 2</LCARSPanel>
      <LCARSPanel>Panel 3</LCARSPanel>
    </LCARSGrid>
  ),
};

/**
 * 2列グリッド
 */
export const TwoColumns: Story = {
  render: () => (
    <LCARSGrid columns={2}>
      <LCARSPanel title="System 1">Status: Normal</LCARSPanel>
      <LCARSPanel title="System 2">Status: Normal</LCARSPanel>
    </LCARSGrid>
  ),
};

/**
 * 4列グリッド
 */
export const FourColumns: Story = {
  render: () => (
    <LCARSGrid columns={4}>
      <LCARSPanel variant="default" title="Core">100%</LCARSPanel>
      <LCARSPanel variant="orange" title="Shields">85%</LCARSPanel>
      <LCARSPanel variant="red" title="Weapons">92%</LCARSPanel>
      <LCARSPanel variant="yellow" title="Sensors">78%</LCARSPanel>
    </LCARSGrid>
  ),
};

/**
 * 間隔のバリエーション
 */
export const GapVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-2 text-sm text-lcars-blue">No Gap</p>
        <LCARSGrid columns={3} gap="none">
          <LCARSPanel>Panel 1</LCARSPanel>
          <LCARSPanel>Panel 2</LCARSPanel>
          <LCARSPanel>Panel 3</LCARSPanel>
        </LCARSGrid>
      </div>
      <div>
        <p className="mb-2 text-sm text-lcars-blue">Small Gap</p>
        <LCARSGrid columns={3} gap="sm">
          <LCARSPanel>Panel 1</LCARSPanel>
          <LCARSPanel>Panel 2</LCARSPanel>
          <LCARSPanel>Panel 3</LCARSPanel>
        </LCARSGrid>
      </div>
      <div>
        <p className="mb-2 text-sm text-lcars-blue">Default Gap</p>
        <LCARSGrid columns={3} gap="default">
          <LCARSPanel>Panel 1</LCARSPanel>
          <LCARSPanel>Panel 2</LCARSPanel>
          <LCARSPanel>Panel 3</LCARSPanel>
        </LCARSGrid>
      </div>
      <div>
        <p className="mb-2 text-sm text-lcars-blue">Large Gap</p>
        <LCARSGrid columns={3} gap="lg">
          <LCARSPanel>Panel 1</LCARSPanel>
          <LCARSPanel>Panel 2</LCARSPanel>
          <LCARSPanel>Panel 3</LCARSPanel>
        </LCARSGrid>
      </div>
    </div>
  ),
};

/**
 * レスポンシブグリッド
 */
export const Responsive: Story = {
  render: () => (
    <LCARSGrid columns={4} gap="default">
      <LCARSPanel variant="default" title="Mobile: 1 col">
        Responsive grid
      </LCARSPanel>
      <LCARSPanel variant="orange" title="Tablet: 2 cols">
        Adapts to screen size
      </LCARSPanel>
      <LCARSPanel variant="default" title="Desktop: 4 cols">
        Full layout
      </LCARSPanel>
      <LCARSPanel variant="yellow" title="System 4">
        Status: Normal
      </LCARSPanel>
    </LCARSGrid>
  ),
};

/**
 * 複数行グリッド
 */
export const MultipleRows: Story = {
  render: () => (
    <LCARSGrid columns={3} gap="default">
      <LCARSPanel variant="default" title="Row 1, Col 1">
        Content
      </LCARSPanel>
      <LCARSPanel variant="orange" title="Row 1, Col 2">
        Content
      </LCARSPanel>
      <LCARSPanel variant="default" title="Row 1, Col 3">
        Content
      </LCARSPanel>
      <LCARSPanel variant="yellow" title="Row 2, Col 1">
        Content
      </LCARSPanel>
      <LCARSPanel variant="default" title="Row 2, Col 2">
        Content
      </LCARSPanel>
      <LCARSPanel variant="red" title="Row 2, Col 3">
        Content
      </LCARSPanel>
    </LCARSGrid>
  ),
};

