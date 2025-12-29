/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Storybookのstoriesファイルをビルドから除外
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  webpack: (config) => {
    // storiesファイルをビルドから除外
    config.module.rules.push({
      test: /\.stories\.(tsx?|jsx?)$/,
      loader: "ignore-loader",
    });
    return config;
  },
};
module.exports = nextConfig;
