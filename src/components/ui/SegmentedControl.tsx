import { StyleSheet, Text, View } from 'react-native';

import { PressableScale } from './press';
import { color, layout, radius, space, type } from '@/theme';

export type SegmentOption = { value: string; label: string };

type Props = {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
  accessibilityLabel?: string;
};

/**
 * Used instead of sliders and 0–10 pain scales. Three or four large
 * segments are easier to reason about than a continuous control.
 */
export function SegmentedControl({ options, value, onChange, accessibilityLabel }: Props) {
  return (
    <View style={styles.row} accessibilityRole="radiogroup" accessibilityLabel={accessibilityLabel}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <PressableScale
            key={option.value}
            onPress={() => onChange(option.value)}
            accessibilityRole="radio"
            accessibilityLabel={option.label}
            accessibilityState={{ checked: selected }}
            style={[styles.segment, selected ? styles.segmentSelected : null]}
          >
            <Text style={[styles.label, selected ? styles.labelSelected : null]} numberOfLines={2}>
              {option.label}
            </Text>
          </PressableScale>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: space.md,
  },
  segment: {
    flex: 1,
    minHeight: layout.primaryControl,
    borderRadius: radius.input,
    borderWidth: 1.5,
    borderColor: color.ink,
    backgroundColor: color.paperRaised,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: space.sm,
    paddingVertical: space.sm,
  },
  segmentSelected: {
    backgroundColor: color.ink,
  },
  label: {
    ...type.label,
    color: color.ink,
    textAlign: 'center',
  },
  labelSelected: {
    color: color.paper,
  },
});
