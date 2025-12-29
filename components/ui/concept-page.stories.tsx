import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/registry/sf-ui/button/button";
import { CLIInterface } from "@/registry/sf-ui/cli-interface/cli-interface";
import { ClockDisplay } from "@/registry/sf-ui/clock-display/clock-display";
import { ConnectedPanels } from "@/registry/sf-ui/connected-panels/connected-panels";
import { DataDisplay } from "@/registry/sf-ui/data-display/data-display";
import { DisplayPanel } from "@/registry/sf-ui/display-panel/display-panel";
import { FeedbackControl } from "@/registry/sf-ui/feedback-control/feedback-control";
import { GlowButton } from "@/registry/sf-ui/glow-button/glow-button";
import { GlowText } from "@/registry/sf-ui/glow-text/glow-text";
import { LCARSDiagram } from "@/registry/sf-ui/lcars-diagram/lcars-diagram";
import { LCARSGrid } from "@/registry/sf-ui/lcars-grid/lcars-grid";
import { LCARSPanel } from "@/registry/sf-ui/lcars-panel/lcars-panel";
import { SpatialFileManager } from "@/registry/sf-ui/spatial-file-manager/spatial-file-manager";
import { StatusIndicator } from "@/registry/sf-ui/status-indicator/status-indicator";
import { TransparentLayer } from "@/registry/sf-ui/transparent-layer/transparent-layer";
import { WarningScreen } from "@/registry/sf-ui/warning-screen/warning-screen";

/**
 * コンセプトイメージのPage要素
 * SF映画のインタフェースデザインをインスパイアしたページ全体のストーリー
 */
const meta: Meta = {
  title: "Pages/Concept",
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#000000" },
        { name: "space", value: "#0a0a1a" },
      ],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

/**
 * コックピット/制御室のダッシュボード
 * 宇宙船やSF的な制御室をイメージした統合ダッシュボード
 */
