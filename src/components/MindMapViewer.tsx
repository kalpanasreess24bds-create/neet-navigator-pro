import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, RotateCcw, ChevronDown, ChevronRight } from "lucide-react";
import { type MindMapNode } from "@/data/mindMapData";

interface MindMapViewerProps {
  data: MindMapNode;
  title: string;
  onClose: () => void;
}

interface NodePosition {
  x: number;
  y: number;
  node: MindMapNode;
  parentPos?: { x: number; y: number };
  depth: number;
}

const NODE_COLORS = [
  { bg: "hsl(243 75% 55%)", text: "hsl(0 0% 100%)" },     // primary indigo
  { bg: "hsl(152 60% 45%)", text: "hsl(0 0% 100%)" },     // green
  { bg: "hsl(38 92% 55%)", text: "hsl(30 80% 15%)" },     // amber
  { bg: "hsl(340 65% 55%)", text: "hsl(0 0% 100%)" },     // rose
  { bg: "hsl(200 70% 50%)", text: "hsl(0 0% 100%)" },     // sky blue
  { bg: "hsl(280 60% 55%)", text: "hsl(0 0% 100%)" },     // purple
];

const MindMapViewer = ({ data, title, onClose }: MindMapViewerProps) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(() => {
    // Start with root children expanded
    const initial = new Set<string>(["root"]);
    return initial;
  });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const toggleNode = useCallback((nodeId: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) next.delete(nodeId);
      else next.add(nodeId);
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    const collectIds = (node: MindMapNode): string[] => {
      const ids = [node.id];
      node.children?.forEach((c) => ids.push(...collectIds(c)));
      return ids;
    };
    setExpandedNodes(new Set(collectIds(data)));
  }, [data]);

  // Calculate node positions using a tree layout
  const positions = useMemo(() => {
    const result: NodePosition[] = [];
    const HORIZONTAL_GAP = 220;
    const VERTICAL_GAP = 60;

    let currentY = 0;

    const layoutNode = (
      node: MindMapNode,
      depth: number,
      parentPos?: { x: number; y: number }
    ): { minY: number; maxY: number; centerY: number } => {
      const x = depth * HORIZONTAL_GAP;
      const isExpanded = expandedNodes.has(node.id);
      const visibleChildren = isExpanded ? node.children || [] : [];

      if (visibleChildren.length === 0) {
        const y = currentY;
        currentY += VERTICAL_GAP;
        result.push({ x, y, node, parentPos, depth });
        return { minY: y, maxY: y, centerY: y };
      }

      const childResults = visibleChildren.map((child) =>
        layoutNode(child, depth + 1, undefined)
      );

      const minY = childResults[0].minY;
      const maxY = childResults[childResults.length - 1].maxY;
      const centerY = (minY + maxY) / 2;

      result.push({ x, y: centerY, node, parentPos, depth });

      // Update children's parentPos
      childResults.forEach((cr, i) => {
        const childNode = result.find(
          (r) => r.node.id === visibleChildren[i].id
        );
        if (childNode) {
          childNode.parentPos = { x, y: centerY };
        }
      });

      return { minY, maxY, centerY };
    };

    layoutNode(data, 0);
    return result;
  }, [data, expandedNodes]);

  // Calculate SVG viewport
  const bounds = useMemo(() => {
    if (positions.length === 0) return { minX: 0, minY: 0, width: 800, height: 600 };
    const padding = 120;
    const nodeWidth = 170;
    const minX = Math.min(...positions.map((p) => p.x)) - padding;
    const minY = Math.min(...positions.map((p) => p.y)) - padding;
    const maxX = Math.max(...positions.map((p) => p.x)) + nodeWidth + padding;
    const maxY = Math.max(...positions.map((p) => p.y)) + padding;
    return { minX, minY, width: maxX - minX, height: maxY - minY };
  }, [positions]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const handlePointerUp = () => setIsDragging(false);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col bg-background"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center"
            >
              <X className="w-4 h-4 text-foreground" />
            </button>
            <div>
              <h2 className="font-display font-bold text-sm text-foreground">Mind Map</h2>
              <p className="text-[10px] text-muted-foreground">{title}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setZoom((z) => Math.max(0.3, z - 0.15))}
              className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center"
            >
              <ZoomOut className="w-4 h-4 text-muted-foreground" />
            </button>
            <span className="text-xs font-mono text-muted-foreground w-10 text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(2, z + 0.15))}
              className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center"
            >
              <ZoomIn className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => {
                expandAll();
                setZoom(0.7);
                setPan({ x: 0, y: 0 });
              }}
              className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center ml-1"
            >
              <RotateCcw className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div
          className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <svg
            width="100%"
            height="100%"
            viewBox={`${bounds.minX} ${bounds.minY} ${bounds.width} ${bounds.height}`}
            style={{
              transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
              transformOrigin: "center center",
            }}
          >
            {/* Connection lines */}
            {positions
              .filter((p) => p.parentPos)
              .map((p) => {
                const startX = p.parentPos!.x + 160;
                const startY = p.parentPos!.y + 18;
                const endX = p.x;
                const endY = p.y + 18;
                const midX = (startX + endX) / 2;
                return (
                  <motion.path
                    key={`line-${p.node.id}`}
                    d={`M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`}
                    fill="none"
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                );
              })}

            {/* Nodes */}
            {positions.map((p) => {
              const colorIndex = p.depth % NODE_COLORS.length;
              const color = NODE_COLORS[colorIndex];
              const hasChildren = (p.node.children?.length || 0) > 0;
              const isExpanded = expandedNodes.has(p.node.id);
              const isRoot = p.depth === 0;
              const nodeWidth = isRoot ? 170 : 160;
              const nodeHeight = 36;
              const borderRadius = 12;

              return (
                <motion.g
                  key={p.node.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: p.depth * 0.05 }}
                  style={{ cursor: hasChildren ? "pointer" : "default" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (hasChildren) toggleNode(p.node.id);
                  }}
                >
                  {/* Shadow */}
                  <rect
                    x={p.x + 2}
                    y={p.y + 3}
                    width={nodeWidth}
                    height={nodeHeight}
                    rx={borderRadius}
                    fill="hsl(var(--foreground) / 0.06)"
                  />
                  {/* Node background */}
                  <rect
                    x={p.x}
                    y={p.y}
                    width={nodeWidth}
                    height={nodeHeight}
                    rx={borderRadius}
                    fill={isRoot ? color.bg : "hsl(var(--card))"}
                    stroke={isRoot ? "none" : color.bg}
                    strokeWidth={isRoot ? 0 : 2}
                  />
                  {/* Label */}
                  <text
                    x={p.x + (hasChildren ? 12 : 14)}
                    y={p.y + nodeHeight / 2 + 1}
                    dominantBaseline="central"
                    fill={isRoot ? color.text : "hsl(var(--card-foreground))"}
                    fontSize={isRoot ? "12" : "11"}
                    fontWeight={isRoot ? "700" : "500"}
                    fontFamily="'Space Grotesk', 'Inter', sans-serif"
                  >
                    {p.node.label.length > 20
                      ? p.node.label.slice(0, 18) + "..."
                      : p.node.label}
                  </text>
                  {/* Expand/Collapse indicator */}
                  {hasChildren && (
                    <g transform={`translate(${p.x + nodeWidth - 22}, ${p.y + nodeHeight / 2 - 6})`}>
                      <rect
                        width="12"
                        height="12"
                        rx="3"
                        fill={isRoot ? "hsl(0 0% 100% / 0.2)" : `${color.bg}20`}
                      />
                      <text
                        x="6"
                        y="7"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="9"
                        fill={isRoot ? color.text : color.bg}
                        fontWeight="700"
                      >
                        {isExpanded ? "-" : "+"}
                      </text>
                    </g>
                  )}
                </motion.g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="px-4 py-2 border-t border-border/50 flex items-center justify-between text-[10px] text-muted-foreground shrink-0">
          <span>Click nodes to expand/collapse. Drag to pan.</span>
          <span>{positions.length} concepts</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MindMapViewer;
