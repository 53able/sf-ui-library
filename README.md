# SF UI Library

LCARS（スタートレック風）デザインのUIコンポーネントライブラリです。shadcn/ui CLIを使って、あなたのプロジェクトにSF風のUIを簡単に導入できます。

🌐 **ライブラリURL**: https://sf-ui-library.vercel.app/

📚 **Storybook**: https://sf-ui-library.vercel.app/storybook

## クイックスタート

3ステップでSF UIコンポーネントを使い始められます：

```bash
# 1. 必須の基盤をインストール
npx shadcn@latest add https://sf-ui-library.vercel.app/r/utils.json
npx shadcn@latest add https://sf-ui-library.vercel.app/r/sf-ui-theme.json

# 2. 好きなコンポーネントをインストール
npx shadcn@latest add https://sf-ui-library.vercel.app/r/button.json

# 3. グローバルCSSにテーマをインポート（手動）
```

```css
/* app/globals.css に追加 */
@import "../styles/sf-ui-theme.css";
```

これだけで、LCARSカラーやカスタムフォントが使えるようになります！

## 利用可能なコンポーネント

各コンポーネントの詳細な使用方法、プロパティ、インタラクティブなデモは [Storybook](https://sf-ui-library.vercel.app/storybook) で確認できます。

| コンポーネント | 説明 |
|--------------|------|
| `button` | 基本的なボタン |
| `glow-button` | 発光エフェクト付きボタン |
| `glow-text` | 発光テキスト |
| `lcars-panel` | LCARS風パネル |
| `connected-panels` | 接続されたパネル |
| `display-panel` | 表示パネル |
| `lcars-diagram` | LCARS風ダイアグラム |
| `lcars-grid` | LCARS風グリッド |
| `cli-interface` | CLI風インターフェース |
| `clock-display` | LCARS風デジタル時計 |
| `data-display` | 数値表示 |
| `feedback-control` | フィードバックコントロール |
| `spatial-file-manager` | 空間ファイルマネージャー |
| `status-indicator` | ステータスインジケーター |
| `transparent-layer` | 透明レイヤー |
| `warning-screen` | 警告画面 |

## インストール

### 前提条件

- shadcn/ui CLIでプロジェクトが初期化されていること
- Tailwind CSS 4.x を使用する場合は `@tailwindcss/postcss` が必要

```bash
# shadcn/uiの初期化（まだの場合）
npx shadcn@latest init

# Tailwind CSS 4.xを使用する場合
npm install -D @tailwindcss/postcss
```

### 必須の基盤コンポーネント

すべてのコンポーネントが依存する基盤を最初にインストールしてください：

```bash
npx shadcn@latest add https://sf-ui-library.vercel.app/r/utils.json
npx shadcn@latest add https://sf-ui-library.vercel.app/r/sf-ui-theme.json
```

### コンポーネントのインストール

```bash
npx shadcn@latest add https://sf-ui-library.vercel.app/r/[コンポーネント名].json
```

**例:**

```bash
npx shadcn@latest add https://sf-ui-library.vercel.app/r/button.json
npx shadcn@latest add https://sf-ui-library.vercel.app/r/glow-button.json
npx shadcn@latest add https://sf-ui-library.vercel.app/r/lcars-panel.json
```

### 依存関係のあるコンポーネント

一部のコンポーネントは他のコンポーネントに依存しています。**必ず依存元を先にインストールしてください**。

```
lcars-panel （先にインストール）
  └─ connected-panels
  └─ display-panel
  └─ lcars-diagram
```

```bash
# 正しい順序
npx shadcn@latest add https://sf-ui-library.vercel.app/r/lcars-panel.json
npx shadcn@latest add https://sf-ui-library.vercel.app/r/connected-panels.json
```

## セットアップ

### テーマのインポート（必須）

`sf-ui-theme` をインストールした後、グローバルCSSにテーマをインポートしてください。

> ⚠️ **注意**: shadcn CLIはテーマCSSを自動でインポートしません。手動で追加が必要です。

**Next.js** (`app/globals.css`):

```css
@import "../styles/sf-ui-theme.css";
```

**Vite** (`src/index.css`):

```css
@import "./components/sf-ui-theme.css";
```

> ⚠️ **重要**: `@import "@/styles/..."` のようなパスエイリアスはPostCSSで解決できません。必ず相対パスを使用してください。

### フォントの設定

SF UI Libraryは以下のGoogle Fontsを使用します：

| フォント | クラス名 | 用途 |
|---------|---------|-----|
| Rajdhani | `font-lcars` | LCARS風フォント |
| Share Tech Mono | `font-cli` | CLI風フォント |
| Orbitron | `font-sf` | SF風フォント |

#### Next.jsの場合（推奨）

```bash
npx shadcn@latest add https://sf-ui-library.vercel.app/r/sf-ui-fonts-next.json
```

```tsx
// app/layout.tsx
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

#### Viteの場合

```bash
npx shadcn@latest add https://sf-ui-library.vercel.app/r/sf-ui-fonts.json
```

```tsx
// src/App.tsx
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

> ⚠️ **注意**: `sf-ui-fonts-next` はNext.js専用です。Viteプロジェクトでは使用できません。

## 使い方

### LCARSカラーの使用

```tsx
<div className="bg-lcars-blue text-lcars-orange">
  LCARS風のスタイル
</div>
```

### カスタムフォントの使用

```tsx
<h1 className="font-lcars">LCARS風のタイトル</h1>
<code className="font-cli">CLI風のコード</code>
<div className="font-sf">SF風のテキスト</div>
```

### コンポーネントの使用例

```tsx
import { Button } from "@/components/button";
import { LcarsPanel } from "@/components/lcars-panel";

export default function Dashboard() {
  return (
    <LcarsPanel title="システムステータス">
      <p className="font-cli text-lcars-blue">
        すべてのシステムが正常に稼働中
      </p>
      <Button>詳細を見る</Button>
    </LcarsPanel>
  );
}
```

各コンポーネントの詳細なプロパティや使用例は [Storybook](https://sf-ui-library.vercel.app/storybook) を参照してください。

## トラブルシューティング

### インストールが失敗する

1. **shadcn/uiが初期化されているか確認**
   ```bash
   npx shadcn@latest init
   ```

2. **components.jsonのaliases設定を確認**
   - パスエイリアス（`@/components`など）が正しく解決されるか確認

### 依存関係エラーが発生する

```
The item at https://ui.shadcn.com/r/styles/default/lcars-panel.json was not found.
```

**原因**: 依存元のコンポーネントがインストールされていない

**解決策**: 依存元を先にインストール

```bash
# lcars-panelを先にインストール
npx shadcn@latest add https://sf-ui-library.vercel.app/r/lcars-panel.json
# その後に依存コンポーネントをインストール
npx shadcn@latest add https://sf-ui-library.vercel.app/r/connected-panels.json
```

### インポートパスエラー

```
Cannot find module '@/components/ui/lcars-panel'
```

**原因**: インポートパスの不一致

**解決策**: shadcn/ui CLIでインストールすると `@/components/` に配置されるため、インポートパスを確認

```tsx
// ❌ 間違い
import { LcarsPanel } from "@/components/ui/lcars-panel";

// ✅ 正しい
import { LcarsPanel } from "@/components/lcars-panel";
```

### Viteでフォントエラー

```
Cannot find module 'next/font/google'
```

**原因**: `sf-ui-fonts-next` はNext.js専用

**解決策**: Viteプロジェクトでは `sf-ui-fonts` を使用

誤ってインストールした場合は、`tsconfig.app.json` で除外：

```json
{
  "exclude": ["**/fonts-next.tsx"]
}
```

### テーマが適用されない

1. グローバルCSSに `@import` を追加したか確認
2. 相対パスを使用しているか確認（`@/` は使えない）
3. Tailwind CSS 4.xの場合は `@tailwindcss/postcss` をインストール

## Storybook

各コンポーネントの詳細なドキュメントは Storybook で確認できます：

🔗 https://sf-ui-library.vercel.app/storybook

Storybookでは以下の情報を確認できます：

- **インタラクティブなプレビュー**: コンポーネントを実際に操作して動作を確認
- **プロパティ一覧**: すべてのプロパティとその型、デフォルト値
- **使用例**: 様々なバリエーションとユースケース
- **コード例**: コピー&ペースト可能な実装コード

---

## 開発者向け情報

このライブラリの開発に貢献したい方向けの情報です。

### 技術スタック

- **パッケージマネージャー**: pnpm
- **TypeScript**: 7.0 (プレビュー版)
- **フレームワーク**: Next.js 14
- **スタイリング**: Tailwind CSS 4.x
- **Linter/Formatter**: Biome

### 開発環境のセットアップ

```bash
pnpm install
pnpm dev
```

### Registryのビルド

```bash
pnpm registry:build
```

### Storybookの起動

```bash
pnpm storybook
```

### プロジェクト構造

```
.
├── app/              # Next.js App Router
├── components/       # Storybookストーリー
│   └── ui/          # *.stories.tsxファイル
├── public/          # 静的ファイル
│   └── r/           # Registry JSONファイル
├── registry/        # コンポーネントソースコード
│   └── sf-ui/       # SF UIコンポーネント群
└── scripts/         # ビルドスクリプト
```
