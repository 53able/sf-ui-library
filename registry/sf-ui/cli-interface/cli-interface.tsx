import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * CLI Interfaceのバリアント定義
 * 大文字・等幅フォントを使用したCLI風インターフェース
 */
const cliInterfaceVariants = cva(
  "font-cli-uppercase bg-lcars-dark border-2 border-lcars-green text-lcars-green p-4 rounded-lg",
  {
    variants: {
      variant: {
        default: "border-lcars-green text-lcars-green",
        hacker: "border-lcars-green text-lcars-green shadow-[0_0_10px_rgba(74,255,158,0.3)]",
        retro: "border-lcars-gray text-lcars-gray",
        warning: "border-lcars-yellow text-lcars-yellow",
        error: "border-lcars-red text-lcars-red",
      },
      size: {
        sm: "text-xs p-2",
        default: "text-sm p-4",
        lg: "text-base p-6",
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
      glow: "normal",
    },
  }
);

/**
 * CLI InterfaceコンポーネントのProps
 */
export interface CLIInterfaceProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content">,
    VariantProps<typeof cliInterfaceVariants> {
  /**
   * コマンドラインのプロンプト記号
   */
  prompt?: string;
  /**
   * 表示するコマンドまたは出力
   */
  content: string | string[];
  /**
   * カーソルを表示するか
   */
  showCursor?: boolean;
  /**
   * カーソルの点滅アニメーション
   */
  cursorBlink?: boolean;
}

/**
 * SF映画のインタフェースデザインをインスパイアしたCLIインターフェースコンポーネント
 *
 * 大文字・等幅フォントを使用したレトロなCLI風UIを提供します。
 * 『エイリアン』のマザーコンピューターや『ウォー・ゲーム』の軍事システムのように、
 * 古いシステムや専門家がシステムの深層部にアクセスしている場面を演出します。
 *
 * 原則：
 * - 大文字・等幅フォント（CLI）：レトロと専門性の演出
 * - あえて洗練されていないタイポグラフィを用いることで、事態の深刻さや高度な専門性を表現
 *
 * @example
 * ```tsx
 * <CLIInterface
 *   variant="hacker"
 *   prompt="$"
 *   content="SYSTEM ACCESS GRANTED"
 *   showCursor
 * />
 * ```
 */
const CLIInterface = React.forwardRef<HTMLDivElement, CLIInterfaceProps>(
  (
    {
      className,
      variant,
      size,
      glow,
      prompt = ">",
      content,
      showCursor = false,
      cursorBlink = true,
      ...props
    },
    ref
  ) => {
    const lines = Array.isArray(content) ? content : [content];

    return (
      <div
        ref={ref}
        className={cn(cliInterfaceVariants({ variant, size, glow, className }))}
        {...props}
      >
        <div className="space-y-1">
          {lines.map((line, index) => (
            <div key={`line-${index}-${line.slice(0, 10)}`} className="flex items-start gap-2">
              {prompt && <span className="text-lcars-green-glow shrink-0">{prompt}</span>}
              <span className="flex-1 whitespace-pre-wrap wrap-break-word">{line}</span>
            </div>
          ))}
          {showCursor && (
            <div className="flex items-start gap-2">
              {prompt && <span className="text-lcars-green-glow shrink-0">{prompt}</span>}
              <span
                className={cn(
                  "inline-block w-2 h-4 bg-lcars-green",
                  cursorBlink && "animate-pulse"
                )}
                role="presentation"
              />
            </div>
          )}
        </div>
      </div>
    );
  }
);
CLIInterface.displayName = "CLIInterface";

export { CLIInterface, cliInterfaceVariants };
