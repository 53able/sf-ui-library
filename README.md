# SF UI Library

shadcn/uiをベースにしたカスタムUIコンポーネントライブラリです。

**ライブラリURL**: https://sf-ui-library.vercel.app/

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

### Tailwind CSS 4.xを使用する場合

Tailwind CSS 4.xを使用する場合は、`@tailwindcss/postcss`パッケージをインストールし、`postcss.config.js`を設定してください：

```bash
npm install -D @tailwindcss/postcss
```

```js
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

**注意**: `sf-ui-theme.css`で`@import "tailwindcss"`を使用しているため、PostCSS設定が必要です。Tailwind CSS 4.xでは`@tailwindcss/postcss`パッケージが必須です。

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
npx shadcn@latest add https://sf-ui-library.vercel.app/r/sf-ui-theme.json
npx shadcn@latest add https://sf-ui-library.vercel.app/r/button.json
```

#### 3. Registryのビルドとデプロイ

このプロジェクトでRegistryをビルドするには：

```bash
pnpm registry:build
```

これにより、`public/r/`ディレクトリに個別のJSONファイルが生成されます（例：`public/r/button.json`、`public/r/sf-ui-theme.json`など）。

これらのファイルをデプロイして、上記のURLからアクセスできるようにします。

#### 3. フォントの設定

SF UI Libraryは以下のGoogle Fontsを使用します：

- **Rajdhani** - LCARS風フォント（`font-lcars`）
- **Share Tech Mono** - CLI風フォント（`font-cli`）
- **Orbitron** - SF風フォント（`font-sf`）

##### Next.jsを使用している場合（推奨）

`sf-ui-fonts-next`をインストールした後、`app/layout.tsx`（または`src/app/layout.tsx`）を更新：

```bash
npx shadcn@latest add https://sf-ui-library.vercel.app/r/sf-ui-fonts-next.json
```

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

**重要**: `sf-ui-fonts-next`はNext.js専用です。Viteプロジェクトでは使用できません。

##### Viteプロジェクトの場合

Viteプロジェクトでは2つの方法があります。

**方法1: sf-ui-fontsコンポーネントを使用（推奨）**

```bash
npx shadcn@latest add https://sf-ui-library.vercel.app/r/sf-ui-fonts.json
```

`src/App.tsx`または`src/main.tsx`で`SfUiFonts`コンポーネントを使用：

```tsx
import { SfUiFonts } from "@/styles/fonts";

export default function App() {
  return (
    <>
      <SfUiFonts />
      {/* アプリケーションのコンテンツ */}
    </>
  );
}
```

**方法2: index.htmlに直接追加**

`index.html`のheadセクションに以下を追加：

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap"
  rel="stylesheet"
/>
```

**Viteプロジェクトでの注意事項:**

- `sf-ui-fonts-next`は`next/font/google`に依存しているため、Viteプロジェクトでは使用できません
- Viteプロジェクトでは必ず`sf-ui-fonts`を使用するか、index.htmlに直接Google Fontsを追加してください
- 誤って`sf-ui-fonts-next`をインストールした場合は、`tsconfig.app.json`（または`tsconfig.json`）で除外することを推奨します：
  ```json
  {
    "exclude": ["**/fonts-next.tsx"]
  }
  ```

#### 4. グローバルCSSにテーマをインポート

`sf-ui-theme`をインストールした後、グローバルCSSファイルにテーマをインポートします。

**注意**: shadcn CLIはテーマCSSを自動でインポートしません。手動で追加する必要があります。

##### Next.jsプロジェクトの場合

`app/globals.css`（または`src/app/globals.css`）に以下を追加：

```css
/* 注意: PostCSSではパスエイリアス（@/）が解決できないため、相対パスを使用してください */
@import "../styles/sf-ui-theme.css";
```

##### Viteプロジェクトの場合

`src/index.css`（または`src/styles/globals.css`）に以下を追加：

```css
/* Viteプロジェクトの場合 - 配置場所に応じて相対パスを調整してください */
@import "./components/sf-ui-theme.css";
```

**shadcn CLIのデフォルト設定を使用している場合**、テーマファイルは`src/components/`に配置されます。パスは`components.json`の`aliases.components`設定に依存します。

**重要**:
- `@import "@/styles/sf-ui-theme.css"`は動作しません。必ず相対パスを使用してください
- Tailwind CSS 4.xを使用している場合、`@tailwindcss/postcss`が必須です

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

### 依存関係のインストール順序

一部のコンポーネントは他のコンポーネントに依存しています。**必ず以下の順序でインストールしてください**。順序を間違えるとビルドエラーが発生します。

#### 依存関係のマップ

```
utils, sf-ui-theme (必須の基盤)
  └─ lcars-panel
      ├─ connected-panels
      ├─ display-panel
      └─ lcars-diagram
