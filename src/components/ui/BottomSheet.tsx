import { useEffect, useState } from 'react';
import {
  Animated,
  Easing,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from './Icon';
import { PressableScale } from './press';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useT } from '@/i18n';
import { color, motion, space, type } from '@/theme';

/** Web has no native animated module; asking for it only logs a warning. */
const NATIVE_DRIVER = Platform.OS !== 'web';

type Props = {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  /** Never cover the whole screen — the handle must stay visible. */
  maxHeightRatio?: number;
};

/**
 * Bottom sheet instead of a centred modal: it lives in the thumb zone and
 * closes with a labelled 56dp button, not a bare ✕.
 */
export function BottomSheet({ visible, onClose, title, children, maxHeightRatio = 0.85 }: Props) {
  const insets = useSafeAreaInsets();
  const reduceMotion = useReducedMotion();
  const { t } = useT();
  const [progress] = useState(() => new Animated.Value(0));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: visible ? 1 : 0,
      duration: reduceMotion ? 0 : visible ? motion.duration.panel : motion.duration.quick,
      easing: Easing.bezier(0.22, 1, 0.36, 1),
      useNativeDriver: NATIVE_DRIVER,
    });

    // Mount/unmount happens in the completion callback, never as a
    // synchronous setState inside the effect.
    animation.start(({ finished }) => {
      if (finished) setMounted(visible);
    });

    return () => animation.stop();
  }, [visible, reduceMotion, progress]);

  if (!visible && !mounted) return null;

  const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [420, 0] });

  const overlay = (
    <View style={styles.overlay}>
      <Pressable
        style={styles.backdrop}
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel={t.ui.close}
      />

      <Animated.View
        style={[
          styles.sheet,
          {
            maxHeight: `${Math.round(maxHeightRatio * 100)}%`,
            paddingBottom: insets.bottom + space.lg,
            opacity: reduceMotion ? 1 : progress,
            transform: [{ translateY: reduceMotion ? 0 : translateY }],
          },
        ]}
      >
        <View style={styles.handle} />

        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <PressableScale
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel={t.ui.close}
            style={styles.close}
          >
            <Icon name="close" size={24} tint={color.ink} />
            <Text style={styles.closeLabel}>{t.ui.close}</Text>
          </PressableScale>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </Animated.View>
    </View>
  );

  // React Native's Modal portals to the window root on web, which drops the
  // sheet outside the phone frame and loses the safe-area insets. In the
  // browser preview it must live inside the screen instead.
  if (Platform.OS === 'web') {
    return <View style={styles.webLayer}>{overlay}</View>;
  }

  return (
    <Modal transparent visible animationType="none" onRequestClose={onClose} statusBarTranslucent>
      {overlay}
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  webLayer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 20,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(26, 20, 9, 0.45)',
  },
  sheet: {
    backgroundColor: color.paperRaised,
    borderTopWidth: 2,
    borderTopColor: color.ink,
    paddingTop: space.md,
  },
  handle: {
    alignSelf: 'center',
    width: 48,
    height: 4,
    backgroundColor: color.rule,
    marginBottom: space.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    paddingHorizontal: space.xl,
    paddingBottom: space.md,
  },
  title: {
    ...type.h3,
    fontFamily: 'NotoSerifDevanagari_700Bold',
    color: color.ink,
    flex: 1,
  },
  close: {
    minHeight: 56,
    minWidth: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
    paddingHorizontal: space.sm,
  },
  closeLabel: {
    ...type.caption,
    color: color.ink,
    textDecorationLine: 'underline',
  },
  content: {
    paddingHorizontal: space.xl,
    paddingBottom: space.lg,
    gap: space.lg,
  },
});
