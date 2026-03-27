// dashboard/src/office/isoUtils.ts
import type { Graphics as PixiGraphics } from "pixi.js";
import { ISO_TILE_W, ISO_TILE_H } from "./palette";

/**
 * Convert grid (col, row) to isometric screen position.
 * Uses 2:1 dimetric projection.
 */
export function toIso(
  col: number,
  row: number,
  originX: number,
  originY: number
): { x: number; y: number } {
  return {
    x: Math.round(originX + (col - row) * ISO_TILE_W / 2),
    y: Math.round(originY + (col + row) * ISO_TILE_H / 2),
  };
}

/**
 * Draw a filled isometric diamond tile.
 */
export function isoTile(
  g: PixiGraphics,
  cx: number,
  cy: number,
  tw: number,
  th: number,
  color: number,
  alpha = 1
): void {
  g.moveTo(cx, cy - th / 2);
  g.lineTo(cx + tw / 2, cy);
  g.lineTo(cx, cy + th / 2);
  g.lineTo(cx - tw / 2, cy);
  g.closePath();
  g.fill({ color, alpha });
}

/**
 * Draw a 3-face isometric box (top + left + right faces).
 * Light source: top-left → top face lightest, left medium, right darkest.
 */
export function isoBox(
  g: PixiGraphics,
  cx: number,
  cy: number,
  tw: number,
  th: number,
  height: number,
  topColor: number,
  leftColor: number,
  rightColor: number
): void {
  // Left face
  g.moveTo(cx - tw / 2, cy - height);
  g.lineTo(cx, cy + th / 2 - height);
  g.lineTo(cx, cy + th / 2);
  g.lineTo(cx - tw / 2, cy);
  g.closePath();
  g.fill({ color: leftColor });

  // Right face
  g.moveTo(cx + tw / 2, cy - height);
  g.lineTo(cx, cy + th / 2 - height);
  g.lineTo(cx, cy + th / 2);
  g.lineTo(cx + tw / 2, cy);
  g.closePath();
  g.fill({ color: rightColor });

  // Top face
  g.moveTo(cx, cy - th / 2 - height);
  g.lineTo(cx + tw / 2, cy - height);
  g.lineTo(cx, cy + th / 2 - height);
  g.lineTo(cx - tw / 2, cy - height);
  g.closePath();
  g.fill({ color: topColor });
}

/**
 * Draw a ground shadow ellipse.
 */
export function groundShadow(
  g: PixiGraphics,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  alpha = 0.08
): void {
  g.ellipse(cx, cy, rx, ry);
  g.fill({ color: 0x000000, alpha });
}
