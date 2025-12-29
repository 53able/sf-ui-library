import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Transparent Layerのバリアント定義
 * 半透明スクリーンによる情報の階層構造の視覚化
 */
const transparentLayerVariants = cva(
  "relative backdrop-blur-sm transition-all duration-300",
  {
    variants: {
      variant: {
        default:
          "bg-lcars-blue/20 border border-lcars-blue/30 shadow-[0_0_20px_rgba(74,158,255,0.2)]",
        orange:
          "bg-lcars-orange/20 border border-lcars-orange/30 shadow-[0_0_20px_rgba(255,158,74,0.2)]",
        red: "bg-lcars-red/20 border border-lcars-red/30 shadow-[0_0_20px_rgba(255,74,74,0.2)]",
        yellow:
          "bg-lcars-yellow/20 border border-lcars-yellow/30 shadow-[0_0_20px_rgba(255,224,74,0.2)]",
        purple:
          "bg-lcars-purple/20 border border-lcars-purple/30 shadow-[0_0_20px_rgba(158,74,255,0.2)]",
        green:
          "bg-lcars-green/20 border border-lcars-green/30 shadow-[0_0_20px_rgba(74,255,158,0.2)]",
      },
      opacity: {
        subtle: "bg-opacity-10 backdrop-blur-none",
        normal: "bg-opacity-20 backdrop-blur-sm",
        strong: "bg-opacity-30 backdrop-blur-md",
      },
      size: {
        sm: "p-3 rounded-md",
        default: "p-4 rounded-lg",
        lg: "p-6 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      opacity: "normal",
      size: "default",
    },
  }
);

/**
 * Transparent LayerコンポーネントのProps
 */
export interface TransparentLayerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof transparentLayerVariants> {
  /**
   * 背景に表示するコンテンツ（手前の重要な情報の下に表示される文脈情報）
   */
  backgroundContent?: React.ReactNode;
  /**
   * 手前に表示する重要な情報
   */
  foregroundContent?: React.ReactNode;
}

/**
 * SF映画のインタフェースデザインをインスパイアした透過レイヤーコンポーネント
 *
 * 半透明スクリーンを用いて、手前の重要な情報と背景の文脈情報を同時に提示します。
 * 『マイノリティ・リポート』や『イーグル・アイ』のような情報の階層構造を視覚化します。
 *
 * @example
 * ```tsx
 * <TransparentLayer
 *   variant="blue"
 *   backgroundContent={<div>背景情報</div>}
 *   foregroundContent={<div>重要な情報</div>}
 * />
 * ```
 */
const TransparentLayer = React.forwardRef<HTMLDivElement, TransparentLayerProps>(
  (
    {
      className,
      variant,
      opacity,
      size,
      backgroundContent,
      foregroundContent,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        {/* 背景の文脈情報 */}
        {backgroundContent && (
          <div className="absolute inset-0 z-0 opacity-50">{backgroundContent}</div>
        )}
        {/* 手前の重要な情報 */}
        <div
          className={cn(
            transparentLayerVariants({ variant, opacity, size }),
            "relative z-10"
          )}
        >
          {foregroundContent || children}
        </div>
      </div>
    );
  }
);
TransparentLayer.displayName = "TransparentLayer";

export { TransparentLayer, transparentLayerVariants };

