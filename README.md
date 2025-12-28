# SF UI Library

shadcn/uiをベースにしたカスタムUIコンポーネントライブラリです。

## 技術スタック

- **パッケージマネージャー**: pnpm
- **TypeScript**: 7.0 (プレビュー版 - `@typescript/native-preview`)
- **フレームワーク**: Next.js 14
- **スタイリング**: Tailwind CSS 4.x
- **Linter/Formatter**: Biome

## セットアップ

```bash
pnpm install
```

## 開発

```bash
pnpm run dev
```

## ビルド

```bash
pnpm run build
```

## 型チェック

```bash
# TypeScript 7 (tsgo) を使用
pnpm run typecheck

# 従来のTypeScript (tsc) を使用（フォールバック）
pnpm run typecheck:legacy
```

## Registry配布

このライブラリはshadcn/uiのRegistryシステムを使って配布されます。

### Registryのビルド

Registry JSONを生成するには、以下のコマンドを実行します：

```bash
pnpm build:registry
```

これにより、`registry.json`ファイルがプロジェクトルートに生成されます。

### Storybook URLの設定

Storybook URLをRegistryに含めるには、環境変数を設定します：

```bash
# ローカル開発時
STORYBOOK_URL=http://localhost:6006 pnpm build:registry

# 本番環境
STORYBOOK_URL=https://your-storybook-url.com pnpm build:registry
```

または、`.env`ファイルに設定することもできます：

```env
STORYBOOK_URL=http://localhost:6006
```

### 他プロジェクトでの使用

このRegistryを使用してコンポーネントをインストールするには：

1. **Registry URLを設定**

   `components.json`にRegistry URLを追加：

   ```json
   {
     "registry": {
       "url": "https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/registry.json"
     }
   }
   ```

2. **コンポーネントを追加**

   ```bash
   npx shadcn@latest add <component-name> --registry https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/registry.json
   ```

   または、`components.json`で設定済みの場合：

   ```bash
   npx shadcn@latest add <component-name>
   ```

### 利用可能なコンポーネント

以下のコンポーネントがRegistryに登録されています：

- `button` - 基本的なボタンコンポーネント
- `cli-interface` - CLI風インターフェース
- `clock-display` - LCARS風デジタル時計
- `concept-page` - コンセプトページ
- `connected-panels` - 接続されたパネル
- `data-display` - 数値表示コンポーネント
- `display-panel` - 表示パネル
- `feedback-control` - フィードバックコントロール
- `glow-button` - 発光ボタン
- `glow-text` - 発光テキスト
- `lcars-diagram` - LCARS風ダイアグラム
- `lcars-grid` - LCARS風グリッド
- `lcars-panel` - LCARS風パネル
- `spatial-file-manager` - 空間ファイルマネージャー
- `status-indicator` - ステータスインジケーター
- `transparent-layer` - 透明レイヤー
- `warning-screen` - 警告画面

## Storybook

コンポーネントのプレビューとドキュメント化にはStorybookを使用します。

### Storybookの起動

```bash
pnpm storybook
```

ブラウザで `http://localhost:6006` を開いてコンポーネントを確認できます。

### Storybookのビルド

```bash
pnpm build-storybook
```

ビルドされたStorybookは`storybook-static`ディレクトリに出力されます。

### Vercelでの公開

StorybookをVercelで公開するには、以下の手順を実行します：

#### 方法1: Vercel CLIを使用（推奨）

1. **Vercel CLIでログイン**

   ```bash
   vercel login
   ```

   GitHubアカウントでログインすると、自動的にGitHub連携が設定されます。

2. **プロジェクトのリンク**

   ```bash
   vercel link
   ```

   対話的に以下を設定します：
   - 既存のプロジェクトとリンクするか、新規作成するか
   - プロジェクト名（デフォルト: `sf-ui-library`）
   - Gitリポジトリの設定

3. **初回デプロイ**

   ```bash
   vercel --prod
   ```

   これで本番環境にデプロイされます。

4. **GitHub連携の完了（自動デプロイ設定）**

   CLIでリンクした後、完全な自動デプロイ連携を有効にするには：
   - Vercelダッシュボード → プロジェクト → Settings → Git
   - GitHubリポジトリを接続（まだ接続されていない場合）
   - これにより、GitHubへのプッシュ時に自動的にデプロイされます

#### 方法2: Vercelダッシュボードからインポート

1. **Vercelにプロジェクトをインポート**

   VercelのダッシュボードからGitHubリポジトリをインポートします。

2. **ビルド設定の確認**

   `vercel.json`が既に設定されているため、Vercelは自動的に以下を認識します：
   - ビルドコマンド: `pnpm build-storybook`
   - 出力ディレクトリ: `storybook-static`

3. **デプロイ**

   Vercelは自動的にデプロイを実行します。デプロイ後、Vercelから提供されるURLでStorybookにアクセスできます。

#### 環境変数の設定（オプション）

Registryのビルド時にStorybook URLを含める場合は、Vercelの環境変数に`STORYBOOK_URL`を設定します：
- Vercelダッシュボード → Settings → Environment Variables
- `STORYBOOK_URL`にVercelのデプロイURLを設定

または、CLIから設定：

```bash
vercel env add STORYBOOK_URL production
```

### StorybookとRegistryの連携

Registryに登録された各コンポーネントには、StorybookのURLが自動的に付与されます。
これにより、コンポーネントのドキュメントとプレビューを一元管理できます。

- Registryからコンポーネントをインストールする際、Storybook URLも参照可能
- コンポーネントの使用方法やバリエーションをStorybookで確認可能
- 開発中のコンポーネントをStorybookでプレビューしながら開発可能

## プロジェクト構造

```
.
├── app/              # Next.js App Router
├── components/       # Reactコンポーネント
│   └── ui/          # shadcn/uiコンポーネント
├── lib/             # ユーティリティ関数
└── docs/            # ドキュメント
```

