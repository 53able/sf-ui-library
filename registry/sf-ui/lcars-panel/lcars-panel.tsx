import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * LCARS Panelのバリアント定義
 * スター・トレックのLCARSインタフェースをインスパイアしたパネルコンポーネント
 */
const lcarsPanelVariants = cva("rounded-lg font-lcars tracking-wide transition-all duration-300", {
  variants: {
    variant: {
      default:
        "bg-lcars-dark border-2 border-lcars-blue text-lcars-blue shadow-[0_0_10px_rgba(74,158,255,0.2),inset_0_0_10px_rgba(74,158,255,0.05)]",
      orange:
        "bg-lcars-dark border-2 border-lcars-orange text-lcars-orange shadow-[0_0_10px_rgba(255,158,74,0.2),inset_0_0_10px_rgba(255,158,74,0.05)]",
      red: "bg-lcars-dark border-2 border-lcars-red text-lcars-red shadow-[0_0_10px_rgba(255,74,74,0.2),inset_0_0_10px_rgba(255,74,74,0.05)]",
      yellow:
        "bg-lcars-dark border-2 border-lcars-yellow text-lcars-yellow shadow-[0_0_10px_rgba(255,224,74,0.2),inset_0_0_10px_rgba(255,224,74,0.05)]",
      purple:
        "bg-lcars-dark border-2 border-lcars-purple text-lcars-purple shadow-[0_0_10px_rgba(158,74,255,0.2),inset_0_0_10px_rgba(158,74,255,0.05)]",
      gray: "bg-lcars-dark border-2 border-lcars-gray text-lcars-gray shadow-[0_0_10px_rgba(128,128,128,0.2),inset_0_0_10px_rgba(128,128,128,0.05)]",
      green:
        "bg-lcars-dark border-2 border-lcars-green text-lcars-green shadow-[0_0_10px_rgba(74,255,158,0.2),inset_0_0_10px_rgba(74,255,158,0.05)]",
      filled:
        "bg-lcars-blue border-2 border-lcars-blue text-white shadow-[0_0_15px_rgba(74,158,255,0.4)]",
    },
    shape: {
      default: "rounded-lg",
      pill: "rounded-pill",
      lcars: "rounded-lcars",
    },
    size: {
      sm: "p-3 text-sm",
      default: "p-4 text-base",
      lg: "p-6 text-lg",
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
});

/**
 * LCARS PanelコンポーネントのProps
 */
export interface LCARSPanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof lcarsPanelVariants> {
  /**
   * パネルのタイトル（オプション）
   */
  title?: string;
  /**
   * パネルの説明文（オプション）
   */
  description?: string;
}

/**
 * SF映画のLCARSインタフェースをインスパイアしたパネルコンポーネント
 *
 * 角丸枠、黒背景、パステルカラーのボーダーを特徴とします。
 * 長体のサンセリフ書体と発光効果でSF的な雰囲気を演出します。
 *
 * @example
 * ```tsx
 * <LCARSPanel variant="default" title="System Status">
 *   All systems operational
 * </LCARSPanel>
 * ```
 */
const LCARSPanel = React.forwardRef<HTMLDivElement, LCARSPanelProps>(
  ({ className, variant, size, shape, glow, title, description, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(lcarsPanelVariants({ variant, size, shape, glow, className }))}
        {...props}
      >
        {title && <h3 className="mb-2 text-hierarchy-primary">{title}</h3>}
        {description && <p className="mb-3 text-hierarchy-tertiary">{description}</p>}
        {children}
      </div>
    );
  }
);
LCARSPanel.displayName = "LCARSPanel";

export { LCARSPanel, lcarsPanelVariants };
