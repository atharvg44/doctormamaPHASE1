import { StyleSheet, Text, View } from 'react-native';

import { Icon } from './Icon';
import { PressableScale } from './press';
import { useT } from '@/i18n';
import { color, radius, space, type } from '@/theme';

type Props = {
  /** Spoken name of the field, e.g. "रुग्णाचे नाव". */
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

/**
 * Typing is never required. Every free-text field offers this 56dp row
 * directly underneath it, with the word "बोलून" visible beside the mic —
 * an icon alone would be a guess for a first-time smartphone user.
 */
export function VoiceHint({ label, onPress, disabled = false }: Props) {
  const { t } = useT();

  return (
    <PressableScale
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={`${label}, ${t.ui.speak}`}
      accessibilityHint={t.ui.speakHint}
      accessibilityState={{ disabled }}
      style={[styles.base, disabled ? styles.disabled : null]}
    >
      <View style={styles.icon}>
        <Icon name="mic" size={26} tint={disabled ? color.inkSoft : color.ink} />
      </View>
      <Text style={[styles.text, disabled ? styles.textDisabled : null]}>{t.ui.speak}</Text>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingHorizontal: 0,
    borderRadius: radius.input,
    alignSelf: 'flex-start',
    minWidth: 200,
    marginTop: space.xs,
    borderBottomWidth: 1,
    borderBottomColor: color.rule,
    paddingBottom: 4,
  },
  disabled: {
    opacity: 0.6,
  },
  icon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.2,
    borderColor: color.ink,
    backgroundColor: color.paperRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...type.label,
    color: color.ink,
    textDecorationLine: 'underline',
  },
  textDisabled: {
    color: color.inkSoft,
  },
});
