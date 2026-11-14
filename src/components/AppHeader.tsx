import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from '@/components/ui';
import { PressableScale } from '@/components/ui/press';
import { color, layout, space, type } from '@/theme';

type Props = {
  title?: string;
  onBack?: () => void;
  backLabel?: string;
  /** Decorative slot: avatar or nothing. Never an action — the top-right is unreachable. */
  leading?: React.ReactNode;
  /** Small line above the title, e.g. a greeting. */
  overline?: string;
  subtitle?: string;
};

/**
 * The read-only top band. Max two items, no primary action, no chevron
 * hamburger. Everything tappable here is a 56dp label, not an icon.
 */
export function AppHeader({ title, onBack, backLabel = 'मागे', leading, overline, subtitle }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.base, { paddingTop: insets.top + space.md }]}>
      {onBack ? (
        <PressableScale
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel={backLabel}
          accessibilityHint="मागील पानावर परत जाईल"
          style={styles.back}
        >
          <Icon name="chevronLeft" size={26} tint={color.primary} />
          <Text style={styles.backLabel}>{backLabel}</Text>
        </PressableScale>
      ) : null}

      <View style={styles.titleRow}>
        {leading ? <View style={styles.leading}>{leading}</View> : null}
        <View style={styles.titleBlock}>
          {overline ? <Text style={styles.overline}>{overline}</Text> : null}
          {title ? (
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
          ) : null}
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: layout.gutter,
    paddingBottom: space.sm,
    gap: space.sm,
    backgroundColor: color.paper,
  },
  back: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
    alignSelf: 'flex-start',
    marginLeft: -space.sm,
    paddingHorizontal: space.sm,
  },
  backLabel: {
    ...type.label,
    color: color.ink,
    textDecorationLine: 'underline',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.lg,
  },
  leading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBlock: {
    flex: 1,
    gap: 2,
  },
  overline: {
    ...type.fieldLabel,
    color: color.redInk,
  },
  title: {
    ...type.h1,
    color: color.ink,
  },
  subtitle: {
    ...type.body,
    color: color.inkSoft,
  },
});
