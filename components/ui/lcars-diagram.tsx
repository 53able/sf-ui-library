"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { LCARSPanel } from "./lcars-panel";

/**
 * LCARS Diagramのバリアント定義
 * LCARS風の図表/グラフ表示コンポーネント
 */
const lcarsDiagramVariants = cva("", {
  variants: {
    variant: {
      default: "border-lcars-blue",
      orange: "border-lcars-orange",
      red: "border-lcars-red",
      yellow: "border-lcars-yellow",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/**
 * LCARS DiagramコンポーネントのProps
 */
export interface LCARSDiagramProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof lcarsDiagramVariants> {
  /**
   * グラフのタイトル
   */
  title?: string;
  /**
   * データポイントの配列（0-100の値）
   */
  data?: number[];
  /**
   * データラベルの配列
   */
  labels?: string[];
  /**
   * カスタムコンテンツ（data/labelsの代わりに使用）
   */
  children?: React.ReactNode;
  /**
   * グラフのタイプ
   */
  type?: "bar" | "line" | "area";
}

/**
 * SF映画のLCARSインタフェースをインスパイアした図表/グラフ表示コンポーネント
 *
 * LCARS風のデータ可視化とシンプルなチャート表示を特徴とします。
 * 発光効果付きでSF的な雰囲気を演出します。
 *
 * @example
 * ```tsx
 * <LCARSDiagram
 *   title="Power Levels"
 *   data={[75, 90, 60, 85]}
 *   labels={["Core", "Shields", "Weapons", "Sensors"]}
 *   type="bar"
 * />
 * ```
 */
const LCARSDiagram = React.forwardRef<HTMLDivElement, LCARSDiagramProps>(
  (
    { className, variant, title, data, labels, children, type = "bar", ...props },
    ref
  ) => {
    const renderChart = React.useCallback(() => {
      if (children) {
        return children;
      }

      if (!data || data.length === 0) {
        return null;
      }

      const maxValue = Math.max(...data, 100);

      return (
        <div className="space-y-2">
          {data.map((value, index) => {
            const percentage = (value / maxValue) * 100;
            const label = labels?.[index] || `Item ${index + 1}`;

            if (type === "bar") {
              return (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-lcars-blue uppercase tracking-wider">
                      {label}
                    </span>
                    <span className="text-lcars-blue font-bold tabular-nums">
                      {value}%
                    </span>
                  </div>
                  <div className="relative h-4 bg-lcars-dark rounded border border-lcars-blue/30 overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded transition-all duration-500",
                        variant === "default" && "bg-lcars-blue",
                        variant === "orange" && "bg-lcars-orange",
                        variant === "red" && "bg-lcars-red",
                        variant === "yellow" && "bg-lcars-yellow",
                        "shadow-[0_0_10px_currentColor]"
                      )}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            }

            if (type === "line" || type === "area") {
              // シンプルな線グラフ/エリアグラフの実装
              const points = data.map((val, i) => {
                const x = (i / (data.length - 1)) * 100;
                const y = 100 - (val / maxValue) * 100;
                return `${x},${y}`;
              });

              return (
                <div className="relative h-32">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                  >
                    {type === "area" && (
                      <polygon
                        points={`0,100 ${points.join(" ")} 100,100`}
                        fill={`url(#gradient-${variant})`}
                        className="opacity-30"
                      />
                    )}
                    <polyline
                      points={points.join(" ")}
                      fill="none"
                      stroke={
                        variant === "default"
                          ? "#4A9EFF"
                          : variant === "orange"
                            ? "#FF9E4A"
                            : variant === "red"
                              ? "#FF4A4A"
                              : "#FFE04A"
                      }
                      strokeWidth="2"
                      className="drop-shadow-[0_0_5px_currentColor]"
                    />
                    <defs>
                      <linearGradient
                        id={`gradient-${variant}`}
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor={
                            variant === "default"
                              ? "#4A9EFF"
                              : variant === "orange"
                                ? "#FF9E4A"
                                : variant === "red"
                                  ? "#FF4A4A"
                                  : "#FFE04A"
                          }
                          stopOpacity="0.5"
                        />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              );
            }

            return null;
          })}
        </div>
      );
    }, [data, labels, children, type, variant]);

    return (
      <LCARSPanel
        ref={ref}
        variant={variant}
        className={cn(lcarsDiagramVariants({ variant }), className)}
        title={title}
        {...props}
      >
        {renderChart()}
      </LCARSPanel>
    );
  }
);
LCARSDiagram.displayName = "LCARSDiagram";

export { LCARSDiagram, lcarsDiagramVariants };