```

#### インストール手順

1. **必須の依存関係（最初にインストール）**
   
   すべてのコンポーネントが依存する基盤コンポーネントです。必ず最初にインストールしてください。
   
   ```bash
   npx shadcn@latest add https://sf-ui-library.vercel.app/r/utils.json
   npx shadcn@latest add https://sf-ui-library.vercel.app/r/sf-ui-theme.json
   ```

2. **lcars-panelに依存するコンポーネント（lcars-panelを先にインストール）**
   
   `connected-panels`、`display-panel`、`lcars-diagram`は`lcars-panel`に依存しています。
   **必ず`lcars-panel`を先にインストールしてから、依存コンポーネントをインストールしてください。**
   
   ```bash
   # まず lcars-panel をインストール
   npx shadcn@latest add https://sf-ui-library.vercel.app/r/lcars-panel.json
   
   # その後、依存コンポーネントをインストール
   npx shadcn@latest add https://sf-ui-library.vercel.app/r/connected-panels.json
   npx shadcn@latest add https://sf-ui-library.vercel.app/r/display-panel.json
   npx shadcn@latest add https://sf-ui-library.vercel.app/r/lcars-diagram.json
   ```

3. **その他のコンポーネント（依存関係なし）**
   
   以下のコンポーネントは他のコンポーネントに依存していないため、任意の順序でインストールできます。
   
   ```bash
   npx shadcn@latest add https://sf-ui-library.vercel.app/r/button.json
   npx shadcn@latest add https://sf-ui-library.vercel.app/r/warning-screen.json
   npx shadcn@latest add https://sf-ui-library.vercel.app/r/spatial-file-manager.json
   # ... その他のコンポーネント
   ```

#### インポートパスの自動変換について

Registry JSONファイル内のインポートパスは、自動的に`@/components/`に変換されます。
- 元のパス: `@/components/ui/lcars-panel`
- 変換後: `@/components/lcars-panel`

これは、shadcn/ui CLIでインストールすると`@/components/`に配置されるためです。
変換処理は`scripts/transform-registry-imports.ts`で自動的に行われます。

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

5. **依存関係のエラーが発生する場合**
   
   **エラーメッセージ例1（依存関係が見つからない）**:
   ```
   The item at https://ui.shadcn.com/r/styles/default/lcars-panel.json was not found. 
   It may not exist at the registry.
   ```
   
   **原因**: 
   - `connected-panels`、`display-panel`、`lcars-diagram`は`lcars-panel`に依存しています（`registryDependencies`）
   - shadcn CLIが依存関係を解決する際、デフォルトのregistry（`https://ui.shadcn.com`）を参照しようとしている
   - SF UI Libraryのコンポーネントは `https://sf-ui-library.vercel.app` に存在するため、解決に失敗
   
   **解決策**: 
   - **重要**: 依存関係を持つコンポーネントをインストールする前に、必ず依存元のコンポーネントを先にインストールしてください
   - 上記の「依存関係のインストール順序」セクションを参照してください
   
   **エラーメッセージ例2（インポートパスエラー）**:
   ```
   Cannot find module '@/components/ui/lcars-panel' or its corresponding type declarations.
   ```
   
   **原因**: 
   - Registry JSONファイル内のインポートパスが`@/components/ui/`になっている
   - shadcn/ui CLIでインストールすると`@/components/`に配置されるため、パスが一致しない
   
   **解決策**: 
   - この問題は`scripts/transform-registry-imports.ts`で自動的に修正されます
   - Registryを再ビルドする場合は、`pnpm registry:build`を実行してください
   - 最新のRegistry JSONファイルを使用していることを確認してください
   
   **注意**: 
   - shadcn CLIは現在、カスタムregistryからの依存関係の自動解決を完全にはサポートしていません
   - そのため、依存関係を持つコンポーネントは手動で正しい順序でインストールする必要があります
   - Registryファイル内のインポートパスは自動的に`@/components`エイリアスに変換されます

#### よくあるエラーと解決方法

**エラー: 型定義が見つからない**

- **原因**: TypeScriptの型定義が正しくインポートされていない可能性があります
- **解決策**: 型を明示的にインポートしてください
  ```tsx
  import { ComponentName, type ComponentType } from "@/components/ui/component-name";
  ```

**エラー: プロパティが認識されない**

