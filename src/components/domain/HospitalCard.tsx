import { StyleSheet, Text, View } from 'react-native';

import { Button, Icon, StatusPill } from '@/components/ui';
import type { Hospital } from '@/data/hospitals';
import { useT } from '@/i18n';
import { color, radius, space, type } from '@/theme';

type Props = {
  hospital: Hospital;
  onCall: () => void;
  onDirections: () => void;
  /** Compact drops the area line, for the SOS result list. */
  compact?: boolean;
};

/**
 * A hospital you might be driven to in the next ten minutes. Name first,
 * then how far, then the two things you can do about it — in that order.
 * The card itself is not a target; only the two 56dp buttons are.
 */
export function HospitalCard({ hospital, onCall, onDirections, compact = false }: Props) {
  const { t } = useT();

  return (
    <View style={styles.card}>
      <View style={styles.head}>
        <View style={styles.headText}>
          <Text style={styles.name} numberOfLines={2}>
            {hospital.name}
          </Text>
          {compact ? null : <Text style={styles.area}>{hospital.area}</Text>}
        </View>
        {hospital.emergency24x7 ? <StatusPill label={t.hospitals.emergency247} tone="warning" /> : null}
      </View>

      <View style={styles.meta}>
        <Icon name="pin" size={20} tint={color.inkSoft} />
        <Text style={styles.metaText}>
          {hospital.distanceKm} {t.common.km}, {hospital.etaMin} {t.common.min}
        </Text>
      </View>

      <View style={styles.actions}>
        <View style={styles.action}>
          <Button
            label={t.hospitals.call}
            icon="phone"
            size="standard"
            onPress={onCall}
            accessibilityHint={`${hospital.name} वर कॉल सुरू होईल`}
          />
        </View>
        <View style={styles.action}>
          <Button
            label={t.hospitals.directions}
            icon="pin"
            variant="secondary"
            size="standard"
            onPress={onDirections}
            accessibilityHint={`${hospital.name} चा नकाशा उघडेल`}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.paperRaised,
    borderRadius: radius.card,
    borderWidth: 1.5,
    borderColor: color.ink,
    padding: space.lg,
    gap: space.sm,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: space.md,
  },
  headText: {
    flex: 1,
    gap: 2,
  },
  name: {
    ...type.h3,
    fontFamily: 'NotoSerifDevanagari_700Bold',
    fontSize: 20,
    lineHeight: 28,
    color: color.ink,
  },
  area: {
    ...type.caption,
    fontSize: 14,
    lineHeight: 21,
    color: color.inkSoft,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
  },
  metaText: {
    ...type.numeric,
    fontSize: 17,
    lineHeight: 25,
    color: color.inkSoft,
  },
  actions: {
    flexDirection: 'row',
    gap: space.md,
  },
  action: {
    flex: 1,
  },
});