export const CockpitDashboard: Story = {
  render: () => (
    <div className="min-h-screen bg-black p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* ヘッダー */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-wider text-lcars-blue">
              Command Center
            </h1>
            <p className="mt-1 text-sm text-lcars-blue/80">Stardate 2401.05</p>
          </div>
          <ClockDisplay use24Hour showSeconds showDate label="Ship Time" size="lg" />
        </div>

        {/* メインシステムステータス */}
        <ConnectedPanels
          direction="horizontal"
          connection="curve"
          connectorStyle="glow"
          panels={[
            {
              content: (
                <div className="space-y-2">
                  <StatusIndicator status="normal" size="lg" pulse="normal" label="Online" />
                  <DataDisplay value={100} label="Warp Core" unit="%" size="2xl" />
                </div>
              ),
              panelProps: { variant: "default", title: "Core Systems" },
            },
            {
              content: (
                <div className="space-y-2">
                  <StatusIndicator status="normal" size="lg" pulse="normal" label="Active" />
                  <DataDisplay value={87} label="Shields" unit="%" size="2xl" />
                </div>
              ),
              panelProps: { variant: "orange", title: "Defense" },
            },
            {
              content: (
                <div className="space-y-2">
                  <StatusIndicator status="warning" size="lg" pulse="normal" label="Standby" />
                  <DataDisplay value={45} label="Weapons" unit="%" size="2xl" />
                </div>
              ),
              panelProps: { variant: "yellow", title: "Weapons" },
            },
          ]}
        />

        {/* データグリッド */}
        <LCARSGrid columns={3} gap="lg">
          <DisplayPanel transparency="medium" border="intense" title="Sensor Array">
            <div className="space-y-3">
              <DataDisplay value={1247} label="Range" unit="km" variant="default" />
              <StatusIndicator status="normal" label="Operational" />
            </div>
          </DisplayPanel>

          <DisplayPanel transparency="medium" border="intense" title="Navigation">
            <div className="space-y-3">
              <DataDisplay value={0.5} label="Warp Factor" variant="orange" />
              <DataDisplay value={2847} label="Velocity" unit="km/s" variant="default" />
            </div>
          </DisplayPanel>

          <DisplayPanel transparency="medium" border="intense" title="Life Support">
            <div className="space-y-3">
              <DataDisplay value={98.5} label="Oxygen" unit="%" variant="default" />
              <DataDisplay value={22.3} label="Temperature" unit="°C" variant="default" />
            </div>
          </DisplayPanel>
        </LCARSGrid>

        {/* 下部パネル */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <LCARSPanel variant="default" title="Communication Status">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-lcars-blue/80">Primary Channel</span>
                <StatusIndicator status="normal" size="sm" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-lcars-blue/80">Secondary Channel</span>
                <StatusIndicator status="normal" size="sm" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-lcars-blue/80">Emergency Channel</span>
                <StatusIndicator status="warning" size="sm" />
              </div>
            </div>
          </LCARSPanel>

          <LCARSPanel variant="orange" title="Power Distribution">
            <div className="space-y-2">
              <DataDisplay value={7490} label="Total Output" unit="MW" size="xl" variant="orange" />
              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-lcars-orange/80">Engines</span>
                  <span className="text-lcars-orange">65%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-lcars-orange/80">Systems</span>
                  <span className="text-lcars-orange">25%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-lcars-orange/80">Reserve</span>
                  <span className="text-lcars-orange">10%</span>
                </div>
              </div>
            </div>
          </LCARSPanel>
        </div>
      </div>
    </div>
  ),
};

/**
 * システム監視画面
 * 複数のシステムを監視する統合監視画面
 */
export const SystemMonitoring: Story = {
  render: () => (
    <div className="min-h-screen bg-black p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* ヘッダー */}
        <div className="flex items-center justify-between border-b-2 border-lcars-blue/30 pb-4">
          <h1 className="text-4xl font-bold uppercase tracking-wider text-lcars-blue">
            System Monitoring
          </h1>
          <ClockDisplay use24Hour showSeconds label="Time" size="lg" />
        </div>

        {/* システムステータスグリッド */}
        <LCARSGrid columns={4} gap="default">
          <LCARSPanel variant="default" title="Server Alpha">
            <div className="space-y-2">
              <StatusIndicator status="normal" size="lg" pulse="normal" label="Online" />
              <DataDisplay value={92} label="CPU" unit="%" size="lg" />
              <DataDisplay value={67} label="Memory" unit="%" size="lg" />
            </div>
          </LCARSPanel>

          <LCARSPanel variant="default" title="Server Beta">
            <div className="space-y-2">
              <StatusIndicator status="normal" size="lg" pulse="normal" label="Online" />
              <DataDisplay value={88} label="CPU" unit="%" size="lg" />
              <DataDisplay value={71} label="Memory" unit="%" size="lg" />
            </div>
          </LCARSPanel>

          <LCARSPanel variant="yellow" title="Server Gamma">
            <div className="space-y-2">
              <StatusIndicator status="warning" size="lg" pulse="normal" label="Warning" />
              <DataDisplay value={95} label="CPU" unit="%" size="lg" variant="yellow" />
              <DataDisplay value={89} label="Memory" unit="%" size="lg" variant="yellow" />
            </div>
          </LCARSPanel>

          <LCARSPanel variant="red" title="Server Delta">
            <div className="space-y-2">
              <StatusIndicator status="danger" size="lg" pulse="intense" label="Critical" />
              <DataDisplay value={99} label="CPU" unit="%" size="lg" variant="red" />
              <DataDisplay value={98} label="Memory" unit="%" size="lg" variant="red" />
            </div>
          </LCARSPanel>
        </LCARSGrid>

        {/* 接続パネル */}
        <ConnectedPanels
          direction="vertical"
          connection="curve"
          connectorStyle="glow"
          panels={[
            {
              content: (
                <div className="space-y-2">
                  <DataDisplay value={1250} label="Network Traffic" unit="Mbps" size="xl" />
                  <StatusIndicator status="normal" label="Stable" />
                </div>
              ),
              panelProps: { variant: "default", title: "Network Status" },
            },
            {
              content: (
                <div className="space-y-2">
                  <DataDisplay value={45} label="Active Connections" size="xl" />
                  <StatusIndicator status="normal" label="Normal" />
                </div>
              ),
              panelProps: { variant: "orange", title: "Connections" },
            },
            {
              content: (
                <div className="space-y-2">
                  <DataDisplay value={2.3} label="Response Time" unit="ms" size="xl" />
                  <StatusIndicator status="normal" label="Optimal" />
                </div>
              ),
              panelProps: { variant: "default", title: "Performance" },
            },
          ]}
        />

        {/* 透過パネル */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <DisplayPanel transparency="high" border="intense" title="Database">
            <DataDisplay value={847} label="Queries/sec" size="lg" />
          </DisplayPanel>

          <DisplayPanel transparency="high" border="intense" title="Cache">
            <DataDisplay value={92.5} label="Hit Rate" unit="%" size="lg" />
          </DisplayPanel>

          <DisplayPanel transparency="high" border="intense" title="Storage">
            <DataDisplay value={67} label="Usage" unit="%" size="lg" />
          </DisplayPanel>
        </div>
      </div>
    </div>
  ),
};

/**
 * データ分析ダッシュボード
 * データ可視化と分析をイメージしたダッシュボード
 */
export const DataAnalytics: Story = {
  render: () => (
    <div className="min-h-screen bg-black p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* ヘッダー */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold uppercase tracking-wider text-lcars-blue">
              Analytics Dashboard
            </h1>
            <p className="mt-2 text-sm text-lcars-blue/80">
              Real-time data analysis and visualization
            </p>
          </div>
          <ClockDisplay use24Hour showSeconds showDate label="Last Update" size="lg" />
        </div>

        {/* メイン指標 */}
        <LCARSGrid columns={4} gap="lg">
          <LCARSPanel variant="default" title="Total Users">
            <DataDisplay value={125847} label="Active" size="3xl" glow="intense" />
          </LCARSPanel>

          <LCARSPanel variant="orange" title="Revenue">
            <DataDisplay
              value={2847590}
              label="Today"
              unit="$"
              size="3xl"
              variant="orange"
              glow="intense"
            />
          </LCARSPanel>

          <LCARSPanel variant="yellow" title="Growth">
            <DataDisplay
              value={+12.5}
              label="Rate"
              unit="%"
              size="3xl"
              variant="yellow"
              glow="intense"
            />
          </LCARSPanel>

          <LCARSPanel variant="default" title="Engagement">
            <DataDisplay value={87.3} label="Score" unit="%" size="3xl" glow="intense" />
          </LCARSPanel>
        </LCARSGrid>

        {/* データパネル */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <DisplayPanel transparency="medium" border="intense" title="Traffic Sources">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-lcars-blue/80">Direct</span>
                <DataDisplay value={45} unit="%" size="lg" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-lcars-blue/80">Search</span>
                <DataDisplay value={32} unit="%" size="lg" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-lcars-blue/80">Social</span>
                <DataDisplay value={18} unit="%" size="lg" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-lcars-blue/80">Other</span>
                <DataDisplay value={5} unit="%" size="lg" />
              </div>
            </div>
          </DisplayPanel>

          <DisplayPanel transparency="medium" border="intense" title="Performance Metrics">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-lcars-blue/80">Page Load</span>
                <DataDisplay value={1.2} unit="s" size="lg" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-lcars-blue/80">API Response</span>
                <DataDisplay value={0.3} unit="s" size="lg" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-lcars-blue/80">Uptime</span>
                <DataDisplay value={99.9} unit="%" size="lg" />
              </div>
              <StatusIndicator
                status="normal"
                size="lg"
                pulse="normal"
                label="All Systems Operational"
              />
            </div>
          </DisplayPanel>
        </div>

        {/* 接続パネル */}
        <ConnectedPanels
          direction="horizontal"
          connection="curve"
          connectorStyle="glow"
          panels={[
            {
              content: (
                <div className="space-y-2">
                  <DataDisplay value={2847} label="Sessions" size="xl" />
                  <StatusIndicator status="normal" label="Active" />
                </div>
              ),
              panelProps: { variant: "default", title: "Current" },
            },
            {
              content: (
                <div className="space-y-2">
                  <DataDisplay value={12584} label="Sessions" size="xl" />
                  <StatusIndicator status="normal" label="Today" />
                </div>
              ),
              panelProps: { variant: "orange", title: "Today" },
            },
            {
              content: (
                <div className="space-y-2">
                  <DataDisplay value={84759} label="Sessions" size="xl" />
                  <StatusIndicator status="normal" label="This Week" />
                </div>
              ),
              panelProps: { variant: "yellow", title: "This Week" },
            },
          ]}
        />
      </div>
    </div>
  ),
};

/**
 * 全コンポーネント統合ショーケース
 * プロジェクト内のすべてのコンポーネントを組み合わせた包括的なデモンストレーション
 */
export const AllComponentsShowcase: Story = {
  render: () => (
    <div className="min-h-screen bg-black p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* ヘッダーセクション: GlowText + ClockDisplay */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b-2 border-lcars-blue/30 pb-6">
          <div className="space-y-2">
            <GlowText
              as="h1"
              color="blue"
              intensity="intense"
              size="4xl"
              weight="bold"
              animate="pulse"
              className="uppercase tracking-wider"
            >
              Component Library Showcase
            </GlowText>
            <GlowText color="blue" intensity="normal" size="lg" className="opacity-90">
              SF映画をインスパイアしたUIコンポーネントの完全な統合デモ
            </GlowText>
          </div>
          <ClockDisplay use24Hour showSeconds showDate label="System Time" size="lg" />
        </div>

        {/* コントロールセクション: GlowButton + FeedbackControl */}
        <section className="space-y-6">
          <GlowText as="h2" color="blue" intensity="normal" size="2xl" weight="bold">
            Control Interface
          </GlowText>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LCARSPanel variant="default" title="Action Buttons">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <GlowButton variant="default" size="lg">
                    Engage
                  </GlowButton>
                  <GlowButton variant="destructive" size="lg">
                    Emergency
                  </GlowButton>
                  <GlowButton variant="warning" size="lg">
                    Standby
                  </GlowButton>
                  <GlowButton variant="purple" size="lg">
                    Activate
                  </GlowButton>
                  <GlowButton variant="green" size="lg">
                    Confirm
                  </GlowButton>
                  <GlowButton variant="outline" size="lg">
                    Cancel
                  </GlowButton>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="default">Standard Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                </div>
              </div>
            </LCARSPanel>

            <LCARSPanel variant="orange" title="Feedback Controls">
              <div className="space-y-4">
                <FeedbackControl
                  direction="horizontal"
                  label="Warp Core Power"
                  description="Adjust power output level"
                  input={
                    <input
                      type="range"
                      min="0"
                      max="100"
                      defaultValue="75"
                      className="w-32 h-2 bg-lcars-dark rounded-lg appearance-none cursor-pointer accent-lcars-orange"
                    />
                  }
                  output={
                    <DataDisplay value={75} label="Power" unit="%" size="xl" variant="orange" />
                  }
                />
                <FeedbackControl
                  direction="horizontal"
                  label="Shield Strength"
                  description="Current shield capacity"
                  input={
                    <input
                      type="range"
                      min="0"
                      max="100"
                      defaultValue="87"
                      className="w-32 h-2 bg-lcars-dark rounded-lg appearance-none cursor-pointer accent-lcars-blue"
                    />
                  }
                  output={<DataDisplay value={87} label="Shields" unit="%" size="xl" />}
                />
              </div>
            </LCARSPanel>
          </div>
        </section>

        {/* データ表示セクション: DataDisplay + LCARSDiagram + StatusIndicator */}
        <section className="space-y-6">
          <GlowText as="h2" color="blue" intensity="normal" size="2xl" weight="bold">
            Data Visualization
          </GlowText>

          <LCARSGrid columns={3} gap="lg">
            <LCARSPanel variant="default" title="System Metrics">
              <div className="space-y-4">
                <DataDisplay value={2847} label="Active Users" size="2xl" glow="intense" />
                <DataDisplay value={92.5} label="Uptime" unit="%" size="xl" />
                <div className="flex items-center gap-2">
                  <StatusIndicator status="normal" size="lg" pulse="normal" />
                  <span className="text-sm text-lcars-blue">All Systems Operational</span>
                </div>
              </div>
            </LCARSPanel>

            <LCARSDiagram
              title="Power Distribution"
              data={[75, 87, 45, 92]}
              labels={["Core", "Shields", "Weapons", "Sensors"]}
              type="bar"
              variant="default"
            />

            <LCARSPanel variant="yellow" title="Status Overview">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-lcars-yellow/80">Primary Systems</span>
                  <StatusIndicator status="normal" size="sm" label="Online" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-lcars-yellow/80">Backup Systems</span>
                  <StatusIndicator status="warning" size="sm" label="Standby" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-lcars-yellow/80">Emergency Systems</span>
                  <StatusIndicator status="danger" size="sm" label="Critical" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-lcars-yellow/80">Network Status</span>
                  <StatusIndicator status="success" size="sm" label="Active" />
                </div>
              </div>
            </LCARSPanel>
          </LCARSGrid>
        </section>

        {/* パネルセクション: LCARSPanel + DisplayPanel + ConnectedPanels */}
        <section className="space-y-6">
          <GlowText as="h2" color="blue" intensity="normal" size="2xl" weight="bold">
            Panel Systems
          </GlowText>

          <ConnectedPanels
            direction="horizontal"
            connection="curve"
            connectorStyle="glow"
            panels={[
              {
                content: (
                  <div className="space-y-2">
                    <DataDisplay value={100} label="Warp Core" unit="%" size="2xl" />
                    <StatusIndicator status="normal" size="lg" pulse="normal" label="Online" />
                  </div>
                ),
                panelProps: { variant: "default", title: "Core Systems" },
              },
              {
                content: (
                  <div className="space-y-2">
                    <DataDisplay value={87} label="Shields" unit="%" size="2xl" />
                    <StatusIndicator status="normal" size="lg" pulse="normal" label="Active" />
                  </div>
                ),
                panelProps: { variant: "orange", title: "Defense" },
              },
              {
                content: (
                  <div className="space-y-2">
                    <DataDisplay value={45} label="Weapons" unit="%" size="2xl" />
                    <StatusIndicator status="warning" size="lg" pulse="normal" label="Standby" />
                  </div>
                ),
                panelProps: { variant: "yellow", title: "Weapons" },
              },
            ]}
          />

          <LCARSGrid columns={3} gap="lg">
            <DisplayPanel transparency="medium" border="intense" title="Sensor Array">
              <div className="space-y-3">
                <DataDisplay value={1247} label="Range" unit="km" variant="default" />
                <StatusIndicator status="normal" label="Operational" />
              </div>
            </DisplayPanel>

            <DisplayPanel transparency="high" border="intense" title="Navigation">
              <div className="space-y-3">
                <DataDisplay value={0.5} label="Warp Factor" variant="orange" />
                <DataDisplay value={2847} label="Velocity" unit="km/s" variant="default" />
              </div>
            </DisplayPanel>

            <DisplayPanel transparency="subtle" border="normal" title="Life Support">
              <div className="space-y-3">
                <DataDisplay value={98.5} label="Oxygen" unit="%" variant="default" />
                <DataDisplay value={22.3} label="Temperature" unit="°C" variant="default" />
              </div>
            </DisplayPanel>
          </LCARSGrid>
        </section>

        {/* 特殊インターフェースセクション: CLIInterface + WarningScreen + TransparentLayer */}
        <section className="space-y-6">
          <GlowText as="h2" color="blue" intensity="normal" size="2xl" weight="bold">
            Special Interfaces
          </GlowText>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CLIInterface
                variant="hacker"
                prompt="$"
                content={[
                  "SYSTEM ACCESS GRANTED",
                  "INITIALIZING SECURITY PROTOCOLS...",
                  "SCANNING NETWORK INTERFACES...",
                  "STATUS: ALL SYSTEMS NOMINAL",
                ]}
                showCursor
                cursorBlink
              />
            </div>

            <div className="space-y-4">
              <WarningScreen
                variant="warning"
                title="STANDBY MODE"
                message="System is in standby. Awaiting activation command."
                animate="pulse"
              />
              <WarningScreen
                variant="danger"
                title="ALERT"
                message="Unauthorized access attempt detected"
                size="sm"
                animate="intense"
              />
            </div>
          </div>

          <TransparentLayer
            variant="default"
            opacity="normal"
            size="lg"
            backgroundContent={
              <div className="p-8">
                <LCARSDiagram
                  title="Background Data"
                  data={[60, 75, 85, 70, 90]}
                  labels={["A", "B", "C", "D", "E"]}
                  type="line"
                  variant="default"
                />
              </div>
            }
            foregroundContent={
              <div className="space-y-4">
                <GlowText color="blue" intensity="intense" size="xl" weight="bold">
                  FOREGROUND INFORMATION
                </GlowText>
                <DataDisplay value={2847} label="Critical Data" size="2xl" glow="intense" />
                <StatusIndicator
                  status="normal"
                  size="lg"
                  pulse="normal"
                  label="Active Monitoring"
                />
              </div>
            }
          />
        </section>

        {/* 3D空間セクション: SpatialFileManager */}
        <section className="space-y-6">
          <GlowText as="h2" color="blue" intensity="normal" size="2xl" weight="bold">
            3D Spatial File Management
          </GlowText>

          <LCARSPanel variant="default" title="Spatial File Manager">
            <div className="h-[500px]">
              <SpatialFileManager
                files={[
                  {
                    id: "1",
                    name: "system.log",
                    type: "Log",
                    size: 100,
                    position: { x: -20, y: -15, z: -30 },
                  },
                  {
                    id: "2",
                    name: "config.json",
                    type: "Config",
                    size: 200,
                    position: { x: 15, y: -20, z: -20 },
                  },
                  {
                    id: "3",
                    name: "data.db",
                    type: "Database",
                    size: 500,
                    position: { x: 10, y: -10, z: 80 },
                  },
                  {
                    id: "4",
                    name: "backup.tar",
                    type: "Archive",
                    size: 300,
                    position: { x: -15, y: 15, z: -30 },
                  },
                  {
                    id: "5",
                    name: "readme.md",
                    type: "Document",
                    size: 50,
                    position: { x: 20, y: 20, z: 50 },
                  },
                ]}
                mode="mixed"
                activeFileId="3"
                perspective="normal"
              />
            </div>
          </LCARSPanel>
        </section>

        {/* グリッドレイアウトセクション: LCARSGrid */}
        <section className="space-y-6">
          <GlowText as="h2" color="blue" intensity="normal" size="2xl" weight="bold">
            Grid Layout System
          </GlowText>

          <LCARSGrid columns={4} gap="lg">
            <LCARSPanel variant="default" title="Panel 1">
              <DataDisplay value={100} label="Metric 1" unit="%" />
            </LCARSPanel>
            <LCARSPanel variant="orange" title="Panel 2">
              <DataDisplay value={87} label="Metric 2" unit="%" variant="orange" />
            </LCARSPanel>
            <LCARSPanel variant="yellow" title="Panel 3">
              <DataDisplay value={75} label="Metric 3" unit="%" variant="yellow" />
            </LCARSPanel>
            <LCARSPanel variant="red" title="Panel 4">
              <DataDisplay value={45} label="Metric 4" unit="%" variant="red" />
            </LCARSPanel>
          </LCARSGrid>
        </section>

        {/* テキストバリエーションセクション: GlowText */}
        <section className="space-y-6">
          <GlowText as="h2" color="blue" intensity="normal" size="2xl" weight="bold">
            Text Variations
          </GlowText>

          <LCARSPanel variant="default" title="Glow Text Examples">
            <div className="space-y-4">
              <GlowText color="blue" intensity="intense" size="3xl" weight="bold" animate="pulse">
                SYSTEM ONLINE
              </GlowText>
              <GlowText color="red" intensity="normal" size="2xl" weight="semibold">
                WARNING DETECTED
              </GlowText>
              <GlowText color="yellow" intensity="subtle" size="xl" weight="medium">
                Standby Mode Active
              </GlowText>
              <GlowText color="green" intensity="normal" size="lg" animate="glow">
                All Systems Operational
              </GlowText>
              <GlowText color="purple" intensity="intense" size="base" weight="normal">
                Secondary Systems Active
              </GlowText>
            </div>
          </LCARSPanel>
        </section>
      </div>
    </div>
  ),
};
