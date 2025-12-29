import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * LCARS Gridのバリアント定義
 * モジュール式グリッドレイアウトコンポーネント
 */
const lcarsGridVariants = cva("font-lcars", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
      6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
    },
    gap: {
      none: "gap-0",
      sm: "gap-2",
      default: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
    layout: {
      default: "",
      lcars: "rounded-lcars",
      pill: "rounded-pill",
    },
  },
  defaultVariants: {
    columns: 3,
    gap: "default",
    layout: "default",
  },
});

/**
 * LCARS GridコンポーネントのProps
 */
export interface LCARSGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof lcarsGridVariants> {
  /**
   * グリッド内の子要素
   */
  children: React.ReactNode;
}

/**
 * SF映画のLCARSインタフェースをインスパイアしたモジュール式グリッドレイアウトコンポーネント
 *
 * 複数のLCARSパネルを配置し、レスポンシブ対応のグリッドレイアウトを提供します。
 * 流れるような接続デザインでSF的な雰囲気を演出します。
 *
 * @example
 * ```tsx
 * <LCARSGrid columns={3} gap="lg">
 *   <LCARSPanel>Panel 1</LCARSPanel>
 *   <LCARSPanel>Panel 2</LCARSPanel>
 *   <LCARSPanel>Panel 3</LCARSPanel>
 * </LCARSGrid>
 * ```
 */
const LCARSGrid = React.forwardRef<HTMLDivElement, LCARSGridProps>(
  ({ className, columns, gap, layout, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("grid", lcarsGridVariants({ columns, gap, layout }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
LCARSGrid.displayName = "LCARSGrid";

export { LCARSGrid, lcarsGridVariants };
