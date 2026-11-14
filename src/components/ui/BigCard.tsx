import { StyleSheet, Text, View } from 'react-native';

import { Icon } from './Icon';
import { PressableScale } from './press';
import { color, layout, radius, space, type } from '@/theme';

type Props = {
  title: string;
  subtitle?: string;
  meta?: string;
  leading?: React.ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  selected?: boolean;
  minHeight?: number;
  style?: object;
};

/**
 * The app's main choice surface. Full width, whole card pressable,
 * one chevron on the trailing edge. Minimum 104dp, 120dp for real choices.
 */
export function BigCard({
  title,
  subtitle,
  meta,
  leading,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  selected = false,
  minHeight = layout.cardMinHeight,
  style,
}: Props) {
  const content = (
    <View style={styles.row}>
      {leading ? <View style={styles.leading}>{leading}</View> : null}
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={2}>
            {subtitle}
          </Text>
        ) : null}
        {meta ? <Text style={styles.meta}>{meta}</Text> : null}
      </View>
      {onPress ? <Icon name="chevronRight" size={32} tint={color.textSecondary} /> : null}
    </View>
  );

  const base = [
    styles.card,
    { minHeight },
    selected ? styles.cardSelected : null,
    style,
  ];

  if (!onPress) return <View style={base}>{content}</View>;

  return (
    <PressableScale
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ selected }}
      style={base}
    >
      {content}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.paperRaised,
    borderRadius: radius.card,
    borderWidth: 1.5,
    borderColor: color.ink,
    padding: space.xl,
    justifyContent: 'center',
  },
  cardSelected: {
    borderColor: color.red,
    backgroundColor: color.redTint,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.lg,
  },
  leading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    gap: space.xs,
  },
  title: {
    ...type.h3,
    color: color.textPrimary,
  },
  subtitle: {
    ...type.body,
    color: color.textSecondary,
  },
  meta: {
    ...type.caption,
    color: color.textMuted,
  },
});
