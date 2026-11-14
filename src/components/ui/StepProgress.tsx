import { StyleSheet, Text, View } from 'react-native';

import { useT } from '@/i18n';
import { color, space, type } from '@/theme';

type Props = {
  total: number;
  /** 1-based. */
  current: number;
  label?: string;
};

/** Four segments, never a spinner. Tells the user where they are in a flow. */
export function StepProgress({ total, current, label }: Props) {
  const { t } = useT();
  const safeCurrent = Math.min(Math.max(current, 1), total);

  return (
    <View
      style={styles.wrapper}
      accessibilityRole="progressbar"
      accessibilityLabel={label ?? `${t.ui.step} ${safeCurrent} / ${total}`}
      accessibilityValue={{ min: 1, max: total, now: safeCurrent }}
    >
      <View style={styles.track}>
        {Array.from({ length: total }).map((_, index) => (
          <View
            key={index}
            style={[styles.segment, index < safeCurrent ? styles.segmentDone : null]}
          />
        ))}
      </View>
      <Text style={styles.label}>
        {t.ui.step} {safeCurrent} / {total}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: space.sm,
  },
  track: {
    flexDirection: 'row',
    gap: space.sm,
  },
  segment: {
    flex: 1,
    height: 6,
    backgroundColor: 'transparent',
    borderTopWidth: 1.5,
    borderTopColor: color.rule,
  },
  segmentDone: {
    borderTopWidth: 3,
    borderTopColor: color.ink,
  },
  label: {
    ...type.caption,
    color: color.inkSoft,
  },
});
