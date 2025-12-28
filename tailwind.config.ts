import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        lcars: [
          '"Rajdhani"',
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        cli: [
          '"Share Tech Mono"',
          "monospace",
        ],
        sf: [
          '"Orbitron"',
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // LCARS風カラーパレット
        lcars: {
          blue: "#4A9EFF", // パステルブルー（発光用）
          orange: "#FF9E4A", // パステルオレンジ
          red: "#FF4A4A", // 危険表示用の赤
          yellow: "#FFE04A", // 警告表示用の黄
          purple: "#9E4AFF", // 紫（LCARSの特徴色）
          gray: "#808080", // グレー（旧世代表現）
          green: "#4AFF9E", // 緑（ハッカー/安全表示）
          dark: "#000000", // 黒背景（LCARS標準）
          "blue-glow": "#6BB5FF", // 青の発光色（強め）
          "red-glow": "#FF6B6B", // 赤の発光色（強め）
          "yellow-glow": "#FFF06B", // 黄の発光色（強め）
          "purple-glow": "#B56BFF", // 紫の発光色（強め）
          "gray-glow": "#A0A0A0", // グレーの発光色（強め）
          "green-glow": "#6BFFB5", // 緑の発光色（強め）
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // 発光効果のキーフレーム
        glow: {
          "0%, 100%": {
            opacity: "1",
            filter: "brightness(1)",
          },
          "50%": {
            opacity: "0.8",
            filter: "brightness(1.2)",
          },
        },
        "glow-pulse": {
          "0%, 100%": {
            opacity: "1",
            boxShadow: "0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor",
          },
          "50%": {
            opacity: "0.7",
            boxShadow: "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor",
          },
        },
        "glow-intense": {
          "0%, 100%": {
            opacity: "1",
            boxShadow: "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor",
          },
          "50%": {
            opacity: "0.9",
            boxShadow: "0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor, 0 0 80px currentColor",
          },
        },
        "system-active": {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.95",
            transform: "scale(1.01)",
          },
        },
        "file-transfer": {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "0",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
        },
        "background-shift": {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
        },
        "data-flow": {
          "0%": {
            transform: "translateY(0) scale(1)",
            opacity: "0.8",
          },
          "50%": {
            transform: "translateY(-10px) scale(1.05)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(0) scale(1)",
            opacity: "0.8",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        glow: "glow 2s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "glow-intense": "glow-intense 1.5s ease-in-out infinite",
        "system-active": "system-active 3s ease-in-out infinite",
        "file-transfer": "file-transfer 2s linear infinite",
        "background-shift": "background-shift 20s ease-in-out infinite",
        "data-flow": "data-flow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
