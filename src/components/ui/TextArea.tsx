import { useEffect, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';

import { Icon } from './Icon';
import { VoiceHint } from './VoiceHint';
import { useT } from '@/i18n';
import { color, radius, space, type } from '@/theme';

type Props = Omit<TextInputProps, 'style' | 'multiline'> & {
  label: string;
  error?: string;
  helper?: string;
  optional?: boolean;
  onVoice?: () => void;
};

/** Multi-line notes field. 140dp minimum so the first sentence is visible. */
export function TextArea({ label, error, helper, optional, onVoice, onFocus, onBlur, ...rest }: Props) {
  const { t } = useT();
  const [focused, setFocused] = useState(false);
  const invalid = Boolean(error);
  const lastError = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (error && error !== lastError.current) {
      AccessibilityInfo.announceForAccessibility(`${label}. ${error}`);
    }
    lastError.current = error;
  }, [error, label]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {optional ? <Text style={styles.optional}>{t.ui.optional}</Text> : null}
      </View>

      <View
        style={[
          styles.field,
          focused ? styles.fieldFocused : null,
          invalid ? styles.fieldInvalid : null,
        ]}
      >
        {focused && !invalid ? <View style={styles.focusMark} /> : null}
        <TextInput
          {...rest}
          multiline
          textAlignVertical="top"
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          accessibilityLabel={label}
          accessibilityHint={helper}
          accessibilityState={{ disabled: rest.editable === false }}
          aria-invalid={invalid}
          placeholderTextColor={color.placeholder}
          style={styles.input}
        />
      </View>

      {error ? (
        <View style={styles.messageRow} accessibilityLiveRegion="polite">
          <Icon name="alert" size={22} tint={color.warning} />
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : helper ? (
        <Text style={styles.helper}>{helper}</Text>
      ) : null}

      {onVoice ? <VoiceHint label={label} onPress={onVoice} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: space.sm,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: space.sm,
  },
  label: {
    ...type.bodyStrong,
    color: color.ink,
  },
  optional: {
    ...type.caption,
    color: color.inkSoft,
  },
  field: {
    position: 'relative',
    minHeight: 140,
    borderRadius: radius.input,
    borderWidth: 1.5,
    borderColor: color.ink,
    backgroundColor: color.paperRaised,
    padding: space.lg,
  },
  fieldFocused: {
    backgroundColor: color.paper,
  },
  fieldInvalid: {
    borderColor: color.warning,
    backgroundColor: color.warningTint,
  },
  focusMark: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: color.ink,
  },
  input: {
    ...type.body,
    color: color.ink,
    minHeight: 100,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
  },
  error: {
    ...type.caption,
    color: color.warning,
    flexShrink: 1,
  },
  helper: {
    ...type.caption,
    color: color.inkSoft,
  },
});
