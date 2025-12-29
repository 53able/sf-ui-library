import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Status Indicatorのバリアント定義
 * 発光するステータスインジケーターコンポーネント
 */
const statusIndicatorVariants = cva(
  "inline-block transition-all duration-300",
  {
    variants: {
      status: {
        normal:
          "bg-lcars-blue text-lcars-blue shadow-[0_0_10px_rgba(74,158,255,0.6),0_0_20px_rgba(74,158,255,0.4)]",
        warning:
          "bg-lcars-yellow text-lcars-yellow shadow-[0_0_10px_rgba(255,224,74,0.6),0_0_20px_rgba(255,224,74,0.4)]",
        danger:
          "bg-lcars-red text-lcars-red shadow-[0_0_10px_rgba(255,74,74,0.6),0_0_20px_rgba(255,74,74,0.4)]",
        success:
          "bg-lcars-green text-lcars-green shadow-[0_0_10px_rgba(74,255,158,0.6),0_0_20px_rgba(74,255,158,0.4)]",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-md",
        rounded: "rounded-lg",
      },
      size: {
        sm: "h-2 w-2",
        default: "h-3 w-3",
        lg: "h-4 w-4",
        xl: "h-6 w-6",
      },
      pulse: {
        none: "",
        subtle: "animate-glow",
        normal: "animate-glow-pulse",
        intense: "animate-glow-intense",
      },
    },
    defaultVariants: {
      status: "normal",
      shape: "circle",
      size: "default",
      pulse: "normal",
    },
  }
);

/**
 * Status IndicatorコンポーネントのProps
 */
export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusIndicatorVariants> {
  /**
   * ラベルテキスト（オプション）
   */
  label?: string;
  /**
   * ラベルの位置
   */
  labelPosition?: "left" | "right" | "top" | "bottom";
}

/**
 * SF映画のインタフェースデザインをインスパイアした発光ステータスインジケーター
 *
 * 正常（青）、警告（黄）、危険（赤）のステータスを発光効果で表現します。
 * 円形・角形の形状とパルスアニメーションをサポートします。
 *
 * @example
 * ```tsx
 * <StatusIndicator status="normal" size="lg" pulse="normal" />
 * <StatusIndicator status="danger" shape="square" label="Critical" />
 * ```
 */
const StatusIndicator = React.forwardRef<HTMLSpanElement, StatusIndicatorProps>(
  (
    {
      className,
      status,
      shape,
      size,
      pulse,
      label,
      labelPosition = "right",
      ...props
    },
    ref
  ) => {
    const indicator = (
      <span
        ref={ref}
        className={cn(statusIndicatorVariants({ status, shape, size, pulse, className }))}
        aria-label={label || `${status} status`}
        {...props}
      />
    );

    if (!label) {
      return indicator;
    }

    const labelClasses = cn(
      "ml-2 text-sm font-lcars tracking-wide",
      labelPosition === "left" && "ml-0 mr-2 order-first",
      labelPosition === "top" && "mb-1 block text-center",
      labelPosition === "bottom" && "mt-1 block text-center",
      labelPosition === "right" && "ml-2"
    );

    const containerClasses = cn(
      "inline-flex items-center",
      (labelPosition === "top" || labelPosition === "bottom") && "flex-col"
    );

    return (
      <span className={containerClasses}>
        {indicator}
        <span className={labelClasses}>{label}</span>
      </span>
    );
  }
);
StatusIndicator.displayName = "StatusIndicator";

export { StatusIndicator, statusIndicatorVariants };

