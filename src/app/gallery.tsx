import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DoctorBlock } from '@/components/domain/DoctorBlock';
import { FigurePlate } from '@/components/domain/FigurePlate';
import { HospitalCard } from '@/components/domain/HospitalCard';
import {
  Avatar,
  Banner,
  BigCard,
  BottomSheet,
  Button,
  Chip,
  EmptyState,
  ErrorState,
  Icon,
  Input,
  ListRow,
  SegmentedControl,
  Skeleton,
  SosButton,
  StatusPill,
  StepProgress,
  TextArea,
  VoiceHint,
} from '@/components/ui';
import { doctors } from '@/data/doctors';
import { hospitals } from '@/data/hospitals';
import { useT } from '@/i18n';
import { color, layout, space, type } from '@/theme';

const severity = [
  { value: 'mild', label: 'सौम्य' },
  { value: 'medium', label: 'मध्यम' },
  { value: 'severe', label: 'तीव्र' },
];

const routes: { label: string; path: '/' | '/hospitals' | '/sos' }[] = [
  { label: 'मदत', path: '/' },
  { label: 'रुग्णालये', path: '/hospitals' },
  { label: 'SOS', path: '/sos' },
];

export default function GalleryScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useT();

  const [chip, setChip] = useState('chest');
  const [severityValue, setSeverityValue] = useState('medium');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [name, setName] = useState('श्रीमती कुलकर्णी');
  const [note, setNote] = useState('');

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{
        paddingTop: insets.top + space.md,
        paddingBottom: insets.bottom + space.huge,
        paddingHorizontal: layout.gutter,
        gap: space.section,
      }}
    >
      <View style={styles.header}>
        <View style={styles.mastheadRow}>
          <Text style={styles.wordmark}>{t.app.name}</Text>
          <Text style={styles.mastheadMeta}>विकास</Text>
        </View>
        <View style={styles.thickRule} />

        <Text style={styles.title}>कंपोनेंट गॅलरी</Text>
        <Text style={styles.subtitle}>
          प्रत्येक घटक, प्रत्येक स्थितीत. फक्त विकासासाठी.
        </Text>

        <View style={styles.routeRow}>
          {routes.map((route) => (
            <PressableRoute
              key={route.path}
              label={route.label}
              onPress={() => router.push(route.path)}
            />
          ))}
        </View>
      </View>

      <Section n="01" title="बटणे" note="प्राथमिक 64dp, सामान्य 56dp">
        <Button label="पुढे जा" onPress={() => {}} />
        <Button label="रद्द करा" onPress={() => {}} variant="secondary" />
        <Button label="आवाज ऐकण्याची परवानगी द्या" onPress={() => {}} variant="ghost" />
        <Button label="कॉल करा" onPress={() => {}} variant="danger" icon="phone" />
        <Button label="मदत पाठवत आहोत" onPress={() => {}} loading />
        <Button label="आज उपलब्ध नाही" onPress={() => {}} disabled />
        <Button label="लहान बटण" onPress={() => {}} size="standard" fullWidth={false} />
      </Section>

      <Section n="02" title="आपत्कालीन" note="लाल रंग फक्त SOS साठी">
        <View style={styles.dock}>
          <View style={styles.dockPrimary}>
            <Button label="डॉक्टरांशी बोला" onPress={() => {}} />
          </View>
          <View style={styles.dockSos}>
            <SosButton onPress={() => router.push('/sos')} />
          </View>
        </View>
      </Section>

      <Section n="03" title="मोठे कार्ड" note="संपूर्ण कार्ड दाबता येते">
        <BigCard
          title="डॉ. सुनील पाटील"
          subtitle="हृदयरोग तज्ज्ञ"
          meta="आज 4:30 उपलब्ध"
          leading={<Avatar name="डॉ. सुनील पाटील" />}
          onPress={() => {}}
          accessibilityLabel="डॉ. सुनील पाटील, हृदयरोग तज्ज्ञ, आज 4:30 उपलब्ध"
          accessibilityHint="डॉक्टरांची माहिती उघडेल"
        />
        <BigCard
          title="छातीत दुखतंय"
          subtitle="छातीत जडपणा किंवा दाब जाणवणे"
          leading={<Icon name="alert" size={30} tint={color.warning} />}
          onPress={() => {}}
          selected
        />
      </Section>

      <Section n="04" title="डॉक्टर ओळख" note="नाव, स्टॅम्प, तीन रकाने">
        <DoctorBlock doctor={doctors[0]} />
      </Section>

      <Section n="05" title="आकृती फलक" note="एक रेखाचित्र, मथळ्यासह">
        <View style={styles.plateRow}>
          <FigurePlate figure="chest" width={92} label={t.home.figureLabel} caption={t.home.figureCaption} />
          <FigurePlate figure="help" width={92} label="आकृती 2" caption="मदत कशी घ्यावी" />
          <FigurePlate figure="hospital" width={92} label="आकृती 3" caption="जवळचे रुग्णालय" />
        </View>
      </Section>

      <Section n="06" title="रुग्णालय कार्ड">
        <HospitalCard
          hospital={hospitals[0]}
          onCall={() => {}}
          onDirections={() => {}}
        />
      </Section>

      <Section n="07" title="यादी रांग">
        <ListRow
          title="डॉ. अनिता देशमुख"
          subtitle="स्त्रीरोग तज्ज्ञ, कोथरूड"
          trailingText="3.1 किमी"
          leading={<Avatar name="डॉ. अनिता देशमुख" size={44} />}
          onPress={() => {}}
        />
        <ListRow
          title="दीनानाथ मंगेशकर रुग्णालय"
          subtitle="कर्वेनगर, 24x7 आपत्कालीन"
          leading={<Icon name="pin" size={26} tint={color.inkSoft} />}
          onPress={() => {}}
        />
      </Section>

      <Section n="08" title="चिप्स" note="निवडलेली स्थिती स्पष्ट दिसते">
        <View style={styles.wrap}>
          <Chip label="छातीत दुखतंय" selected={chip === 'chest'} onPress={() => setChip('chest')} />
          <Chip label="धाप लागते" selected={chip === 'breath'} onPress={() => setChip('breath')} />
          <Chip label="डोकं दुखतंय" selected={chip === 'head'} onPress={() => setChip('head')} />
          <Chip label="कळत नाही" selected={chip === 'unsure'} onPress={() => setChip('unsure')} />
        </View>
      </Section>

      <Section n="09" title="स्थिती छाप">
        <View style={styles.wrap}>
          <StatusPill label="सत्यापित" tone="success" />
          <StatusPill label="आज उपलब्ध" tone="primary" />
          <StatusPill label="उद्या" tone="neutral" />
          <StatusPill label="24x7" tone="warning" />
          <StatusPill label="बंद" tone="emergency" />
        </View>
      </Section>

      <Section n="10" title="अवतार">
        <View style={styles.avatarRow}>
          <Avatar name="सुनील पाटील" size={88} />
          <Avatar name="अनिता देशमुख" size={72} />
          <Avatar name="राहुल जोशी" size={56} />
          <Avatar name="माधुरी कुलकर्णी" size={44} />
        </View>
      </Section>

      <Section n="11" title="मजकूर रकाने" note="प्रत्येक रकान्यात बोलून भरण्याचा पर्याय">
        <Input
          label="रुग्णाचे नाव"
          value={name}
          onChangeText={setName}
          helper="जसे आधार कार्डावर आहे"
          onVoice={() => {}}
        />
        <Input
          label="मोबाईल क्रमांक"
          value=""
          onChangeText={() => {}}
          keyboardType="phone-pad"
          error="क्रमांक 10 अंकांचा हवा. पुन्हा टाइप करा किंवा बोलून सांगा."
          onVoice={() => {}}
        />
        <TextArea
          label="डॉक्टरांसाठी नोंद"
          value={note}
          onChangeText={setNote}
          optional
          placeholder="लक्षणे, औषधे, तपासण्या"
          onVoice={() => {}}
        />
        <VoiceHint label="नोंद" onPress={() => {}} />
      </Section>

      <Section n="12" title="विभाग निवड" note="स्लायडरऐवजी तीन मोठे पर्याय">
        <SegmentedControl
          options={severity}
          value={severityValue}
          onChange={setSeverityValue}
          accessibilityLabel="तीव्रता"
        />
      </Section>

      <Section n="13" title="प्रगती" note="चार टप्पे, स्पिनर नाही">
        <StepProgress total={4} current={1} />
        <StepProgress total={4} current={2} />
        <StepProgress total={4} current={4} />
      </Section>

      <Section n="14" title="तळाची शीट">
        <Button label="शीट उघडा" onPress={() => setSheetOpen(true)} variant="secondary" />
      </Section>

      <Section n="15" title="सूचना पट्ट्या">
        <Banner tone="info" title="स्थान का हवं?" body="जवळचं रुग्णालय शोधण्यासाठी. आम्ही स्थान साठवत नाही." />
        <Banner tone="success" title="अपॉइंटमेंट झाली" body="आज 4:30, डॉ. पाटील." />
        <Banner tone="warning" title="क्रमांक 10 अंकांचा हवा" />
        <Banner
          tone="offline"
          title="इंटरनेट नाही"
          body="जुनी माहिती दाखवत आहोत."
          actionLabel="पुन्हा प्रयत्न"
          onAction={() => {}}
        />
      </Section>

      <Section n="16" title="लोडिंग">
        <View style={styles.skeletonCard}>
          <Skeleton width={56} height={56} radius={28} />
          <View style={styles.skeletonLines}>
            <Skeleton width="70%" height={22} />
            <Skeleton width="45%" height={18} />
          </View>
        </View>
        <Skeleton width="100%" height={56} />
      </Section>

      <Section n="17" title="रिकामी स्थिती">
        <EmptyState
          title="जवळ डॉक्टर सापडले नाहीत"
          body="अंतर वाढवून पुन्हा शोधा."
          actionLabel="अंतर वाढवा"
          onAction={() => {}}
        />
      </Section>

      <Section n="18" title="त्रुटी स्थिती">
        <ErrorState
          title="माहिती मिळाली नाही"
          body="इंटरनेट तपासा आणि पुन्हा प्रयत्न करा."
          retryLabel="पुन्हा प्रयत्न"
          onRetry={() => {}}
          secondaryLabel="108 वर कॉल करा"
          onSecondary={() => {}}
        />
      </Section>

      <BottomSheet visible={sheetOpen} onClose={() => setSheetOpen(false)} title="डॉक्टरांची वेळा">
        <Text style={styles.sheetText}>आज, 14 नोव्हेंबर</Text>
        <View style={styles.wrap}>
          <Chip label="4:30" />
          <Chip label="5:00" selected />
          <Chip label="5:30" />
        </View>
        <Button label="अपॉइंटमेंट बुक करा" onPress={() => setSheetOpen(false)} />
      </BottomSheet>
    </ScrollView>
  );
}

