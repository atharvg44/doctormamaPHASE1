import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SosButton } from '@/components/ui';
import { color, layout, space } from '@/theme';

type Props = {
  /** The calm primary action. Always 64dp, always the wide side. */
  children: React.ReactNode;
  onSos: () => void;
  /** Hide the SOS half on the emergency screens themselves. */
  hideSos?: boolean;
};

/**
 * Pinned bottom band. The only place a primary action lives: 64dp tall,
 * 20dp gutters, 40% reserved for SOS so it is always in the same spot.
 */
export function ActionDock({ children, onSos, hideSos = false }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.dock, { paddingBottom: insets.bottom + space.lg }]}>
      <View style={styles.row}>
        <View style={styles.primary}>{children}</View>
        {hideSos ? null : (
          <View style={styles.sos}>
            <SosButton onPress={onSos} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dock: {
    paddingTop: space.md,
    paddingHorizontal: layout.gutter,
    backgroundColor: color.paperDeep,
    borderTopWidth: 2,
    borderTopColor: color.ink,
  },
  row: {
    flexDirection: 'row',
    gap: space.md,
  },
  primary: {
    flex: 1,
  },
  sos: {
    width: '38%',
  },
});
