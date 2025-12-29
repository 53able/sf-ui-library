import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Feedback Controlのバリアント定義
 * 入力と出力の近接配置によるフィードバックループの強化
 */
const feedbackControlVariants = cva("flex gap-4", {
  variants: {
    direction: {
      horizontal: "flex-row items-center",
      vertical: "flex-col items-stretch",
    },
    alignment: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
    },
  },
  defaultVariants: {
    direction: "horizontal",
    alignment: "start",
  },
});

/**
 * Feedback ControlコンポーネントのProps
 */
export interface FeedbackControlProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof feedbackControlVariants> {
  /**
   * 入力コントロール（ノブ、スライダーなど）
   */
  input: React.ReactNode;
  /**
   * 出力表示（スクリーン、数値表示など）
   */
  output: React.ReactNode;
  /**
   * ラベルテキスト
   */
  label?: string;
  /**
   * 説明文
   */
  description?: string;
}

/**
 * SF映画のインタフェースデザインをインスパイアしたフィードバックループコンポーネント
 *
 * 入力と出力を近接配置することで、操作と結果をリアルタイムで確認可能にします。
 * 『地球最後の日』のように、軌道を示すスクリーン（出力）のすぐ隣に操作ノブ（入力）を配置し、
 * 認知負荷を軽減し、より直感的でミスの少ないインタラクションを実現します。
 *
 * 原則：フィードバックループの強化
 * - 入力と出力の近接配置
 * - 視線を大きく動かすことなく操作と結果を確認
 * - リアルタイムでの微調整が可能
 *
 * @example
 * ```tsx
 * <FeedbackControl
 *   direction="horizontal"
 *   input={<input type="range" />}
 *   output={<DataDisplay value={50} label="Power" unit="%" />}
 *   label="Warp Core"
 * />
 * ```
 */
const FeedbackControl = React.forwardRef<HTMLDivElement, FeedbackControlProps>(
  ({ className, direction, alignment, input, output, label, description, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(feedbackControlVariants({ direction, alignment }), "font-lcars", className)}
        {...props}
      >
        {/* ラベルと説明 */}
        {(label || description) && (
          <div className="flex flex-col gap-1 mb-2">
            {label && <label className="text-hierarchy-secondary text-lcars-blue">{label}</label>}
            {description && (
              <p className="text-hierarchy-tertiary text-lcars-blue/70">{description}</p>
            )}
          </div>
        )}

        {/* 入力コントロール */}
        <div className={cn("flex-shrink-0", direction === "horizontal" ? "w-auto" : "w-full")}>
          {input}
        </div>

        {/* 出力表示 */}
        <div className={cn("flex-1", direction === "horizontal" ? "ml-4" : "mt-4")}>{output}</div>
      </div>
    );
  }
);
FeedbackControl.displayName = "FeedbackControl";

export { FeedbackControl, feedbackControlVariants };
