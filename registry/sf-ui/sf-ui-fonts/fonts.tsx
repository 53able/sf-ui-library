/**
 * SF UI Library Fonts Loader
 *
 * このコンポーネントを使用すると、必要なフォントが自動的に読み込まれます。
 *
 * 使用方法:
 * 1. プロジェクトのルートレイアウト（例: app/layout.tsx）に追加:
 *
 *    import { SfUiFonts } from "@/styles/fonts";
 *
 *    export default function RootLayout({ children }) {
 *      return (
 *        <html>
 *          <head>
 *            <SfUiFonts />
 *          </head>
 *          <body>{children}</body>
 *        </html>
 *      );
 *    }
 *
 * 2. または、Next.jsの場合はnext/font/googleを使用することもできます。
 */

/**
 * SF UI Libraryで使用するフォントを読み込むコンポーネント
 */
export const SfUiFonts = (): JSX.Element => {
  return (
    <>
      {/* Rajdhani - LCARS風フォント */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      {/* Share Tech Mono - CLI風フォント */}
      <link
        href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap"
        rel="stylesheet"
      />
      {/* Orbitron - SF風フォント */}
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
    </>
  );
};
