import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { NextResponse } from "next/server";

/**
 * Storybookのルート（/storybook）を処理するルートハンドラー
 * /storybookにアクセスした場合、index.htmlを返す
 */
export async function GET() {
  const indexPath = join(process.cwd(), "public", "storybook", "index.html");

  if (!existsSync(indexPath)) {
    return new NextResponse("Storybook not found. Please build Storybook first.", {
      status: 404,
    });
  }

  const content = readFileSync(indexPath, "utf-8");

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/html",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
