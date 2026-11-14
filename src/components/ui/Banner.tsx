import { StyleSheet, Text, View } from 'react-native';

import { Icon, type IconName } from './Icon';
import { PressableScale } from './press';
import { color, radius, space, type } from '@/theme';

export type BannerTone = 'info' | 'success' | 'warning' | 'offline';

type Props = {
  tone?: BannerTone;
  title: string;
  body?: string;
  actionLabel?: string;
  onAction?: () => void;
};

/**
 * A printed notice ruled into the page, never a pastel alert card: ink rules
 * top and bottom, a small filled square carrying the tone, and the words in
 * ink so nothing is ever amber-on-amber.
 */
const tones: Record<BannerTone, { mark: string; icon: IconName }> = {
  info: { mark: color.ink, icon: 'info' },
  success: { mark: color.success, icon: 'check' },
  warning: { mark: color.warning, icon: 'alert' },
  offline: { mark: color.warning, icon: 'wifiOff' },
};

export function Banner({ tone = 'info', title, body, actionLabel, onAction }: Props) {
  const t = tones[tone];

  return (
    <View style={styles.band}>
      <View style={styles.row}>
        <View style={[styles.mark, { backgroundColor: t.mark }]} />

        <View style={styles.body}>
          <Text style={styles.title}>{title}</Text>
          {body ? <Text style={styles.text}>{body}</Text> : null}

          {actionLabel && onAction ? (
            <PressableScale
              onPress={onAction}
              accessibilityRole="button"
              accessibilityLabel={actionLabel}
              style={styles.action}
            >
              <Text style={styles.actionLabel}>{actionLabel}</Text>
              <Icon name="chevronRight" size={22} tint={color.redInk} />
            </PressableScale>
          ) : null}
        </View>

        <View style={styles.icon}>
          <Icon name={t.icon} size={24} tint={color.inkSoft} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  band: {
    backgroundColor: color.paperRaised,
    borderRadius: radius.card,
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: color.ink,
    paddingVertical: space.md,
    paddingHorizontal: space.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: space.md,
  },
  mark: {
    width: 10,
    height: 10,
    marginTop: 8,
  },
  body: {
    flex: 1,
    gap: 2,
  },
  icon: {
    paddingTop: 2,
  },
  title: {
    ...type.bodyStrong,
    color: color.ink,
  },
  text: {
    ...type.caption,
    color: color.inkSoft,
  },
  action: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
    alignSelf: 'flex-start',
    marginTop: space.xs,
  },
  actionLabel: {
    ...type.label,
    color: color.redInk,
    textDecorationLine: 'underline',
  },
});
