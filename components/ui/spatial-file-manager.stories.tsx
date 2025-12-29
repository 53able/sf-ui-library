import type { Meta, StoryObj } from "@storybook/react";
import {
  type SpatialFileItem,
  SpatialFileManager,
} from "@/registry/sf-ui/spatial-file-manager/spatial-file-manager";

/**
 * SpatialFileManagerコンポーネントのStory定義
 */
const meta: Meta<typeof SpatialFileManager> = {
  title: "Molecules/SpatialFileManager",
  component: SpatialFileManager,
  parameters: {
    layout: "fullscreen",
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
    mode: {
      control: "select",
      options: ["text", "icon", "mixed"],
      description: "ファイル表示モード",
    },
    perspective: {
      control: "select",
      options: ["none", "subtle", "normal", "strong"],
      description: "3D視点の強さ",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SpatialFileManager>;

const sampleFiles: SpatialFileItem[] = [
  { id: "1", name: "config.json", type: "JSON", size: 100 },
  { id: "2", name: "readme.md", type: "Markdown", size: 200 },
  { id: "3", name: "image.png", type: "Image", size: 500 },
  { id: "4", name: "video.mp4", type: "Video", size: 1000 },
  { id: "5", name: "data.csv", type: "CSV", size: 300 },
  { id: "6", name: "script.js", type: "JavaScript", size: 150 },
];

/**
 * デフォルトの3Dファイル管理
 */
export const Default: Story = {
  args: {
    files: sampleFiles,
    mode: "mixed",
  },
};

/**
 * テキストモード
 */
export const TextMode: Story = {
  args: {
    files: sampleFiles,
    mode: "text",
  },
};

/**
 * アイコンモード
 */
export const IconMode: Story = {
  args: {
    files: sampleFiles.map((file) => ({
      ...file,
      icon: <div className="w-8 h-8 bg-lcars-blue rounded" />,
    })),
    mode: "icon",
  },
};

/**
 * アクティブファイルの強調表示
 */
export const WithActiveFile: Story = {
  args: {
    files: sampleFiles,
    mode: "mixed",
    activeFileId: "3",
  },
};

/**
 * 3D位置指定
 */
export const With3DPositions: Story = {
  args: {
    files: sampleFiles.map((file, index) => ({
      ...file,
      position: {
        x: (index - 2.5) * 10,
        y: index % 2 === 0 ? -10 : 10,
        z: index * 20,
      },
    })),
    mode: "mixed",
  },
};

/**
 * 視点の強さバリエーション
 */
export const PerspectiveVariants: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="text-lcars-blue mb-4">No Perspective</h3>
        <div className="h-64">
          <SpatialFileManager files={sampleFiles.slice(0, 4)} perspective="none" />
        </div>
      </div>
      <div>
        <h3 className="text-lcars-blue mb-4">Subtle Perspective</h3>
        <div className="h-64">
          <SpatialFileManager files={sampleFiles.slice(0, 4)} perspective="subtle" />
        </div>
      </div>
      <div>
        <h3 className="text-lcars-blue mb-4">Normal Perspective</h3>
        <div className="h-64">
          <SpatialFileManager files={sampleFiles.slice(0, 4)} perspective="normal" />
        </div>
      </div>
      <div>
        <h3 className="text-lcars-blue mb-4">Strong Perspective</h3>
        <div className="h-64">
          <SpatialFileManager files={sampleFiles.slice(0, 4)} perspective="strong" />
        </div>
      </div>
    </div>
  ),
};

/**
 * 大きさで注意を引く（原則の実装例）
 */
export const SizeBasedAttention: Story = {
  args: {
    files: [
      { id: "1", name: "small-file.txt", size: 10 },
      { id: "2", name: "medium-file.txt", size: 500 },
      { id: "3", name: "large-file.txt", size: 2000 },
      { id: "4", name: "huge-file.txt", size: 5000 },
    ],
    mode: "text",
    activeFileId: "4",
  },
};
