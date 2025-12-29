import { NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * Storybookのルート（/storybook）を処理するルートハンドラー
 * /storybookにアクセスした場合、index.htmlを返す
 */
export async function GET() {
  const indexPath = join(process.cwd(), 'public', 'storybook', 'index.html');

  if (!existsSync(indexPath)) {
    return new NextResponse('Storybook not found. Please build Storybook first.', {
      status: 404,
    });
  }

  const content = readFileSync(indexPath, 'utf-8');

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}

