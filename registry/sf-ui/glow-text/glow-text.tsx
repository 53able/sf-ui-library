import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Glow Textのバリアント定義
 * 発光効果付きテキストコンポーネント
 *
 * 他のコンポーネントとのAPI一貫性のため、以下のプロパティ名を使用:
 * - variant: カラーバリアント（LCARSPanel, GlowButton, DataDisplay と同じ）
 * - glow: 発光強度（LCARSPanel, GlowButton, DataDisplay と同じ）
 */
const glowTextVariants = cva("font-lcars tracking-wide transition-all duration-300", {
  variants: {
    variant: {
      default: "text-lcars-blue",
      orange: "text-lcars-orange",
      red: "text-lcars-red",
      yellow: "text-lcars-yellow",
      purple: "text-lcars-purple",
      gray: "text-lcars-gray",
      green: "text-lcars-green",
      "blue-glow": "text-lcars-blue-glow",
      "red-glow": "text-lcars-red-glow",
      "yellow-glow": "text-lcars-yellow-glow",
      "purple-glow": "text-lcars-purple-glow",
      "gray-glow": "text-lcars-gray-glow",
      "green-glow": "text-lcars-green-glow",
    },
    glow: {
      none: "",
      subtle: "text-shadow-subtle",
      normal: "text-shadow-normal",
      intense: "text-shadow-intense",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    animate: {
      none: "",
      pulse: "animate-glow-pulse",
      glow: "animate-glow",
    },
  },
  defaultVariants: {
    variant: "default",
    glow: "normal",
    size: "base",
    weight: "normal",
    animate: "none",
  },
});

/**
 * Glow TextコンポーネントのProps
 */
export interface GlowTextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof glowTextVariants> {
  /**
   * レンダリングするHTML要素
   */
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
}

/**
 * SF映画のインタフェースデザインをインスパイアした発光テキストコンポーネント
 *
 * カラーと発光強度をカスタマイズ可能な発光効果を持つテキストです。
 * 青/赤/黄色の発光色とパルスアニメーションをサポートします。
 *
 * @example
 * ```tsx
 * <GlowText variant="default" glow="intense" size="2xl" animate="pulse">
 *   SYSTEM ONLINE
 * </GlowText>
 * ```
 */
const GlowText = React.forwardRef<HTMLElement, GlowTextProps>(
  (
    { className, variant, glow, size, weight, animate, as: Component = "span", ...props },
    ref
  ) => {
    // 動的な要素を使う場合、refの型を完全に型安全にするのは難しいため、
    // unknown経由で型アサーションを行う
    return (
      <Component
        // @ts-expect-error - 動的な要素のref型推論はTypeScriptでは完全に型安全にできない
        ref={ref}
        className={cn(glowTextVariants({ variant, glow, size, weight, animate, className }))}
        {...props}
      />
    );
  }
);
GlowText.displayName = "GlowText";

export { GlowText, glowTextVariants };
