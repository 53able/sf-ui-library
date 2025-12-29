#!/usr/bin/env node
/**
 * Storybookのビルド後のindex.html内の相対パスを/storybook/ベースの絶対パスに変換するスクリプト
 */
const { readFileSync, writeFileSync, existsSync } = require('fs');
const { join } = require('path');

const storybookDir = join(process.cwd(), 'public', 'storybook');
const indexHtmlPath = join(storybookDir, 'index.html');
const iframeHtmlPath = join(storybookDir, 'iframe.html');

/**
 * HTMLファイル内の相対パスを/storybook/ベースの絶対パスに変換
 */
const fixPaths = (htmlContent) => {
  // <head>タグの直後に<base>タグを追加（まだ存在しない場合）
  if (!htmlContent.includes('<base')) {
    htmlContent = htmlContent.replace(
      /(<head[^>]*>)/i,
      '$1\n    <base href="/storybook/" />'
    );
  }
  
  // 相対パス（./で始まるパス）を/storybook/ベースの絶対パスに変換
  return htmlContent
    .replace(/href="\.\//g, 'href="/storybook/')
    .replace(/src="\.\//g, 'src="/storybook/')
    .replace(/import\s+['"]\.\//g, (match) => match.replace('./', '/storybook/'))
    .replace(/url\(['"]?\.\//g, (match) => match.replace('./', '/storybook/'));
};

try {
  // index.htmlを修正
  if (existsSync(indexHtmlPath)) {
    const indexHtml = readFileSync(indexHtmlPath, 'utf-8');
    const fixedIndexHtml = fixPaths(indexHtml);
    writeFileSync(indexHtmlPath, fixedIndexHtml, 'utf-8');
    console.log('✓ Fixed paths in index.html');
  }

  // iframe.htmlを修正
  if (existsSync(iframeHtmlPath)) {
    const iframeHtml = readFileSync(iframeHtmlPath, 'utf-8');
    const fixedIframeHtml = fixPaths(iframeHtml);
    writeFileSync(iframeHtmlPath, fixedIframeHtml, 'utf-8');
    console.log('✓ Fixed paths in iframe.html');
  }

  console.log('✓ Storybook paths fixed successfully');
} catch (error) {
  console.error('✗ Error fixing Storybook paths:', error);
  process.exit(1);
}

