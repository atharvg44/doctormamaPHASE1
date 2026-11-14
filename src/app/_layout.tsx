import {
  NotoSerifDevanagari_400Regular,
  NotoSerifDevanagari_500Medium,
  NotoSerifDevanagari_600SemiBold,
  NotoSerifDevanagari_700Bold,
} from '@expo-google-fonts/noto-serif-devanagari';
import {
  NotoSansDevanagari_400Regular,
  NotoSansDevanagari_500Medium,
  NotoSansDevanagari_600SemiBold,
  NotoSansDevanagari_700Bold,
} from '@expo-google-fonts/noto-sans-devanagari';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';
import {
  SafeAreaInsetsContext,
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { PhoneFrame } from '@/components/PhoneFrame';
import { LanguageProvider } from '@/i18n';
import { color } from '@/theme';

/** Web preview only: fake iPhone-class insets so the dock sits correctly. */
const WEB_INSETS = { top: 47, bottom: 34, left: 0, right: 0 };

const webMetrics =
  Platform.OS === 'web'
    ? {
        frame: { x: 0, y: 0, width: 390, height: 844 },
        insets: WEB_INSETS,
      }
    : undefined;

/**
 * The browser reports zero insets, which would pin the header to the bezel
 * and push the dock against the bottom edge. Inside the phone frame the app
 * should behave exactly like it would on a modern iPhone.
 */
function WebInsets({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaInsetsContext.Provider value={Platform.OS === 'web' ? WEB_INSETS : insets}>
      {children}
    </SafeAreaInsetsContext.Provider>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    NotoSansDevanagari_400Regular,
    NotoSansDevanagari_500Medium,
    NotoSansDevanagari_600SemiBold,
    NotoSansDevanagari_700Bold,
    NotoSerifDevanagari_400Regular,
    NotoSerifDevanagari_500Medium,
    NotoSerifDevanagari_600SemiBold,
    NotoSerifDevanagari_700Bold,
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: color.bg }} />;
  }

  return (
    <SafeAreaProvider initialMetrics={webMetrics}>
      <WebInsets>
        <LanguageProvider>
          <StatusBar style="dark" />
          <PhoneFrame>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: color.bg },
                animation: 'fade',
              }}
            />
          </PhoneFrame>
        </LanguageProvider>
      </WebInsets>
    </SafeAreaProvider>
  );
}
