import { StyleSheet, Text, View } from 'react-native';

import { PressableScale } from '@/components/ui/press';
import type { Doctor } from '@/data/doctors';
import { useT } from '@/i18n';
import { color, space, type } from '@/theme';

type Props = {
  doctor: Doctor;
  onPress?: () => void;
  accessibilityHint?: string;
};

/**
 * The doctor as the almanac prints it: a ruled block with the name, the
 * speciality, a red stamp for today's slot, and three labelled cells —
 * time, distance, clinic. Whole block pressable, never a card inside a card.
 */
export function DoctorBlock({ doctor, onPress, accessibilityHint }: Props) {
  const { t } = useT();
  const slot = doctor.nextSlot ?? t.common.notAvailable;

  const content = (
    <>
      <View style={styles.head}>
        <View style={styles.identity}>
          <Text style={styles.label}>{t.home.yourDoctor}</Text>
          <Text style={styles.name} numberOfLines={2}>
            {doctor.name}
          </Text>
          <Text style={styles.specialty} numberOfLines={1}>
            {`${doctor.specialty} · ${doctor.area}`}
          </Text>
        </View>

        {doctor.nextSlot ? (
          <View style={styles.stamp}>
            <Text style={styles.stampKicker}>{t.home.todayStamp}</Text>
            <Text style={styles.stampTime} numberOfLines={1}>
              {doctor.nextSlot.replace(`${t.home.todayStamp} `, '')}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.cells}>
        <View style={styles.cell}>
          <Text style={styles.cellLabel}>{t.home.distanceLabel}</Text>
          <Text style={styles.cellValue} numberOfLines={1}>
            {`${doctor.distanceKm} ${t.common.km}`}
          </Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.cellLabel}>{t.home.clinicLabel}</Text>
          <Text style={styles.cellValue} numberOfLines={1}>
            {doctor.area}
          </Text>
        </View>
        <View style={[styles.cell, styles.cellLast]}>
          <Text style={styles.cellLabel}>{t.doctor.filters.language}</Text>
          <Text style={styles.cellValue} numberOfLines={1}>
            {doctor.languages[0]}
          </Text>
        </View>
      </View>
    </>
  );

  if (!onPress) return <View style={styles.block}>{content}</View>;

  return (
    <PressableScale
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${doctor.name}, ${doctor.specialty}, ${slot}`}
      accessibilityHint={accessibilityHint}
      style={styles.block}
    >
      {content}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  block: {
    borderWidth: 1.5,
    borderColor: color.ink,
    backgroundColor: color.paperRaised,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: space.md,
    paddingHorizontal: space.lg - 2,
    paddingTop: space.md,
    paddingBottom: space.sm,
  },
  identity: {
    flex: 1,
    gap: 1,
  },
  label: {
    ...type.fieldLabel,
    color: color.redInk,
    paddingBottom: 2,
  },
  name: {
    ...type.h3,
    fontFamily: 'NotoSerifDevanagari_700Bold',
    fontSize: 21,
    lineHeight: 29,
    color: color.ink,
  },
  specialty: {
    ...type.caption,
    fontSize: 14,
    lineHeight: 21,
    color: color.inkSoft,
  },
  stamp: {
    borderWidth: 1.5,
    borderColor: color.red,
    paddingHorizontal: 7,
    paddingVertical: 4,
    alignItems: 'center',
    transform: [{ rotate: '-1.5deg' }],
    marginTop: 2,
  },
  stampKicker: {
    fontFamily: 'NotoSansDevanagari_600SemiBold',
    fontSize: 10,
    lineHeight: 13,
    letterSpacing: 1.2,
    color: color.redInk,
  },
  stampTime: {
    fontFamily: 'NotoSerifDevanagari_700Bold',
    fontSize: 17,
    lineHeight: 21,
    color: color.redInk,
  },
  cells: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: color.ink,
  },
  cell: {
    flex: 1,
    paddingHorizontal: space.lg - 4,
    paddingTop: 6,
    paddingBottom: space.sm,
    borderRightWidth: 1,
    borderRightColor: color.rule,
    gap: 1,
  },
  cellLast: {
    borderRightWidth: 0,
  },
  cellLabel: {
    ...type.fieldLabel,
    fontSize: 11,
    lineHeight: 15,
    letterSpacing: 0.8,
    color: color.inkSoft,
  },
  cellValue: {
    fontFamily: 'NotoSerifDevanagari_600SemiBold',
    fontSize: 16,
    lineHeight: 23,
    color: color.ink,
  },
});
