import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActionDock } from '@/components/ActionDock';
import { HospitalCard } from '@/components/domain/HospitalCard';
import { Button, Icon } from '@/components/ui';
import { hospitals } from '@/data/hospitals';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useT } from '@/i18n';
import { color, layout, radius, space, type } from '@/theme';

type Phase = 'countdown' | 'sending' | 'ready';

const COUNTDOWN_FROM = 5;
const nearest = [...hospitals].sort((a, b) => a.distanceKm - b.distanceKm).slice(0, 3);

/**
 * The emergency path. Nothing here asks for a login, a form or a second
 * confirmation: tap SOS, five seconds to change your mind, then the nearest
 * hospitals and the 108 call are already on screen.
 */
export default function SosScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useT();
  const reduceMotion = useReducedMotion();

  const [phase, setPhase] = useState<Phase>('countdown');
  const [seconds, setSeconds] = useState(COUNTDOWN_FROM);
  const [pulse] = useState(() => new Animated.Value(1));
  const announced = useRef(COUNTDOWN_FROM);

  // One tick per second. Haptics so a user looking away still knows it is live.
  useEffect(() => {
    if (phase !== 'countdown') return;
    const tick = setTimeout(() => {
      Haptics.selectionAsync().catch(() => {});
      if (seconds <= 1) setPhase('sending');
      else setSeconds(seconds - 1);
    }, 1000);
    return () => clearTimeout(tick);
  }, [phase, seconds]);

  // Announce once per second for screen readers, without spamming.
  useEffect(() => {
    if (phase !== 'countdown' || seconds === announced.current) return;
    announced.current = seconds;
    if (seconds > 0) AccessibilityInfo.announceForAccessibility(`${seconds}`);
  }, [phase, seconds]);

  useEffect(() => {
    if (phase !== 'sending') return;
    const finish = setTimeout(() => setPhase('ready'), 1400);
    return () => clearTimeout(finish);
  }, [phase]);

  // One slow breath on the ring. Never a strobe.
  useEffect(() => {
    if (phase !== 'countdown' || reduceMotion) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 0.92,
          duration: 1200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [phase, reduceMotion, pulse]);

  function cancel() {
    if (router.canGoBack()) router.back();
    else router.replace('/');
  }

  if (phase === 'ready') {
    return (
      <View style={styles.screen}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{ paddingBottom: insets.bottom + space.section }}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.topBar, { paddingTop: insets.top + space.sm }]}>
            <Text style={styles.wordmark}>{t.app.name}</Text>
            <Text style={styles.topMeta}>{t.home.sosLabel}</Text>
          </View>
          <View style={styles.thickRule} />

          <View style={styles.header}>
            <View style={styles.sentMark}>
              <Icon name="check" size={28} tint={color.success} />
            </View>
            <Text style={styles.sentTitle}>{t.sos.sent}</Text>
            <Text style={styles.sentBody}>{t.sos.sentBody}</Text>
          </View>

          <View style={styles.list}>
            <View style={styles.listHead}>
              <Text style={styles.listTitle}>{t.sos.nearestHospitals}</Text>
              <Text style={styles.listRule}>{t.sos.sortRule}</Text>
            </View>
            {nearest.map((hospital) => (
              <HospitalCard
                key={hospital.id}
                hospital={hospital}
                compact
                onCall={() => {}}
                onDirections={() => {}}
              />
            ))}
          </View>
        </ScrollView>

        <ActionDock onSos={() => {}} hideSos>
          <Button
            label={t.sos.call108}
            variant="emergency"
            icon="phone"
            onPress={() => {}}
            accessibilityHint="आपत्कालीन सेवेशी कॉल जोडला जाईल"
          />
        </ActionDock>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={[styles.topBar, { paddingTop: insets.top + space.sm }]}>
        <Text style={styles.wordmark}>{t.app.name}</Text>
        <Text style={styles.topMeta}>{t.home.sosLabel}</Text>
      </View>
      <View style={styles.thickRule} />

      <View style={styles.centered}>
        {phase === 'countdown' ? (
          <>
            <Animated.View style={[styles.ring, { transform: [{ scale: pulse }] }]}>
              <Text
                style={styles.count}
                accessibilityLabel={`${t.sos.countdownAria}: ${seconds}`}
                accessibilityLiveRegion="polite"
              >
                {seconds}
              </Text>
              <Text style={styles.ringMark}>{t.home.sos}</Text>
            </Animated.View>

            <Text style={styles.title}>{t.sos.countdownTitle}</Text>
            <Text style={styles.body}>{t.sos.countdownBody}</Text>
          </>
        ) : (
          <>
            <View style={styles.sending}>
              <View style={[styles.ring, styles.ringStatic]}>
                <Icon name="phone" size={64} tint={color.redInk} strokeWidth={1.8} />
              </View>
            </View>
            <Text style={styles.title}>{t.sos.title}</Text>
            <Text style={styles.body}>{t.sos.findingLocation}</Text>
          </>
        )}
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + space.lg }]}>
        <Pressable
          onPress={cancel}
          accessibilityRole="button"
          accessibilityLabel={t.sos.cancel}
          accessibilityHint="मदत थांबेल आणि मागील पानावर परतीस जाईल"
          style={({ pressed }) => [styles.cancel, pressed ? styles.cancelPressed : null]}
        >
          <Icon name="close" size={26} tint={color.ink} />
          <Text style={styles.cancelLabel}>{t.sos.cancel}</Text>
        </Pressable>
      </View>
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: layout.gutter,
    paddingBottom: space.sm,
  },
  wordmark: {
    fontFamily: 'NotoSansDevanagari_600SemiBold',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 2.2,
    color: color.ink,
  },
  topMeta: {
    ...type.fieldLabel,
    color: color.redInk,
  },
  thickRule: {
    height: 3,
    backgroundColor: color.ink,
    marginHorizontal: layout.gutter,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: layout.gutter,
    gap: space.lg,
  },
  ringMark: {
    fontFamily: 'NotoSansDevanagari_700Bold',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 3,
    color: color.redInk,
    marginTop: -6,
  },
  ring: {
    width: 208,
    height: 208,
    borderRadius: 104,
    borderWidth: 2.5,
    borderColor: color.red,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: space.xl,
  },
  ringStatic: {
    borderColor: 'rgba(163, 35, 26, 0.5)',
  },
  count: {
    fontFamily: 'NotoSerifDevanagari_700Bold',
    fontSize: 92,
    lineHeight: 104,
    color: color.redInk,
  },
  sending: {
    marginVertical: space.xl,
  },
  title: {
    ...type.h2,
    color: color.ink,
    textAlign: 'center',
  },
  body: {
    ...type.body,
    color: color.inkSoft,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: layout.gutter,
    paddingTop: space.md,
  },
  cancel: {
    minHeight: 64,
    borderRadius: radius.card,
    borderWidth: 1.5,
    borderColor: color.ink,
    backgroundColor: color.paperRaised,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.sm,
  },
  cancelPressed: {
    backgroundColor: color.paperDeep,
  },
  cancelLabel: {
    ...type.label,
    color: color.ink,
  },
  header: {
    paddingHorizontal: layout.gutter,
    paddingTop: space.xl,
    gap: space.sm,
  },
  sentMark: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: color.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sentTitle: {
    ...type.h1,
    color: color.ink,
  },
  sentBody: {
    ...type.body,
    color: color.inkSoft,
  },
  list: {
    paddingHorizontal: layout.gutter,
    paddingTop: space.section,
    gap: space.md,
  },
  listHead: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: space.md,
  },
  listTitle: {
    ...type.h3,
    color: color.ink,
  },
  listRule: {
    ...type.caption,
    color: color.inkSoft,
  },
});
