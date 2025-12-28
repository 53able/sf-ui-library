import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { LCARSPanel, type LCARSPanelProps } from "./lcars-panel";

/**
 * Connected Panelsのバリアント定義
 * 流れるように接続されたパネルデザイン
 */
const connectedPanelsVariants = cva("relative font-lcars", {
  variants: {
    direction: {
      horizontal: "flex flex-row items-center",
      vertical: "flex flex-col items-center",
    },
    connection: {
      none: "",
      curve: "before:content-[''] before:absolute before:border-2 before:border-lcars-blue before:rounded-full",
      line: "before:content-[''] before:absolute before:border before:border-lcars-blue",
    },
  },
  defaultVariants: {
    direction: "horizontal",
    connection: "curve",
  },
});

/**
 * Connected PanelsコンポーネントのProps
 */
export interface ConnectedPanelsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof connectedPanelsVariants> {
  /**
   * 接続されるパネルの配列
   */
  panels: Array<{
    /**
     * パネルのコンテンツ
     */
    content: React.ReactNode;
    /**
     * パネルのプロパティ
     */
    panelProps?: Omit<LCARSPanelProps, "children">;
  }>;
  /**
   * パネル間の接続線のスタイル
   */
  connectorStyle?: "solid" | "dashed" | "glow";
}

/**
 * SF映画のLCARSインタフェースをインスパイアした接続されたパネルコンポーネント
 *
 * 要素が自然に接続される視覚効果とカーブした接続線を特徴とします。
 * モジュール式レイアウトでSF的な雰囲気を演出します。
 *
 * @example
 * ```tsx
 * <ConnectedPanels
 *   direction="horizontal"
 *   panels={[
 *     { content: "Panel 1", panelProps: { variant: "default" } },
 *     { content: "Panel 2", panelProps: { variant: "orange" } },
 *   ]}
 * />
 * ```
 */
const ConnectedPanels = React.forwardRef<HTMLDivElement, ConnectedPanelsProps>(
  ({ className, direction, connection, panels, connectorStyle = "glow", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(connectedPanelsVariants({ direction, connection }), className)}
        {...props}
      >
        {panels.map((panel, index) => (
          <React.Fragment key={index}>
            <LCARSPanel {...panel.panelProps}>{panel.content}</LCARSPanel>
            {index < panels.length - 1 && (
              <div
                className={cn(
                  "relative",
                  direction === "horizontal" ? "w-8 h-0.5" : "h-8 w-0.5",
                  connectorStyle === "glow" &&
                    "bg-lcars-blue shadow-[0_0_10px_rgba(74,158,255,0.5)]",
                  connectorStyle === "dashed" && "border-dashed border-lcars-blue",
                  connectorStyle === "solid" && "bg-lcars-blue"
                )}
              >
                {connection === "curve" && (
                  <svg
                    className={cn(
                      "absolute",
                      direction === "horizontal"
                        ? "w-8 h-8 -top-4 left-0"
                        : "w-8 h-8 -left-4 top-0"
                    )}
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d={
                        direction === "horizontal"
                          ? "M 0 16 Q 16 0 32 16"
                          : "M 16 0 Q 0 16 16 32"
                      }
                      stroke="rgb(74, 158, 255)"
                      strokeWidth="2"
                      fill="none"
                      className={cn(
                        connectorStyle === "glow" &&
                          "drop-shadow-[0_0_10px_rgba(74,158,255,0.5)]"
                      )}
                    />
                  </svg>
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
);
ConnectedPanels.displayName = "ConnectedPanels";

export { ConnectedPanels, connectedPanelsVariants };

