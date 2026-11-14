import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActionDock } from '@/components/ActionDock';
import { DoctorBlock } from '@/components/domain/DoctorBlock';
import { FigurePlate } from '@/components/domain/FigurePlate';
import { Masthead } from '@/components/domain/Masthead';
import { VoiceSheet } from '@/components/domain/VoiceSheet';
import { Button, Icon } from '@/components/ui';
import { PressableScale } from '@/components/ui/press';
import { doctors } from '@/data/doctors';
import { symptoms } from '@/data/symptoms';
import { useT } from '@/i18n';
import { color, layout, space, type } from '@/theme';

const PATIENT_NAME = 'माधुरी कुलकर्णी';
const registerSymptoms = symptoms.slice(0, 4);

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useT();

  const [voiceOpen, setVoiceOpen] = useState(false);
  const [seeded, setSeeded] = useState<string | undefined>(undefined);

  const doctor = doctors[0];

  function openVoice(symptom?: string) {
    setSeeded(symptom);
    setVoiceOpen(true);
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: insets.bottom + space.xl }}
        showsVerticalScrollIndicator={false}
      >
        <Masthead name={PATIENT_NAME} />

        <View style={styles.body}>
          <View style={styles.askRow}>
            <View style={styles.askCopy}>
              <Text style={styles.ask}>{t.home.askProblem}</Text>
              <Text style={styles.askSub}>{t.home.subtitle}</Text>
            </View>
            <FigurePlate
              width={96}
              label={t.home.figureLabel}
              caption={t.home.figureCaption}
              accessibilityLabel={`${t.home.figureLabel}. ${t.home.figureCaption}`}
            />
          </View>

          <View style={styles.register}>
            {registerSymptoms.map((symptom, index) => (
              <PressableScale
                key={symptom.id}
                onPress={() => openVoice(symptom.label)}
                accessibilityRole="button"
                accessibilityLabel={`${index + 1}. ${symptom.label}`}
                accessibilityHint={symptom.gloss}
                style={[
                  styles.cell,
                  index % 2 === 1 ? styles.cellRight : null,
                  index >= registerSymptoms.length - 2 ? styles.cellLastRow : null,
                ]}
              >
                <Text style={styles.cellNumber}>{index + 1}</Text>
                <Text style={styles.cellLabel} numberOfLines={2}>
                  {symptom.label}
                </Text>
              </PressableScale>
            ))}
          </View>

          <View style={styles.doctorBlock}>
            <DoctorBlock doctor={doctor} />
          </View>

          <PressableScale
            onPress={() => router.push('/hospitals')}
            accessibilityRole="button"
            accessibilityLabel={t.hospitals.title}
            accessibilityHint={t.home.hospitalsHint}
            style={styles.hospitalRow}
          >
            <Icon name="pin" size={22} tint={color.ink} />
            <View style={styles.hospitalCopy}>
              <Text style={styles.hospitalTitle}>{t.hospitals.title}</Text>
              <Text style={styles.hospitalMeta}>{t.home.hospitalsHint}</Text>
            </View>
            <Text style={styles.hospitalCount}>{t.home.hospitalsCount}</Text>
            <Icon name="chevronRight" size={22} tint={color.ink} />
          </PressableScale>

          <View style={styles.footnote}>
            <Text style={styles.footnoteText}>
              <Text style={styles.footnoteStrong}>{t.disclaimer.title}</Text> {t.disclaimer.body}
            </Text>
          </View>
        </View>
      </ScrollView>

      <ActionDock onSos={() => router.push('/sos')}>
        <Button label={t.home.speak} icon="mic" onPress={() => openVoice()} />
      </ActionDock>

      <VoiceSheet
        visible={voiceOpen}
        initial={seeded}
        onClose={() => setVoiceOpen(false)}
        onDone={() => {
          setVoiceOpen(false);
          router.push('/hospitals');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: color.paper,
  },
  scroll: {
    flex: 1,
  },
  body: {
    paddingHorizontal: layout.gutter,
    paddingTop: space.md,
  },
  askRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: space.md,
  },
  askCopy: {
    flex: 1,
    paddingTop: 2,
  },
  ask: {
    ...type.h1,
    fontSize: 30,
    lineHeight: 44,
    color: color.ink,
  },
  askSub: {
    ...type.caption,
    fontSize: 15,
    lineHeight: 24,
    color: color.inkSoft,
    marginTop: 2,
  },
  register: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: 1.5,
    borderTopColor: color.ink,
    marginTop: space.lg,
  },
  cell: {
    width: '50%',
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    paddingVertical: space.sm,
    paddingRight: space.sm,
    borderBottomWidth: 1,
    borderBottomColor: color.rule,
  },
  cellRight: {
    borderLeftWidth: 1,
    borderLeftColor: color.rule,
    paddingLeft: space.md,
  },
  cellLastRow: {
    borderBottomWidth: 1.5,
    borderBottomColor: color.ink,
  },
  cellNumber: {
    fontFamily: 'NotoSerifDevanagari_600SemiBold',
    fontSize: 14,
    lineHeight: 20,
    color: color.redInk,
    minWidth: 12,
  },
  cellLabel: {
    flex: 1,
    fontFamily: 'NotoSerifDevanagari_600SemiBold',
    fontSize: 16.5,
    lineHeight: 24,
    color: color.ink,
  },
  doctorBlock: {
    marginTop: space.lg,
  },
  hospitalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    minHeight: 56,
    marginTop: space.md,
    paddingVertical: space.sm,
    borderBottomWidth: 1,
    borderBottomColor: color.rule,
  },
  hospitalCopy: {
    flex: 1,
    gap: 1,
  },
  hospitalTitle: {
    fontFamily: 'NotoSerifDevanagari_600SemiBold',
    fontSize: 17,
    lineHeight: 24,
    color: color.ink,
  },
  hospitalMeta: {
    ...type.caption,
    fontSize: 13,
    lineHeight: 18,
    color: color.inkSoft,
  },
  hospitalCount: {
    ...type.fieldLabel,
    fontSize: 12,
    color: color.inkSoft,
  },
  footnote: {
    marginTop: space.lg,
    paddingTop: space.sm,
    borderTopWidth: 1,
    borderTopColor: color.rule,
  },
  footnoteText: {
    ...type.caption,
    fontSize: 14,
    lineHeight: 22,
    color: color.inkSoft,
  },
  footnoteStrong: {
    fontFamily: 'NotoSansDevanagari_600SemiBold',
    color: color.ink,
  },
});
