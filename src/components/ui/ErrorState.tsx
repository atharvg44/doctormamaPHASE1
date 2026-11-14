import { StyleSheet, Text, View } from 'react-native';

import { Icon } from './Icon';
import { Button } from './Button';
import { color, space, type } from '@/theme';

type Props = {
  title: string;
  body: string;
  retryLabel: string;
  onRetry: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
};

/** Says what happened and what to do next. Never a dead end. */
export function ErrorState({
  title,
  body,
  retryLabel,
  onRetry,
  secondaryLabel,
  onSecondary,
}: Props) {
  return (
    <View style={styles.base}>
      <View style={styles.mark}>
        <Icon name="alert" size={40} tint={color.warning} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>

      <View style={styles.actions}>
        <Button label={retryLabel} onPress={onRetry} variant="primary" />
        {secondaryLabel && onSecondary ? (
          <Button label={secondaryLabel} onPress={onSecondary} variant="secondary" />
        ) : null}
      </View>
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
    borderColor: color.warning,
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
  },
  actions: {
    alignSelf: 'stretch',
    gap: space.md,
    marginTop: space.sm,
  },
});
