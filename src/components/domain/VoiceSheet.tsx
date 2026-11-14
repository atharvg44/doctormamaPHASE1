import { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

import { BottomSheet, Button, Chip, Icon, TextArea } from '@/components/ui';
import { PressableScale } from '@/components/ui/press';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useT } from '@/i18n';
import { symptoms } from '@/data/symptoms';
import { color, space, type } from '@/theme';

type Phase = 'idle' | 'permission' | 'listening' | 'processing' | 'confirm' | 'fallback';

type Props = {
  visible: boolean;
  onClose: () => void;
  /** Called with the confirmed sentence. */
  onDone: (transcript: string) => void;
  /** Opens straight on the confirmation step, e.g. from a symptom chip. */
  initial?: string;
};

const shortcuts = symptoms.slice(0, 4);

/**
 * The voice sheet. Six states, all of them reachable, and a chip path that
 * does not depend on the microphone at all.
 */
export function VoiceSheet({ visible, onClose, onDone, initial }: Props) {
  const { t } = useT();
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('idle');
  const [seconds, setSeconds] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [ring] = useState(() => new Animated.Value(0));

  // Reopening always starts from the top, never from a stale transcript.
  // Deferred by one frame so the reset lands after the open commit.
  useEffect(() => {
    if (!visible) return;
    const reset = setTimeout(() => {
      setSeconds(0);
      setTranscript(initial ?? '');
      setPhase(initial ? 'confirm' : 'idle');
    }, 0);
    return () => clearTimeout(reset);
  }, [visible, initial]);

  useEffect(() => {
    if (phase !== 'listening') return;
    const timer = setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'processing') return;
    const timer = setTimeout(() => {
      setTranscript('छातीत दुखतंय, दोन दिवसांपासून');
      setPhase('confirm');
    }, 1600);
    return () => clearTimeout(timer);
  }, [phase]);

  // Two rings breathing outward, 1.4s. Static under Reduce Motion.
  useEffect(() => {
    if (phase !== 'listening' || reduceMotion) {
      ring.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.timing(ring, {
        toValue: 1,
        duration: 1400,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [phase, reduceMotion, ring]);

  const ringScale = ring.interpolate({ inputRange: [0, 1], outputRange: [1, 1.25] });
  const ringOpacity = ring.interpolate({ inputRange: [0, 1], outputRange: [0.4, 0] });

  function pick(label: string) {
    setTranscript(label);
    setPhase('confirm');
  }

  return (
    <BottomSheet visible={visible} onClose={onClose} title={t.voice.idle}>
      {phase === 'idle' ? (
        <View style={styles.center}>
          <MicButton onPress={() => setPhase('permission')} />
          <Text style={styles.hint}>{t.voice.idleHint}</Text>
        </View>
      ) : null}

      {phase === 'permission' ? (
        <View style={styles.stack}>
          <Text style={styles.lead}>{t.voice.permissionTitle}</Text>
          <Text style={styles.body}>{t.voice.permissionBody}</Text>
          <Button label={t.voice.allow} icon="mic" onPress={() => setPhase('listening')} />
          <Button label={t.voice.later} variant="secondary" onPress={() => setPhase('fallback')} />
        </View>
      ) : null}

      {phase === 'listening' ? (
        <View style={styles.center}>
          <View style={styles.micWrap}>
            {reduceMotion ? null : (
              <>
                <Animated.View
                  style={[
                    styles.ring,
                    { opacity: ringOpacity, transform: [{ scale: ringScale }] },
                  ]}
                />
                <Animated.View
                  style={[
                    styles.ring,
                    styles.ringInner,
                    { opacity: ringOpacity, transform: [{ scale: ringScale }] },
                  ]}
                />
              </>
            )}
            <MicButton onPress={() => setPhase('processing')} active />
          </View>

          <Text style={[styles.lead, styles.leadCenter]}>{t.voice.listening}</Text>
          <Text style={styles.timer} accessibilityLabel={`${seconds} सेकंद`}>
            {String(seconds).padStart(2, '0')} सेकंद
          </Text>
          <Text style={styles.hint}>{t.voice.listeningHint}</Text>

          <Button
            label={t.voice.stop}
            variant="secondary"
            size="standard"
            onPress={() => setPhase('processing')}
          />
        </View>
      ) : null}

      {phase === 'processing' ? (
        <View style={styles.center}>
          <MicButton onPress={() => {}} active />
          <Text style={[styles.lead, styles.leadCenter]}>{t.voice.processing}</Text>
        </View>
      ) : null}

      {phase === 'confirm' ? (
        <View style={styles.stack}>
          <Text style={styles.lead}>{t.voice.confirmTitle}</Text>
          <TextArea
            label={t.voice.transcriptLabel}
            helper={t.voice.transcriptHelper}
            value={transcript}
            onChangeText={setTranscript}
          />
          <Button
            label={t.voice.next}
            onPress={() => {
              if (!transcript.trim()) {
                setPhase('fallback');
                return;
              }
              onDone(transcript.trim());
            }}
          />
          <Button label={t.voice.again} variant="secondary" onPress={() => setPhase('listening')} />
        </View>
      ) : null}

      {phase === 'fallback' ? (
        <View style={styles.stack}>
          <Text style={styles.lead}>{t.voice.fallbackTitle}</Text>
          <Text style={styles.body}>{t.voice.fallbackBody}</Text>
          <View style={styles.chips}>
            {shortcuts.map((symptom) => (
              <Chip key={symptom.id} label={symptom.label} onPress={() => pick(symptom.label)} />
            ))}
          </View>
          <Button label={t.voice.again} variant="ghost" icon="mic" onPress={() => setPhase('listening')} />
        </View>
      ) : null}
    </BottomSheet>
  );
}

/** 96dp ink disc — the single biggest control in the app. */
function MicButton({ onPress, active = false }: { onPress: () => void; active?: boolean }) {
  return (
    <PressableScale
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="मायक्रोफोन"
      accessibilityHint="बोलणे सुरू किंवा थांबवा"
      style={[styles.mic, active ? styles.micActive : null]}
    >
      <Icon name="mic" size={40} tint={color.paper} />
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    gap: space.md,
    paddingVertical: space.lg,
  },
  stack: {
    gap: space.lg,
  },
  micWrap: {
    width: 168,
    height: 168,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: color.ink,
  },
  ringInner: {
    backgroundColor: color.ink,
  },
  mic: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: color.ink,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: space.md,
  },
  micActive: {
    borderWidth: 3,
    borderColor: color.red,
  },
  lead: {
    ...type.h3,
    color: color.ink,
  },
  leadCenter: {
    textAlign: 'center',
  },
  body: {
    ...type.body,
    color: color.inkSoft,
  },
  hint: {
    ...type.caption,
    color: color.inkSoft,
    textAlign: 'center',
  },
  timer: {
    ...type.numeric,
    fontSize: 21,
    lineHeight: 32,
    color: color.ink,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.md,
  },
});