function PressableRoute({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Text
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={styles.routeLabel}
    >
      {label}
    </Text>
  );
}

function Section({
  n,
  title,
  note,
  children,
}: {
  n: string;
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHead}>
        <Text style={styles.sectionNumber}>{n}</Text>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <View style={styles.sectionRule} />
      {note ? <Text style={styles.sectionNote}>{note}</Text> : null}
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: color.paper,
  },
  header: {
    gap: space.sm,
  },
  mastheadRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingBottom: space.sm,
  },
  wordmark: {
    fontFamily: 'NotoSansDevanagari_600SemiBold',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 2.2,
    color: color.ink,
  },
  mastheadMeta: {
    ...type.fieldLabel,
    color: color.redInk,
  },
  thickRule: {
    height: 3,
    backgroundColor: color.ruleStrong,
  },
  title: {
    ...type.h1,
    color: color.ink,
    marginTop: space.md,
  },
  subtitle: {
    ...type.caption,
    color: color.inkSoft,
  },
  routeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.lg,
    marginTop: space.sm,
    paddingTop: space.sm,
    borderTopWidth: 1,
    borderTopColor: color.rule,
  },
  routeLabel: {
    ...type.label,
    color: color.redInk,
    textDecorationLine: 'underline',
    paddingVertical: space.sm,
    minWidth: 56,
  },
  section: {
    gap: space.sm,
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: space.sm,
  },
  sectionNumber: {
    fontFamily: 'NotoSerifDevanagari_600SemiBold',
    fontSize: 13,
    lineHeight: 20,
    color: color.redInk,
  },
  sectionTitle: {
    ...type.h3,
    color: color.ink,
  },
  sectionRule: {
    height: 1.5,
    backgroundColor: color.ink,
  },
  sectionNote: {
    ...type.caption,
    color: color.inkSoft,
  },
  sectionBody: {
    gap: space.md,
    marginTop: space.sm,
  },
  dock: {
    flexDirection: 'row',
    gap: space.md,
    padding: space.md,
    backgroundColor: color.paperDeep,
    borderTopWidth: 2,
    borderTopColor: color.ink,
  },
  dockPrimary: {
    flex: 1,
  },
  dockSos: {
    width: '34%',
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.md,
  },
  plateRow: {
    flexDirection: 'row',
    gap: space.lg,
  },
  avatarRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: space.lg,
  },
  skeletonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.lg,
    borderWidth: 1.5,
    borderColor: color.ink,
    padding: space.lg,
  },
  skeletonLines: {
    flex: 1,
    gap: space.sm,
  },
  sheetText: {
    ...type.body,
    color: color.inkSoft,
  },
});