- **原因**: プロパティ名が間違っている、またはコンポーネントのAPIが変更された可能性があります
- **解決策**: [Storybook](#storybook)でコンポーネントの正しいプロパティと使用方法を確認してください

**エラー: Viteプロジェクトで`sf-ui-fonts-next`を使用した場合の型エラー**

- **原因**: `sf-ui-fonts-next`は`next/font/google`に依存しており、Viteプロジェクトでは使用できません
- **解決策**: 
  - Viteプロジェクトでは`sf-ui-fonts`を使用してください
  - 誤って`sf-ui-fonts-next`をインストールした場合は、`tsconfig.app.json`（または`tsconfig.json`）で除外してください：
    ```json
    {
      "exclude": ["**/fonts-next.tsx"]
    }
    ```

コンポーネント固有のエラーや詳細な解決方法については、[Storybook](#storybook)で各コンポーネントのドキュメントを確認してください。

### 利用可能なコンポーネント

以下のコンポーネントがRegistryに登録されています。各コンポーネントの詳細な使用方法、プロパティ、使用例については、[Storybook](https://sf-ui-library.vercel.app/storybook)で確認してください：

- `button` - 基本的なボタンコンポーネント（[Storybookで確認](https://sf-ui-library.vercel.app/storybook)）
- `cli-interface` - CLI風インターフェース（[Storybookで確認](https://sf-ui-library.vercel.app/storybook)）
- `clock-display` - LCARS風デジタル時計（[Storybookで確認](https://sf-ui-library.vercel.app/storybook)）
- `connected-panels` - 接続されたパネル（[Storybookで確認](https://sf-ui-library.vercel.app/storybook)）
- `data-display` - 数値表示コンポーネント（[Storybookで確認](https://sf-ui-library.vercel.app/storybook)）
- `display-panel` - 表示パネル（[Storybookで確認](https://sf-ui-library.vercel.app/storybook)）
- `feedback-control` - フィードバックコントロール（[Storybookで確認](https://sf-ui-library.vercel.app/storybook)）
- `glow-button` - 発光ボタン（[Storybookで確認](https://sf-ui-library.vercel.app/storybook)）
- `glow-text` - 発光テキスト（[Storybookで確認](https://sf-ui-library.vercel.app/storybook)）
- `lcars-diagram` - LCARS風ダイアグラム（[Storybookで確認](https://sf-ui-library.vercel.app/storybook)）
- `lcars-grid` - LCARS風グリッド（[Storybookで確認](https://sf-ui-library.vercel.app/storybook)）
- `lcars-panel` - LCARS風パネル（[Storybookで確認](https://sf-ui-library.vercel.app/storybook)）
- `spatial-file-manager` - 空間ファイルマネージャー（[Storybookで確認](https://sf-ui-library.vercel.app/storybook)）
- `status-indicator` - ステータスインジケーター（[Storybookで確認](https://sf-ui-library.vercel.app/storybook)）
- `transparent-layer` - 透明レイヤー（[Storybookで確認](https://sf-ui-library.vercel.app/storybook)）
- `warning-screen` - 警告画面（[Storybookで確認](https://sf-ui-library.vercel.app/storybook)）

## Storybook

コンポーネントのプレビューとドキュメント化にはStorybookを使用します。

**重要**: 各コンポーネントの詳細な使用方法、プロパティ一覧、使用例、インタラクティブなプレビューは、Storybookで確認できます。README.mdには基本的なセットアップ情報のみを記載しています。

### Storybookの起動

```bash
pnpm storybook
```

ブラウザで `http://localhost:6006` を開いてコンポーネントを確認できます。

**本番環境のStorybook**: https://sf-ui-library.vercel.app/storybook

### コンポーネントの詳細確認

Storybookでは以下の情報を確認できます：

- **インタラクティブなプレビュー**: 各コンポーネントを実際に操作して動作を確認
- **プロパティ一覧**: 利用可能なすべてのプロパティとその型、デフォルト値
- **使用例**: 様々なバリエーションとユースケース
- **コード例**: コピー&ペースト可能な実装コード
- **アクセシビリティ情報**: アクセシビリティのベストプラクティス

各コンポーネントのStorybookページでは、サイドバーからコンポーネントを選択して詳細を確認できます。

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
   - メインページ: https://sf-ui-library.vercel.app/
   - Registryファイル: https://sf-ui-library.vercel.app/r/button.json
   - Storybook: https://sf-ui-library.vercel.app/storybook

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
curl https://sf-ui-library.vercel.app/r/button.json
curl https://sf-ui-library.vercel.app/r/sf-ui-theme.json
```

他のプロジェクトからコンポーネントをインストールする際は、デプロイされたURLを使用します：

```bash
npx shadcn@latest add https://sf-ui-library.vercel.app/r/button.json
npx shadcn@latest add https://sf-ui-library.vercel.app/r/sf-ui-theme.json
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

