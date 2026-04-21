export class MotionTokenGenerator {
  generate(): Record<string, string | number> {
    return {
      'motion.duration.fast': '140ms',
      'motion.duration.base': '220ms',
      'motion.duration.slow': '420ms',
      'motion.ease.standard': 'cubic-bezier(0.2, 0, 0, 1)',
      'motion.ease.emphasized': 'cubic-bezier(0.18, 0.88, 0.32, 1.1)',
      'motion.scale.subtle': 1.02,
    };
  }
}