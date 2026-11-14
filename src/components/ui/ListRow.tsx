import { StyleSheet, Text, View } from 'react-native';

import { Icon } from './Icon';
import { PressableScale } from './press';
import { color, space, type } from '@/theme';

type Props = {
  title: string;
  subtitle?: string;
  trailingText?: string;
  leading?: React.ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  showChevron?: boolean;
};

/**
 * A denser row than BigCard, for inside a list where the header already
 * explains the section. Still 88dp tall so it stays a thumb target.
 */
export function ListRow({
  title,
  subtitle,
  trailingText,
  leading,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  showChevron = true,
}: Props) {
  const content = (
    <View style={styles.row}>
      {leading ? <View style={styles.leading}>{leading}</View> : null}
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {trailingText ? <Text style={styles.trailing}>{trailingText}</Text> : null}
      {onPress && showChevron ? <Icon name="chevronRight" size={28} tint={color.inkSoft} /> : null}
    </View>
  );

  if (!onPress) return <View style={styles.base}>{content}</View>;

  return (
    <PressableScale
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityHint={accessibilityHint}
      style={styles.base}
    >
      {content}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 72,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: color.rule,
    paddingVertical: space.md,
    justifyContent: 'center',
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
    gap: 2,
  },
  title: {
    ...type.bodyStrong,
    color: color.textPrimary,
  },
  subtitle: {
    ...type.caption,
    color: color.textSecondary,
  },
  trailing: {
    ...type.numeric,
    color: color.textSecondary,
  },
});
