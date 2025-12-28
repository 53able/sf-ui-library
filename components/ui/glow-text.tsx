import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Glow Textのバリアント定義
 * 発光効果付きテキストコンポーネント
 */
const glowTextVariants = cva(
  "font-lcars tracking-wide transition-all duration-300",
  {
    variants: {
      color: {
        blue: "text-lcars-blue",
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
      intensity: {
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
      color: "blue",
      intensity: "normal",
      size: "base",
      weight: "normal",
      animate: "none",
    },
  }
);

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
 * カラーと強度をカスタマイズ可能な発光効果を持つテキストです。
 * 青/赤/黄色の発光色とパルスアニメーションをサポートします。
 *
 * @example
 * ```tsx
 * <GlowText color="blue" intensity="intense" size="2xl" animate="pulse">
 *   SYSTEM ONLINE
 * </GlowText>
 * ```
 */
const GlowText = React.forwardRef<HTMLElement, GlowTextProps>(
  (
    {
      className,
      color,
      intensity,
      size,
      weight,
      animate,
      as: Component = "span",
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref as React.Ref<HTMLElement>}
        className={cn(glowTextVariants({ color, intensity, size, weight, animate, className }))}
        {...props}
      />
    );
  }
);
GlowText.displayName = "GlowText";

export { GlowText, glowTextVariants };

