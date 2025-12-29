import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Glow Buttonのバリアント定義
 * LCARS風の発光効果を持つボタンコンポーネント
 */
const glowButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-lcars font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-lcars-blue text-white shadow-[0_0_10px_rgba(74,158,255,0.5),0_0_20px_rgba(74,158,255,0.3)] hover:shadow-[0_0_15px_rgba(74,158,255,0.7),0_0_30px_rgba(74,158,255,0.5)] hover:brightness-110",
        destructive:
          "bg-lcars-red text-white shadow-[0_0_10px_rgba(255,74,74,0.5),0_0_20px_rgba(255,74,74,0.3)] hover:shadow-[0_0_15px_rgba(255,74,74,0.7),0_0_30px_rgba(255,74,74,0.5)] hover:brightness-110",
        warning:
          "bg-lcars-yellow text-lcars-dark shadow-[0_0_10px_rgba(255,224,74,0.5),0_0_20px_rgba(255,224,74,0.3)] hover:shadow-[0_0_15px_rgba(255,224,74,0.7),0_0_30px_rgba(255,224,74,0.5)] hover:brightness-110",
        purple:
          "bg-lcars-purple text-white shadow-[0_0_10px_rgba(158,74,255,0.5),0_0_20px_rgba(158,74,255,0.3)] hover:shadow-[0_0_15px_rgba(158,74,255,0.7),0_0_30px_rgba(158,74,255,0.5)] hover:brightness-110",
        green:
          "bg-lcars-green text-lcars-dark shadow-[0_0_10px_rgba(74,255,158,0.5),0_0_20px_rgba(74,255,158,0.3)] hover:shadow-[0_0_15px_rgba(74,255,158,0.7),0_0_30px_rgba(74,255,158,0.5)] hover:brightness-110",
        outline:
          "border-2 border-lcars-blue bg-transparent text-lcars-blue shadow-[0_0_10px_rgba(74,158,255,0.3),inset_0_0_10px_rgba(74,158,255,0.1)] hover:bg-lcars-blue/10 hover:shadow-[0_0_15px_rgba(74,158,255,0.5),inset_0_0_15px_rgba(74,158,255,0.2)]",
        ghost:
          "bg-transparent text-lcars-blue hover:bg-lcars-blue/10 hover:shadow-[0_0_10px_rgba(74,158,255,0.3)]",
        link: "text-lcars-blue underline-offset-4 hover:underline hover:shadow-[0_0_5px_rgba(74,158,255,0.5)]",
      },
      shape: {
        default: "rounded-lg",
        pill: "rounded-pill",
        lcars: "rounded-lcars",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
      glow: {
        none: "",
        subtle: "shadow-[0_0_5px_currentColor]",
        normal: "shadow-[0_0_10px_currentColor,0_0_20px_currentColor]",
        intense: "animate-glow-pulse shadow-[0_0_15px_currentColor,0_0_30px_currentColor]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
      glow: "normal",
    },
  }
);

/**
 * Glow ButtonコンポーネントのProps
 */
export interface GlowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glowButtonVariants> {
  /**
   * Radix UIのSlotコンポーネントとして使用する場合にtrue
   */
  asChild?: boolean;
}

/**
 * SF映画のインタフェースデザインをインスパイアした発光効果付きボタンコンポーネント
 *
 * LCARSスタイルの発光効果と角丸デザインを特徴とします。
 * 青/赤/黄色の発光効果をサポートし、ホバー時に発光が強化されます。
 *
 * @example
 * ```tsx
 * <GlowButton variant="default" size="lg">
 *   Engage
 * </GlowButton>
 * ```
 */
const GlowButton = React.forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, variant, size, shape, glow, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(glowButtonVariants({ variant, size, shape, glow, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
GlowButton.displayName = "GlowButton";

export { GlowButton, glowButtonVariants };

