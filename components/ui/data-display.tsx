import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Data Displayのバリアント定義
 * LCARS風の数値表示コンポーネント
 */
const dataDisplayVariants = cva(
  "font-lcars tracking-wide transition-all duration-300",
  {
    variants: {
      variant: {
        default: "text-lcars-blue",
        orange: "text-lcars-orange",
        red: "text-lcars-red",
        yellow: "text-lcars-yellow",
        purple: "text-lcars-purple",
        gray: "text-lcars-gray",
        green: "text-lcars-green",
      },
      size: {
        sm: "text-sm",
        default: "text-base",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
        "3xl": "text-3xl",
        "4xl": "text-4xl",
      },
      glow: {
        none: "",
        subtle: "text-shadow-subtle",
        normal: "text-shadow-normal",
        intense: "text-shadow-intense",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      glow: "normal",
    },
  }
);

/**
 * Data DisplayコンポーネントのProps
 */
export interface DataDisplayProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataDisplayVariants> {
  /**
   * 表示する値
   */
  value: number | string;
  /**
   * ラベルテキスト
   */
  label?: string;
  /**
   * 単位テキスト
   */
  unit?: string;
  /**
   * 数値のフォーマット関数
   */
  formatValue?: (value: number | string) => string;
}

/**
 * SF映画のLCARSインタフェースをインスパイアした数値表示コンポーネント
 *
 * 大きな数字、発光ラベル、単位表示を特徴とします。
 * LCARS風の数値フォーマットと発光効果でSF的な雰囲気を演出します。
 *
 * @example
 * ```tsx
 * <DataDisplay value={1009} label="Warp Core" unit="%" />
 * <DataDisplay value={7490} label="Power" unit="MW" size="2xl" glow="intense" />
 * ```
 */
const DataDisplay = React.forwardRef<HTMLDivElement, DataDisplayProps>(
  (
    { className, variant, size, glow, value, label, unit, formatValue, ...props },
    ref
  ) => {
    const formattedValue = React.useMemo(() => {
      if (formatValue) {
        return formatValue(value);
      }
      if (typeof value === "number") {
        return value.toLocaleString();
      }
      return value;
    }, [value, formatValue]);

    const valueSize: "sm" | "default" | "lg" | "xl" | "2xl" | "3xl" | "4xl" =
      size === "sm"
        ? "lg"
        : size === "default"
          ? "xl"
          : size === "lg"
            ? "2xl"
            : size === "xl"
              ? "3xl"
              : size === "2xl"
                ? "4xl"
                : "4xl";

    return (
      <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props}>
        {label && (
          <span
            className={cn(
              dataDisplayVariants({ variant, size: "sm", glow: "subtle" }),
              "text-hierarchy-secondary"
            )}
          >
            {label}
          </span>
        )}
        <div className="flex items-baseline gap-2">
          <span
            className={cn(
              dataDisplayVariants({ variant, size: valueSize, glow }),
              "font-bold tabular-nums"
            )}
          >
            {formattedValue}
          </span>
          {unit && (
            <span
              className={cn(
                dataDisplayVariants({ variant, size: "sm", glow: "subtle" }),
                "opacity-80"
              )}
            >
              {unit}
            </span>
          )}
        </div>
      </div>
    );
  }
);
DataDisplay.displayName = "DataDisplay";

export { DataDisplay, dataDisplayVariants };

