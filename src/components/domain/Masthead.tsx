import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useT } from '@/i18n';
import { color, layout, space, type } from '@/theme';

type Props = {
  name: string;
  /** Overrides "today" for deterministic screenshots. */
  date?: Date;
};

/**
 * The page's masthead: the wordmark, the patient it belongs to, and today's
 * date set the way an almanac sets it — the numeral first, the month beside
 * it, closed by the almanac's red rule and a hairline.
 */
export function Masthead({ name, date }: Props) {
  const insets = useSafeAreaInsets();
  const { t } = useT();

  const today = date ?? new Date();
  const day = today.getDate();
  const month = t.calendar.months[today.getMonth()];
  const weekday = t.calendar.weekdays[today.getDay()];
  const year = today.getFullYear();
  const shortName = name.split(/\s+/)[0] ?? name;

  return (
    <View style={[styles.base, { paddingTop: insets.top + space.sm }]}>
      <View style={styles.topRow}>
        <Text style={styles.wordmark} numberOfLines={1}>
          {t.app.name}
        </Text>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
      </View>

      <View style={styles.thickRule} />

      <View style={styles.dateRow}>
        <Text style={styles.day} numberOfLines={1} allowFontScaling={false}>
          {day}
        </Text>
        <View style={styles.monthBlock}>
          <Text style={styles.month} numberOfLines={1}>
            {month}
          </Text>
          <Text style={styles.weekday} numberOfLines={1}>
            {`${weekday} · ${year}`}
          </Text>
        </View>
      </View>

      <View style={styles.hairline} />

      <Text style={styles.greeting} numberOfLines={1}>
        {`${t.home.greeting}, `}
        <Text style={styles.greetingName}>{shortName}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: layout.gutter,
    paddingBottom: space.sm,
    backgroundColor: color.paper,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: space.md,
    paddingBottom: space.sm,
  },
  wordmark: {
    fontFamily: type.fieldLabel.fontFamily,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 2.2,
    color: color.ink,
  },
  name: {
    fontFamily: 'NotoSerifDevanagari_400Regular',
    fontSize: 14,
    lineHeight: 20,
    color: color.inkSoft,
  },
  thickRule: {
    height: 3,
    backgroundColor: color.ruleStrong,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: space.md,
    paddingTop: space.sm,
  },
  day: {
    fontFamily: 'NotoSerifDevanagari_700Bold',
    fontSize: 68,
    lineHeight: 62,
    letterSpacing: -1.5,
    color: color.ink,
  },
  monthBlock: {
    paddingBottom: 6,
    gap: 1,
  },
  month: {
    fontFamily: 'NotoSerifDevanagari_600SemiBold',
    fontSize: 20,
    lineHeight: 28,
    color: color.ink,
  },
  weekday: {
    fontFamily: 'NotoSansDevanagari_500Medium',
    fontSize: 12.5,
    lineHeight: 18,
    letterSpacing: 0.6,
    color: color.inkSoft,
  },
  hairline: {
    height: 1,
    backgroundColor: color.ink,
    opacity: 0.55,
    marginTop: space.sm,
  },
  greeting: {
    fontFamily: 'NotoSansDevanagari_400Regular',
    fontSize: 13.5,
    lineHeight: 20,
    color: color.inkSoft,
    paddingTop: 6,
    letterSpacing: 0.3,
  },
  greetingName: {
    fontFamily: 'NotoSerifDevanagari_600SemiBold',
    fontSize: 15,
    color: color.ink,
  },
});
