import { StyleSheet, Text, View } from 'react-native';

import { color, radius, space, type } from '@/theme';

export type PillTone = 'neutral' | 'success' | 'warning' | 'emergency' | 'primary';

type Props = {
  label: string;
  tone?: PillTone;
};

const tones: Record<PillTone, { bg: string; text: string; border: string }> = {
  neutral: { bg: 'transparent', text: color.ink, border: color.ink },
  primary: { bg: color.ink, text: color.paper, border: color.ink },
  success: { bg: 'transparent', text: color.success, border: color.success },
  warning: { bg: 'transparent', text: color.warning, border: color.warning },
  emergency: { bg: color.redTint, text: color.redInk, border: color.redInk },
};

/** Non-interactive status. Colour is always paired with the label text. */
export function StatusPill({ label, tone = 'neutral' }: Props) {
  const t = tones[tone];
  return (
    <View style={[styles.base, { backgroundColor: t.bg, borderColor: t.border }]}>
      <Text style={[styles.text, { color: t.text }]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    paddingHorizontal: space.md,
    paddingVertical: 6,
    borderRadius: radius.card,
    borderWidth: 1.2,
  },
  text: {
    ...type.caption,
    fontFamily: 'NotoSansDevanagari_600SemiBold',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.5,
  },
});
