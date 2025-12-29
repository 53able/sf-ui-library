/**
 * SF UI Library Fonts Loader for Next.js
 * 
 * Next.jsのnext/font/googleを使用した最適化されたフォント読み込み。
 * 
 * 使用方法:
 * 1. プロジェクトのルートレイアウト（例: app/layout.tsx）に追加:
 * 
 *    import { SfUiFontsNext } from "@/styles/fonts-next";
 * 
 *    export default function RootLayout({ children }) {
 *      return (
 *        <html>
 *          <body className={SfUiFontsNext.className}>
 *            {children}
 *          </body>
 *        </html>
 *      );
 *    }
 * 
 * 2. または、個別のフォントを使用する場合:
 * 
 *    import { lcarsFont, cliFont, sfFont } from "@/styles/fonts-next";
 * 
 *    export default function RootLayout({ children }) {
 *      return (
 *        <html>
 *          <body className={`${lcarsFont.variable} ${cliFont.variable} ${sfFont.variable}`}>
 *            {children}
 *          </body>
 *        </html>
 *      );
 *    }
 */

import { Rajdhani, Share_Tech_Mono, Orbitron } from "next/font/google";

/**
 * LCARS風フォント（Rajdhani）
 */
export const lcarsFont = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-lcars",
  display: "swap",
});

/**
 * CLI風フォント（Share Tech Mono）
 */
export const cliFont = Share_Tech_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cli",
  display: "swap",
});

/**
 * SF風フォント（Orbitron）
 */
export const sfFont = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-sf",
  display: "swap",
});

/**
 * すべてのフォントをまとめたオブジェクト
 * classNameプロパティを使用してbodyタグに適用できます
 */
export const SfUiFontsNext = {
  className: `${lcarsFont.variable} ${cliFont.variable} ${sfFont.variable}`,
};


