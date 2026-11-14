import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActionDock } from '@/components/ActionDock';
import { AppHeader } from '@/components/AppHeader';
import { HospitalCard } from '@/components/domain/HospitalCard';
import { Button, Icon } from '@/components/ui';
import { hospitals } from '@/data/hospitals';
import { useT } from '@/i18n';
import { color, layout, space, type } from '@/theme';

/** Nearest first, as the list itself says. */
const sorted = [...hospitals].sort((a, b) => a.distanceKm - b.distanceKm);

export default function HospitalsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useT();

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: insets.bottom + space.section }}
        showsVerticalScrollIndicator={false}
      >
        <AppHeader
          onBack={() => (router.canGoBack() ? router.back() : router.replace('/'))}
          title={t.hospitals.title}
        />

        <View style={styles.body}>
          <View style={styles.note}>
            <Icon name="pin" size={20} tint={color.inkSoft} />
            <Text style={styles.noteText}>{t.hospitals.locationNote}</Text>
          </View>

          <View style={styles.list}>
            {sorted.map((hospital) => (
              <HospitalCard
                key={hospital.id}
                hospital={hospital}
                onCall={() => {}}
                onDirections={() => {}}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <ActionDock onSos={() => {}} hideSos>
        <Button
          label={t.sos.call108}
          variant="danger"
          icon="phone"
          onPress={() => {}}
          accessibilityHint="आपत्कालीन सेवेशी कॉल जोडला जाईल"
        />
      </ActionDock>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: color.bg,
  },
  scroll: {
    flex: 1,
  },
  body: {
    paddingHorizontal: layout.gutter,
    gap: space.md,
  },
  note: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
  },
  noteText: {
    ...type.caption,
    color: color.inkSoft,
  },
  list: {
    gap: space.md,
  },
  rule: {
    height: 1,
    backgroundColor: color.rule,
  },
});
