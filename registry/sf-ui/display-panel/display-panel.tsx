import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { LCARSPanel, type LCARSPanelProps } from "@/registry/sf-ui/lcars-panel/lcars-panel";
import { cn } from "@/lib/utils";

/**
 * Display Panelのバリアント定義
 * 透過/半透明効果付きのLCARS風ディスプレイパネル
 */
const displayPanelVariants = cva("", {
  variants: {
    transparency: {
      none: "bg-lcars-dark/95",
      subtle: "bg-lcars-dark/80 backdrop-blur-sm",
      medium: "bg-lcars-dark/60 backdrop-blur-md",
      high: "bg-lcars-dark/40 backdrop-blur-lg",
      full: "bg-transparent backdrop-blur-sm",
    },
    border: {
      none: "border-0",
      subtle: "border border-lcars-blue/30",
      normal: "border-2 border-lcars-blue/50",
      intense: "border-2 border-lcars-blue shadow-[0_0_20px_rgba(74,158,255,0.4)]",
    },
  },
  defaultVariants: {
    transparency: "medium",
    border: "normal",
  },
});

/**
 * Display PanelコンポーネントのProps
 */
export interface DisplayPanelProps
  extends Omit<LCARSPanelProps, "variant">,
    VariantProps<typeof displayPanelVariants> {
  /**
   * パネルの透過度レベル
   */
  transparency?: "none" | "subtle" | "medium" | "high" | "full";
  /**
   * ボーダーの強調レベル
   */
  border?: "none" | "subtle" | "normal" | "intense";
  /**
   * モーショングラフィックス効果を有効にする
   */
  animated?: boolean;
}

/**
 * SF映画の透過画面をインスパイアしたディスプレイパネルコンポーネント
 *
 * 透過/半透明効果とLCARS風のデザインを組み合わせた情報表示パネルです。
 * モーショングラフィックス効果をサポートし、SF的な雰囲気を演出します。
 *
 * @example
 * ```tsx
 * <DisplayPanel transparency="medium" border="intense" title="Sensor Data">
 *   Reading: 42.7
 * </DisplayPanel>
 * ```
 */
const DisplayPanel = React.forwardRef<HTMLDivElement, DisplayPanelProps>(
  (
    { className, transparency, border, animated = false, title, description, children, ...props },
    ref
  ) => {
    return (
      <LCARSPanel
        ref={ref}
        variant="default"
        className={cn(
          displayPanelVariants({ transparency, border }),
          animated && "transition-all duration-500 hover:scale-[1.02]",
          className
        )}
        title={title}
        description={description}
        {...props}
      >
        {children}
      </LCARSPanel>
    );
  }
);
DisplayPanel.displayName = "DisplayPanel";

export { DisplayPanel, displayPanelVariants };
