import { Platform, StyleSheet, View, useWindowDimensions } from 'react-native';

import { color } from '@/theme';

const SCREEN_W = 390;
const SCREEN_H = 844;

/**
 * Web-only preview shell. Renders the app inside a 390×844 phone frame so the
 * layout can be judged at the real size while developing in a browser.
 * On native this is a pass-through.
 */
export function PhoneFrame({ children }: { children: React.ReactNode }) {
  const { width, height } = useWindowDimensions();

  if (Platform.OS !== 'web') return <>{children}</>;

  // Always lay out at exactly 390×844 so the design is phone-accurate,
  // then scale the whole frame down only if the window cannot fit it.
  const scale = Math.min(
    1,
    (width - 32) / (SCREEN_W + 20),
    (height - 32) / (SCREEN_H + 20),
  );

  return (
    <View style={styles.stage}>
      <View
        style={{
          width: (SCREEN_W + 20) * scale,
          height: (SCREEN_H + 20) * scale,
        }}
      >
        <View
          style={[
            styles.bezel,
            {
              width: SCREEN_W + 20,
              height: SCREEN_H + 20,
              transform: [{ scale }],
            },
            styles.scaledOrigin,
          ]}
        >
          <View style={[styles.screen, { width: SCREEN_W, height: SCREEN_H }]}>
            {children}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D6C9AE',
  },
  bezel: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1B1B1B',
    borderRadius: 46,
    shadowColor: '#000000',
    shadowOpacity: 0.22,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 12 },
  },
  screen: {
    backgroundColor: color.paper,
    borderRadius: 38,
    overflow: 'hidden',
  },
  scaledOrigin: {
    // Keeps the scaled frame anchored top-left inside its sized wrapper.
    transformOrigin: 'top left',
  },
});
