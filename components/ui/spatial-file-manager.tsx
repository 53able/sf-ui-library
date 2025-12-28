import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Spatial File Managerのバリアント定義
 * 3次元空間を利用したファイル管理
 */
const spatialFileManagerVariants = cva("relative", {
  variants: {
    perspective: {
      none: "",
      subtle: "perspective-1000",
      normal: "perspective-[2000px]",
      strong: "perspective-[3000px]",
    },
  },
  defaultVariants: {
    perspective: "normal",
  },
});

/**
 * ファイルアイテムの型定義
 */
export interface SpatialFileItem {
  /**
   * ファイルID
   */
  id: string;
  /**
   * ファイル名
   */
  name: string;
  /**
   * ファイルタイプ（画像、テキストなど）
   */
  type?: string;
  /**
   * ファイルのサイズ（注意を引くための大きさ調整に使用）
   */
  size?: number;
  /**
   * ファイルの位置（3D空間での座標）
   */
  position?: {
    x: number;
    y: number;
    z: number;
  };
  /**
   * カスタムアイコン
   */
  icon?: React.ReactNode;
  /**
   * クリック時のハンドラ
   */
  onClick?: () => void;
}

/**
 * Spatial File ManagerコンポーネントのProps
 */
export interface SpatialFileManagerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spatialFileManagerVariants> {
  /**
   * 表示するファイルのリスト
   */
  files: SpatialFileItem[];
  /**
   * ファイル表示モード
   */
  mode?: "text" | "icon" | "mixed";
  /**
   * アクティブなファイルID（大きく表示される）
   */
  activeFileId?: string;
}

/**
 * SF映画のインタフェースデザインをインスパイアした3Dファイル管理コンポーネント
 *
 * 3次元空間を利用して大量のデータを配置・整理します。
 * 空間的記憶を活用した直感的なファイル検索を提供します。
 * 『ファイナル・カット』や『カウボーイビバップ』のような3Dファイル管理を実現します。
 *
 * 原則：
 * - 大きさで注意を引く：処理中のファイルが他のファイルよりも大きく表示される
 * - 空間的記憶を活用：3次元空間を利用してファイルを配置
 *
 * @example
 * ```tsx
 * <SpatialFileManager
 *   files={[
 *     { id: "1", name: "file1.txt", size: 100 },
 *     { id: "2", name: "file2.jpg", size: 500, activeFileId: "2" },
 *   ]}
 *   mode="mixed"
 * />
 * ```
 */
const SpatialFileManager = React.forwardRef<HTMLDivElement, SpatialFileManagerProps>(
  (
    { className, perspective, files, mode = "mixed", activeFileId, ...props },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [hoveredFileId, setHoveredFileId] = React.useState<string | null>(null);

    // ファイルのサイズを正規化（0.5倍から2倍の範囲）
    const normalizeSize = React.useCallback(
      (size?: number, isActive?: boolean) => {
        if (isActive) return 2;
        if (!size) return 1;
        const maxSize = Math.max(...files.map((f) => f.size || 1));
        const minSize = Math.min(...files.map((f) => f.size || 1));
        if (maxSize === minSize) return 1;
        return 0.5 + ((size - minSize) / (maxSize - minSize)) * 1.5;
      },
      [files]
    );

    return (
      <div
        ref={ref}
        className={cn(
          spatialFileManagerVariants({ perspective }),
          "w-full h-full min-h-[500px]",
          className
        )}
        {...props}
      >
        <div
          ref={containerRef}
          className={cn(
            "relative w-full h-full",
            "transform-gpu",
            perspective && "preserve-3d",
            perspective && spatialFileManagerVariants({ perspective })
          )}
          style={{
            transformStyle: "preserve-3d",
            perspectiveOrigin: "center center",
          }}
        >
          {files.map((file) => {
            const isActive = activeFileId === file.id || hoveredFileId === file.id;
            const scale = normalizeSize(file.size, isActive);
            const position = file.position || { x: 0, y: 0, z: 0 };

            return (
              <div
                key={file.id}
                className={cn(
                  "absolute transition-all duration-300 cursor-pointer",
                  "font-lcars text-lcars-blue",
                  isActive && "z-10"
                )}
                style={{
                  left: `${50 + position.x}%`,
                  top: `${50 + position.y}%`,
                  transform: `translate(-50%, -50%) translateZ(${position.z}px) scale(${scale})`,
                  transformStyle: "preserve-3d",
                }}
                onMouseEnter={() => setHoveredFileId(file.id)}
                onMouseLeave={() => setHoveredFileId(null)}
                onClick={file.onClick}
              >
                <div
                  className={cn(
                    "p-3 rounded-lg border-2 border-lcars-blue",
                    "bg-lcars-dark/80 backdrop-blur-sm",
                    "shadow-[0_0_10px_rgba(74,158,255,0.3)]",
                    isActive &&
                      "shadow-[0_0_20px_rgba(74,158,255,0.6)] border-lcars-blue-glow"
                  )}
                >
                  {mode === "icon" && file.icon && (
                    <div className="flex items-center justify-center mb-2">
                      {file.icon}
                    </div>
                  )}
                  {(mode === "text" || mode === "mixed") && (
                    <div
                      className={cn(
                        "text-sm uppercase tracking-wider",
                        isActive && "text-hierarchy-primary"
                      )}
                    >
                      {file.name}
                    </div>
                  )}
                  {mode === "mixed" && file.type && (
                    <div className="text-xs text-hierarchy-tertiary mt-1">
                      {file.type}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
SpatialFileManager.displayName = "SpatialFileManager";

export { SpatialFileManager, spatialFileManagerVariants, type SpatialFileItem };

