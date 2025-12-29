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
       "url": "https://raw.githubusercontent.com/53able/sf-ui-library/main/registry.json"
     }
   }
   ```

2. **コンポーネントを追加**

   `components.json`でRegistry URLを設定した後、以下のコマンドでコンポーネントを追加：

   ```bash
   npx shadcn@latest add <component-name>
   ```

   **注意**: `--registry`オプションはshadcn/uiの最新バージョンではサポートされていません。必ず`components.json`でRegistry URLを設定してください。

### 簡単セットアップ（推奨）

このライブラリを使用する際、**Tailwind CSSの設定やフォント設定を手動で行う必要はありません**。以下の手順で自動的に設定されます：

#### 1. Registry URLを設定

まず、`components.json`にRegistry URLを設定します：

```json
{
  "registry": {
    "url": "https://raw.githubusercontent.com/53able/sf-ui-library/main/registry.json"
  }
}
```

#### 2. テーマスタイルのインストール

LCARSカラーとアニメーション設定を含むテーマファイルをインストールします：

```bash
npx shadcn@latest add sf-ui-theme
```

#### 3. フォントの設定

**Next.jsを使用している場合（推奨）:**

```bash
npx shadcn@latest add sf-ui-fonts-next
```

次に、`app/layout.tsx`（または`src/app/layout.tsx`）を更新：

```tsx
import { SfUiFontsNext } from "@/styles/fonts-next";

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={SfUiFontsNext.className}>
        {children}
      </body>
    </html>
  );
}
```

**その他のフレームワークの場合:**

```bash
npx shadcn@latest add sf-ui-fonts
```

`app/layout.tsx`（またはルートレイアウト）に追加：

```tsx
import { SfUiFonts } from "@/styles/fonts";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <SfUiFonts />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

#### 4. グローバルCSSにテーマをインポート

`app/globals.css`（または`src/app/globals.css`）に以下を追加：

```css
/* 注意: PostCSSではパスエイリアス（@/）が解決できないため、相対パスを使用してください */
@import "../styles/sf-ui-theme.css";
```

**重要**: `@import "@/styles/sf-ui-theme.css"`は動作しません。必ず相対パス（`../styles/sf-ui-theme.css`）を使用してください。

これで完了です！LCARSカラー（`lcars-blue`、`lcars-orange`など）やカスタムフォント（`font-lcars`、`font-cli`、`font-sf`）が自動的に使用可能になります。

#### 使用例

```tsx
// LCARSカラーの使用
<div className="bg-lcars-blue text-lcars-orange">
  LCARS風のスタイル
</div>

// カスタムフォントの使用
<h1 className="font-lcars">LCARS風のタイトル</h1>
<code className="font-cli">CLI風のコード</code>
<div className="font-sf">SF風のテキスト</div>
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
   - プロジェクト名（任意の名前を設定可能）
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

