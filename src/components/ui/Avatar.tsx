import { StyleSheet, Text, View } from 'react-native';

import { color, type } from '@/theme';

type Props = {
  name: string;
  tint?: string;
  size?: number;
};

/** Illustrated avatar — initials on a tinted disc. No photographs of people. */
export function Avatar({ name, tint = color.paperDeep, size = 72 }: Props) {
  const cleaned = name.replace(/^डॉ\.\s*/, '').trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  const initials = ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase();

  return (
    <View
      style={[
        styles.base,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: tint, borderWidth: 1.2 },
      ]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <Text
        style={[
          styles.initials,
          { fontSize: Math.round(size * 0.36), lineHeight: Math.round(size * 0.5) },
        ]}
      >
        {initials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: color.ink,
  },
  initials: {
    ...type.h3,
    color: color.ink,
  },
});
