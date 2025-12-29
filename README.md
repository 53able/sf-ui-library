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

このRegistryを使用してコンポーネントをインストールするには、**shadcn/ui CLIの標準コマンド**を使用します。

#### 1. components.jsonの設定

まず、プロジェクトルートに`components.json`を作成します。shadcn/ui CLIで初期化していない場合は、以下のコマンドで作成できます：

```bash
npx shadcn@latest init
```

#### 2. コンポーネントのインストール

**公式の方法**: shadcn/ui CLIを使用してコンポーネントをインストールします。

```bash
# 個別のコンポーネントをインストール
npx shadcn@latest add http://localhost:3000/r/button.json

# または、デプロイされたRegistryから
npx shadcn@latest add https://your-registry-url.com/r/button.json
```

**ローカル開発時**（このリポジトリで開発サーバーを起動している場合）:

```bash
# 開発サーバーを起動
pnpm dev

# 別のターミナルでコンポーネントをインストール
npx shadcn@latest add http://localhost:3000/r/button.json
```

**本番環境での使用**:

Registryをデプロイした後、デプロイされたURLからコンポーネントをインストールできます：

```bash
npx shadcn@latest add https://your-registry-url.com/r/sf-ui-theme.json
npx shadcn@latest add https://your-registry-url.com/r/button.json
```

#### 3. Registryのビルドとデプロイ

このプロジェクトでRegistryをビルドするには：

```bash
pnpm registry:build
```

これにより、`public/r/`ディレクトリに個別のJSONファイルが生成されます（例：`public/r/button.json`、`public/r/sf-ui-theme.json`など）。

これらのファイルをデプロイして、上記のURLからアクセスできるようにします。

#### 3. フォントの設定

**Next.jsを使用している場合（推奨）:**

`sf-ui-fonts-next`をインストールした後、`app/layout.tsx`（または`src/app/layout.tsx`）を更新：

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

`sf-ui-fonts`をインストールした後、`app/layout.tsx`（またはルートレイアウト）に追加：

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

`sf-ui-theme`をインストールした後、`app/globals.css`（または`src/app/globals.css`）に以下を追加：

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

### トラブルシューティング

#### コンポーネントのインストールが失敗する場合

1. **Registry URLが正しいか確認**
   - ローカル開発時は`http://localhost:3000/r/[NAME].json`の形式を使用
   - 本番環境ではデプロイされたURLを確認

2. **開発サーバーが起動しているか確認**
   - ローカル開発時は`pnpm dev`で開発サーバーを起動
   - Registryファイルは`public/r/`ディレクトリに配置される必要があります

3. **components.jsonが正しく設定されているか確認**
   - `aliases`が正しく設定されているか確認してください
   - パスエイリアス（`@/components`など）が正しく解決されるか確認してください

4. **Registryのビルドを実行**
   - `pnpm registry:build`を実行してRegistryファイルを生成
   - `public/r/`ディレクトリにJSONファイルが生成されているか確認

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

このプロジェクトをVercelで公開すると、以下が利用可能になります：
- Next.jsアプリ（メインページ）
- Registryファイルの配信（`/r/[NAME].json`）
- Storybookへのリンク

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

   これで本番環境にデプロイされます。`vercel.json`が設定されているため、自動的に以下が実行されます：
   - Registryのビルド（`pnpm registry:build`）
   - Next.jsアプリのビルド（`pnpm build`）

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
   - Framework: Next.js
   - ビルドコマンド: `pnpm registry:build && pnpm build`
   - Registryファイルは`public/r/`ディレクトリから自動的に配信されます

3. **デプロイ**

   Vercelは自動的にデプロイを実行します。デプロイ後、以下のURLでアクセスできます：
   - メインページ: `https://your-project.vercel.app`
   - Registryファイル: `https://your-project.vercel.app/r/button.json`

#### 環境変数の設定（オプション）

Storybook URLを設定する場合は、Vercelの環境変数に`NEXT_PUBLIC_STORYBOOK_URL`を設定します：
- Vercelダッシュボード → Settings → Environment Variables
- `NEXT_PUBLIC_STORYBOOK_URL`にStorybookのURLを設定（例: `https://your-storybook.vercel.app`）

または、CLIから設定：

```bash
vercel env add NEXT_PUBLIC_STORYBOOK_URL production
```

#### デプロイ後の確認

デプロイが完了したら、以下のURLでRegistryファイルが正しく配信されているか確認してください：

```bash
# Registryファイルの確認
curl https://your-project.vercel.app/r/button.json
curl https://your-project.vercel.app/r/sf-ui-theme.json
```

他のプロジェクトからコンポーネントをインストールする際は、デプロイされたURLを使用します：

```bash
npx shadcn@latest add https://your-project.vercel.app/r/button.json
npx shadcn@latest add https://your-project.vercel.app/r/sf-ui-theme.json
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

