"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Clock Displayのバリアント定義
 * LCARS風のデジタル時計表示コンポーネント
 */
const clockDisplayVariants = cva(
  "font-sans tracking-wider transition-all duration-300 tabular-nums",
  {
    variants: {
      variant: {
        default: "text-lcars-blue",
        orange: "text-lcars-orange",
        red: "text-lcars-red",
        yellow: "text-lcars-yellow",
      },
      size: {
        sm: "text-lg",
        default: "text-2xl",
        lg: "text-4xl",
        xl: "text-6xl",
      },
      glow: {
        none: "",
        subtle: "text-shadow-subtle",
        normal: "text-shadow-normal",
        intense: "text-shadow-intense animate-glow-pulse",
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
 * Clock DisplayコンポーネントのProps
 */
export interface ClockDisplayProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof clockDisplayVariants> {
  /**
   * 24時間形式で表示するか（true: 24時間、false: 12時間）
   */
  use24Hour?: boolean;
  /**
   * 秒を表示するか
   */
  showSeconds?: boolean;
  /**
   * 日付を表示するか
   */
  showDate?: boolean;
  /**
   * カスタム時刻（指定しない場合は現在時刻）
   */
  customTime?: Date;
  /**
   * ラベルテキスト
   */
  label?: string;
}

/**
 * SF映画のLCARSインタフェースをインスパイアしたデジタル時計表示コンポーネント
 *
 * 24時間/12時間表示、秒表示、日付表示をサポートします。
 * LCARS風のデジタル時計デザインと発光効果でSF的な雰囲気を演出します。
 *
 * @example
 * ```tsx
 * <ClockDisplay use24Hour showSeconds />
 * <ClockDisplay use24Hour={false} showDate label="Stardate" />
 * ```
 */
const ClockDisplay = React.forwardRef<HTMLDivElement, ClockDisplayProps>(
  (
    {
      className,
      variant,
      size,
      glow,
      use24Hour = true,
      showSeconds = false,
      showDate = false,
      customTime,
      label,
      ...props
    },
    ref
  ) => {
    const [currentTime, setCurrentTime] = React.useState<Date>(customTime || new Date());

    React.useEffect(() => {
      if (customTime) {
        setCurrentTime(customTime);
        return;
      }

      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);

      return () => clearInterval(timer);
    }, [customTime]);

    const formatTime = React.useCallback(
      (date: Date): string => {
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");

        if (!use24Hour) {
          const ampm = hours >= 12 ? "PM" : "AM";
          hours = hours % 12 || 12;
          const timeString = `${hours.toString().padStart(2, "0")}:${minutes}${showSeconds ? `:${seconds}` : ""} ${ampm}`;
          return timeString;
        }

        const timeString = `${hours.toString().padStart(2, "0")}:${minutes}${showSeconds ? `:${seconds}` : ""}`;
        return timeString;
      },
      [use24Hour, showSeconds]
    );

    const formatDate = React.useCallback((date: Date): string => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    }, []);

    return (
      <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props}>
        {label && (
          <span
            className={cn(
              clockDisplayVariants({ variant, size: "sm", glow: "subtle" }),
              "uppercase tracking-wider text-xs"
            )}
          >
            {label}
          </span>
        )}
        <div className="flex flex-col gap-1">
          <span className={cn(clockDisplayVariants({ variant, size, glow }), "font-bold")}>
            {formatTime(currentTime)}
          </span>
          {showDate && (
            <span
              className={cn(
                clockDisplayVariants({ variant, size: "sm", glow: "subtle" }),
                "opacity-80 text-xs"
              )}
            >
              {formatDate(currentTime)}
            </span>
          )}
        </div>
      </div>
    );
  }
);
ClockDisplay.displayName = "ClockDisplay";

export { ClockDisplay, clockDisplayVariants };
