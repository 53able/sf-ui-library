import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Warning Screenのバリアント定義
 * LCARS風の警告/ステータス画面コンポーネント
 */
const warningScreenVariants = cva(
  "flex flex-col items-center justify-center gap-4 rounded-lg font-sans tracking-wide transition-all duration-300",
  {
    variants: {
      variant: {
        warning:
          "bg-lcars-dark border-2 border-lcars-yellow text-lcars-yellow shadow-[0_0_20px_rgba(255,224,74,0.4),inset_0_0_20px_rgba(255,224,74,0.1)]",
        danger:
          "bg-lcars-dark border-2 border-lcars-red text-lcars-red shadow-[0_0_20px_rgba(255,74,74,0.4),inset_0_0_20px_rgba(255,74,74,0.1)]",
        restricted:
          "bg-lcars-dark border-2 border-lcars-red text-lcars-red shadow-[0_0_30px_rgba(255,74,74,0.6),inset_0_0_30px_rgba(255,74,74,0.2)]",
        standby:
          "bg-lcars-dark border-2 border-lcars-yellow text-lcars-yellow shadow-[0_0_20px_rgba(255,224,74,0.4),inset_0_0_20px_rgba(255,224,74,0.1)]",
      },
      size: {
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
      animate: {
        none: "",
        pulse: "animate-glow-pulse",
        intense: "animate-glow-intense",
      },
    },
    defaultVariants: {
      variant: "warning",
      size: "default",
      animate: "pulse",
    },
  }
);

/**
 * Warning ScreenコンポーネントのProps
 */
export interface WarningScreenProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof warningScreenVariants> {
  /**
   * メインテキスト（例: "ACCESS RESTRICTED", "STANDBY"）
   */
  title: string;
  /**
   * サブテキスト（オプション）
   */
  message?: string;
  /**
   * アイコンまたは追加要素
   */
  icon?: React.ReactNode;
}

/**
 * SF映画のLCARSインタフェースをインスパイアした警告/ステータス画面コンポーネント
 *
 * "ACCESS RESTRICTED"、"STANDBY"などの警告表示を特徴とします。
 * 赤色の強調表示とアニメーション効果でSF的な雰囲気を演出します。
 *
 * @example
 * ```tsx
 * <WarningScreen variant="restricted" title="ACCESS RESTRICTED" message="Unauthorized access detected" />
 * <WarningScreen variant="standby" title="STANDBY" animate="pulse" />
 * ```
 */
const WarningScreen = React.forwardRef<HTMLDivElement, WarningScreenProps>(
  ({ className, variant, size, animate, title, message, icon, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(warningScreenVariants({ variant, size, animate, className }))}
        {...props}
      >
        {icon && <div className="mb-2">{icon}</div>}
        <h2
          className={cn(
            "text-3xl font-bold uppercase tracking-wider",
            variant === "restricted" && "text-4xl",
            "text-shadow-intense"
          )}
        >
          {title}
        </h2>
        {message && (
          <p
            className={cn(
              "text-sm opacity-90 text-center max-w-md",
              "text-shadow-subtle"
            )}
          >
            {message}
          </p>
        )}
      </div>
    );
  }
);
WarningScreen.displayName = "WarningScreen";

export { WarningScreen, warningScreenVariants };

