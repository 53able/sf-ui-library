import { NextRequest, NextResponse } from "next/server";
import { readFileSync, existsSync, statSync } from "fs";
import { join } from "path";

/**
 * Storybookの静的ファイルを配信するルートハンドラー
 * /storybook以下のすべてのリクエストをpublic/storybookから配信
 */
export async function GET(request: NextRequest, { params }: { params: { path?: string[] } }) {
  // パスを取得（配列または空）
  const pathSegments = params.path || [];
  const filePath = pathSegments.length > 0 ? pathSegments.join("/") : "index.html";

  // public/storybookからファイルを読み込む
  const publicPath = join(process.cwd(), "public", "storybook", filePath);

  // ファイルが存在しない場合
  if (!existsSync(publicPath)) {
    // ディレクトリの場合はindex.htmlを返す
    try {
      const stats = statSync(publicPath);
      if (stats.isDirectory()) {
        const indexPath = join(publicPath, "index.html");
        if (existsSync(indexPath)) {
          const content = readFileSync(indexPath, "utf-8");
          return new NextResponse(content, {
            headers: {
              "Content-Type": "text/html",
            },
          });
        }
      }
    } catch {
      // ファイルが存在しない場合はindex.htmlを返す（SPA的な動作）
      const indexPath = join(process.cwd(), "public", "storybook", "index.html");
      if (existsSync(indexPath)) {
        const content = readFileSync(indexPath, "utf-8");
        return new NextResponse(content, {
          headers: {
            "Content-Type": "text/html",
          },
        });
      }
    }
    return new NextResponse("Not Found", { status: 404 });
  }

  // ファイルを読み込んで返す
  const content = readFileSync(publicPath);
  const ext = filePath.split(".").pop()?.toLowerCase() || "";

  // Content-Typeを設定
  const contentType = getContentType(ext);

  return new NextResponse(content, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

/**
 * ファイル拡張子からContent-Typeを取得
 */
function getContentType(ext: string): string {
  const types: Record<string, string> = {
    html: "text/html",
    js: "application/javascript",
    css: "text/css",
    json: "application/json",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    svg: "image/svg+xml",
    woff: "font/woff",
    woff2: "font/woff2",
    ttf: "font/ttf",
    eot: "application/vnd.ms-fontobject",
    ico: "image/x-icon",
  };
  return types[ext] || "application/octet-stream";
}
