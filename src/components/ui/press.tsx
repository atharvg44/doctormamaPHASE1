import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { motion } from '@/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/** Web has no native animated module; asking for it only logs a warning. */
const NATIVE_DRIVER = Platform.OS !== 'web';

type Props = Omit<PressableProps, 'style'> & {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Near-invisible press feedback; never a bounce. */
  scaleTo?: number;
  haptic?: boolean;
};

/**
 * The single press target used everywhere. Gives 0.98 scale + a faint
 * opacity dip and a light haptic, and stays completely still under
 * Reduce Motion. No colour flash — colour changes read as state, not touch.
 */
export function PressableScale({
  children,
  style,
  scaleTo = motion.scale.press,
  haptic = true,
  onPressIn,
  onPressOut,
  disabled,
  ...rest
}: Props) {
  const [scale] = useState(() => new Animated.Value(1));
  const [opacity] = useState(() => new Animated.Value(1));
  const reduceMotion = useReducedMotion();

  function animate(scaleValue: number, opacityValue: number, duration: number) {
    if (reduceMotion) return;
    Animated.parallel([
      Animated.timing(scale, {
        toValue: scaleValue,
        duration,
        easing: Easing.bezier(0.22, 1, 0.36, 1),
        useNativeDriver: NATIVE_DRIVER,
      }),
      Animated.timing(opacity, {
        toValue: opacityValue,
        duration,
        easing: Easing.bezier(0.22, 1, 0.36, 1),
        useNativeDriver: NATIVE_DRIVER,
      }),
    ]).start();
  }

  return (
    <AnimatedPressable
      {...rest}
      disabled={disabled}
      onPressIn={(event) => {
        animate(scaleTo, 0.9, motion.duration.micro);
        if (haptic) Haptics.selectionAsync().catch(() => {});
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        animate(1, 1, motion.duration.quick);
        onPressOut?.(event);
      }}
      style={[style, { transform: [{ scale }], opacity }]}
    >
      {children}
    </AnimatedPressable>
  );
}
