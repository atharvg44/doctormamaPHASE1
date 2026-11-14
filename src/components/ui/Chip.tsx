import { StyleSheet, Text } from 'react-native';

import { PressableScale } from './press';
import { color, layout, radius, space, type } from '@/theme';

type Props = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
};

/** Symptom and filter chip. 56dp minimum, wraps to two lines rather than truncating. */
export function Chip({ label, selected = false, onPress, accessibilityLabel }: Props) {
  return (
    <PressableScale
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ selected }}
      style={[styles.base, selected ? styles.selected : null]}
    >
      <Text style={[styles.label, selected ? styles.labelSelected : null]} numberOfLines={2}>
        {label}
      </Text>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: layout.control,
    minWidth: 88,
    paddingHorizontal: space.xl,
    paddingVertical: space.sm,
    borderRadius: radius.card,
    borderWidth: 1.5,
    borderColor: color.ink,
    backgroundColor: color.paperRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    borderColor: color.ink,
    backgroundColor: color.ink,
  },
  label: {
    ...type.label,
    color: color.textPrimary,
    textAlign: 'center',
  },
  labelSelected: {
    color: color.paper,
  },
});
