import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

/**
 * Elderly users often enable Reduce Motion system-wide. Every animation in the
 * app must have a non-moving equivalent, so components read this hook.
 */
export function useReducedMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    let mounted = true;

    AccessibilityInfo.isReduceMotionEnabled()
      .then((value) => {
        if (mounted) setReduce(value);
      })
      .catch(() => {});

    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduce);

    return () => {
      mounted = false;
      sub.remove();
    };
  }, []);

  return reduce;
}
