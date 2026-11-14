import { StyleSheet, Text, View } from 'react-native';

import { Icon } from './Icon';
import { Button } from './Button';
import { color, space, type } from '@/theme';

type Props = {
  title: string;
  body: string;
  actionLabel: string;
  onAction: () => void;
};

/** An empty screen is an invitation to act, not a mood. One action, always. */
export function EmptyState({ title, body, actionLabel, onAction }: Props) {
  return (
    <View style={styles.base}>
      <View style={styles.mark}>
        <Icon name="search" size={40} tint={color.ink} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      <Button label={actionLabel} onPress={onAction} variant="primary" size="standard" />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    gap: space.md,
    paddingVertical: space.section,
    paddingHorizontal: space.lg,
  },
  mark: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 1.5,
    borderColor: color.ink,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: space.sm,
  },
  title: {
    ...type.h3,
    color: color.ink,
    textAlign: 'center',
  },
  body: {
    ...type.body,
    color: color.inkSoft,
    textAlign: 'center',
    marginBottom: space.sm,
  },
});
