import { useEffect, useState } from 'react';
import { Animated, Easing, Platform, type DimensionValue, StyleSheet } from 'react-native';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { color, motion, radius } from '@/theme';

/** Web has no native animated module; asking for it only logs a warning. */
const NATIVE_DRIVER = Platform.OS !== 'web';

type Props = {
  width?: DimensionValue;
  height?: number;
  radius?: number;
  style?: object;
};

/** Loading placeholder at the real content height. Never a spinner on white. */
export function Skeleton({ width = '100%', height = 20, radius: r = radius.input, style }: Props) {
  const reduceMotion = useReducedMotion();
  const [pulse] = useState(() => new Animated.Value(0.55));

  useEffect(() => {
    if (reduceMotion) {
      pulse.setValue(0.7);
      return;
    }

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          // The one deliberately slow loop in the app: a loading placeholder
          // that breathes faster than this reads as a flashing warning.
          duration: motion.duration.slow * 2,
          easing: Easing.linear,
          useNativeDriver: NATIVE_DRIVER,
        }),
        Animated.timing(pulse, {
          toValue: 0.55,
          duration: motion.duration.slow * 2,
          easing: Easing.linear,
          useNativeDriver: NATIVE_DRIVER,
        }),
      ]),
    );

    loop.start();
    return () => loop.stop();
  }, [pulse, reduceMotion]);

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[styles.base, { width, height, borderRadius: r, opacity: pulse }, style]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: color.paperDeep,
  },
});
