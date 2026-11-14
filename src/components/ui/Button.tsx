import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { Icon, type IconName } from './Icon';
import { PressableScale } from './press';
import { color, layout, radius, space, type } from '@/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'emergency' | 'danger';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  /** Primary is the 64dp dock action; standard is 56dp for secondary use. */
  size?: 'primary' | 'standard';
  icon?: IconName;
  /** 'trailing' for forward navigation, so the chevron sits after the words. */
  iconPosition?: 'leading' | 'trailing';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  accessibilityHint?: string;
  style?: object;
};

const surface: Record<ButtonVariant, { bg: string; pressed: string; border?: string; text: string; icon: string }> = {
  primary: { bg: color.ink, pressed: '#33291A', text: color.paper, icon: color.paper },
  secondary: { bg: color.paperRaised, pressed: color.paperDeep, border: color.ink, text: color.ink, icon: color.ink },
  ghost: { bg: 'transparent', pressed: color.paperDeep, text: color.ink, icon: color.ink },
  emergency: { bg: color.red, pressed: '#8C1C14', text: '#FFFFFF', icon: '#FFFFFF' },
  danger: { bg: color.paper, pressed: color.redTint, border: color.red, text: color.redInk, icon: color.redInk },
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'primary',
  icon,
  iconPosition = 'leading',
  loading = false,
  disabled = false,
  fullWidth = true,
  accessibilityHint,
  style,
}: Props) {
  const tone = surface[variant];
  const height = size === 'primary' ? layout.primaryControl : layout.control;
  const inactive = disabled || loading;

  return (
    <PressableScale
      onPress={onPress}
      disabled={inactive}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: inactive, busy: loading }}
      style={[
        styles.base,
        {
          minHeight: height,
          backgroundColor: disabled ? color.paperDeep : tone.bg,
          borderColor: disabled ? color.rule : tone.border ?? 'transparent',
          borderWidth: disabled || tone.border ? 1.5 : 0,
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
          paddingHorizontal: fullWidth ? space.xl : space.xxl,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={disabled ? color.inkSoft : tone.text} />
      ) : (
        <View style={[styles.content, icon && iconPosition === 'trailing' ? styles.reversed : null]}>
          {icon && iconPosition === 'leading' ? (
            <Icon name={icon} size={26} tint={disabled ? color.inkSoft : tone.icon} />
          ) : null}
          <Text
            style={[
              type.label,
              { color: disabled ? color.inkSoft : tone.text },
              variant === 'ghost' && !disabled ? styles.underlined : null,
              fullWidth ? styles.centered : null,
            ]}
            numberOfLines={3}
          >
            {label}
          </Text>
          {icon && iconPosition === 'trailing' ? (
            <Icon name={icon} size={26} tint={disabled ? color.inkSoft : tone.icon} />
          ) : null}
        </View>
      )}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.card,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: space.sm,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.sm,
  },
  reversed: {
    flexDirection: 'row-reverse',
  },
  underlined: {
    textDecorationLine: 'underline',
  },
  centered: {
    textAlign: 'center',
    flexShrink: 1,
  },
});
