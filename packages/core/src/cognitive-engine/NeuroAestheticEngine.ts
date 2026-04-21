import type {
  BezierCurve,
  HierarchyNode,
  LayoutSpec,
  Point,
  SalienceScore,
  VisualSalienceMap,
} from '../types.js';

export class NeuroAestheticEngine {
  predictVisualSalience(layout: LayoutSpec): VisualSalienceMap {
    const hotspots = layout.elements
      .map((element) => ({
        element,
        salience: this.calculateElementSalience(element.weight, element.contrast, element.motion ?? 0),
      }))
      .filter(({ salience }) => salience.score >= 0.55)
      .map(({ element, salience }) => this.toPoint(element, salience));

    return {
      hotspots,
      flowPath: this.generateScanPath(hotspots),
      hierarchyLevels: this.computeHierarchy(layout, hotspots),
      attentionPrediction: {
        intensity: hotspots.map((hotspot) => Number(hotspot.score.toFixed(3))),
      },
    };
  }

  calculateOptimalNovelty(familiarityBaseline: number): number {
    return Number(Math.max(0.3, Math.min(0.72, familiarityBaseline)).toFixed(2));
  }

  private calculateElementSalience(weight: number, contrast: number, motion: number): SalienceScore {
    const raw = weight * 0.45 + contrast * 0.4 + motion * 0.15;
    const score = Number(Math.min(1, Math.max(0, raw)).toFixed(3));

    if (contrast >= 0.75) {
      return { score, reason: 'contrast' };
    }

    if (motion >= 0.65) {
      return { score, reason: 'motion' };
    }

    return { score, reason: 'hierarchy' };
  }

  private toPoint(element: LayoutSpec['elements'][number], salience: SalienceScore): Point {
    return {
      x: element.x,
      y: element.y,
      size: element.width,
      height: element.height,
      score: salience.score,
      reason: salience.reason,
    };
  }

  private generateScanPath(hotspots: Point[]): BezierCurve[] {
    const ordered = [...hotspots].sort((left, right) => right.score - left.score);
    const curves: BezierCurve[] = [];

    for (let index = 0; index < ordered.length - 1; index += 1) {
      const current = ordered[index];
      const next = ordered[index + 1];

      if (!current || !next) {
        continue;
      }

      curves.push({
        start: { x: current.x, y: current.y },
        control: { x: (current.x + next.x) / 2, y: Math.min(current.y, next.y) },
        end: { x: next.x, y: next.y },
      });
    }

    return curves;
  }

  private computeHierarchy(layout: LayoutSpec, hotspots: Point[]): HierarchyNode[] {
    const scoredHotspots = hotspots
      .map((hotspot) => {
        const source = layout.elements.find((element) => element.x === hotspot.x && element.y === hotspot.y);
        return {
          elementId: source?.id ?? `${hotspot.x}:${hotspot.y}`,
          score: hotspot.score,
        };
      })
      .sort((left, right) => right.score - left.score);

    return scoredHotspots.map((hotspot, index) => ({
      elementId: hotspot.elementId,
      level: index + 1,
      score: hotspot.score,
    }));
  }
}