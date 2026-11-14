import { StyleSheet, Text, View } from 'react-native';

import { PressableScale } from './press';
import { useT } from '@/i18n';
import { color, layout, radius, space } from '@/theme';

type Props = {
  onPress?: () => void;
  label?: string;
  sublabel?: string;
  style?: object;
};

/**
 * The emergency control. Occupies the right side of the action dock.
 * Red is never used for anything else in the app.
 */
export function SosButton({ onPress, label, sublabel, style }: Props) {
  const { t } = useT();

  return (
    <PressableScale
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={t.ui.sosButton}
      accessibilityHint={t.ui.sosHint}
      style={[styles.base, style]}
    >
      <View style={styles.inner}>
        <Text style={styles.sos} numberOfLines={1}>
          {label ?? t.home.sos}
        </Text>
        <Text style={styles.sub} numberOfLines={1}>
          {sublabel ?? t.home.sosLabel}
        </Text>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: layout.primaryControl,
    borderRadius: radius.card,
    backgroundColor: color.red,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: space.lg,
    paddingVertical: space.sm,
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sos: {
    fontFamily: 'NotoSansDevanagari_700Bold',
    fontSize: 21,
    lineHeight: 24,
    letterSpacing: 1.2,
    color: '#FFFFFF',
  },
  sub: {
    fontFamily: 'NotoSansDevanagari_600SemiBold',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.4,
    color: '#FFFFFF',
  },
});
