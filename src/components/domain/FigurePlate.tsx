import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { color, type } from '@/theme';

type Figure = 'chest' | 'help' | 'hospital';

type Props = {
  figure?: Figure;
  caption?: string;
  label?: string;
  width?: number;
  /** The plate is decoration: screen readers get the caption, once. */
  accessibilityLabel?: string;
};

/**
 * The household medical book's figure plate: one line drawing, printed in
 * ink on the paper, with its figure number and caption underneath. Never
 * photographic, never tinted — the illustration is the page's one ornament.
 */
export function FigurePlate({
  figure = 'chest',
  caption,
  label,
  width = 104,
  accessibilityLabel,
}: Props) {
  const height = Math.round(width * 1.06);

  return (
    <View style={[styles.base, { width }]} accessible accessibilityLabel={accessibilityLabel}>
      <Svg width={width} height={height} viewBox="0 0 104 110" fill="none">
        {figure === 'chest' ? (
          <>
            <Path
              d="M14 44c0-13 15-19 30-21V18h16v5c15 2 30 8 30 21v30c0 14-17 22-38 22S14 88 14 74z"
              stroke={color.plateInk}
              strokeWidth={1.1}
              opacity={0.55}
            />
            <Path
              d="M52 50c-5-7-16-4-16 5 0 8 9 13 16 19 7-6 16-11 16-19 0-9-11-12-16-5z"
              stroke={color.plateInk}
              strokeWidth={1.25}
            />
            <Path d="M52 55v8M48 59h8" stroke={color.plateInk} strokeWidth={1.15} opacity={0.85} />
            <Path d="M30 104h44" stroke={color.plateInk} strokeWidth={0.9} opacity={0.4} />
          </>
        ) : null}

        {figure === 'help' ? (
          <>
            <Path
              d="M52 96c-9 0-17-4-17-9 0-4 5-7 11-8V64c-9-3-15-11-15-21 0-12 9-22 21-22s21 10 21 22c0 10-6 18-15 21v15c6 1 11 4 11 8 0 5-8 9-17 9z"
              stroke={color.plateInk}
              strokeWidth={1.1}
              opacity={0.75}
            />
            <Circle cx="52" cy="42" r="9" stroke={color.plateInk} strokeWidth={1.2} />
            <Path d="M48 42l3 3 6-6" stroke={color.plateInk} strokeWidth={1.2} />
            <Path d="M8 104h88" stroke={color.plateInk} strokeWidth={0.8} opacity={0.25} />
          </>
        ) : null}

        {figure === 'hospital' ? (
          <>
            <Path
              d="M18 94V46l20-12 20 12v48M58 94V58l14-9 14 9v36"
              stroke={color.plateInk}
              strokeWidth={1.1}
            />
            <Path d="M30 94V72h14v22M64 94V74h12v20" stroke={color.plateInk} strokeWidth={1} opacity={0.7} />
            <Path d="M38 52v10M33 57h10" stroke={color.plateInk} strokeWidth={1.2} />
            <Path d="M10 96h84" stroke={color.plateInk} strokeWidth={0.9} opacity={0.35} />
          </>
        ) : null}
      </Svg>

      {label || caption ? (
        <View style={styles.captionBlock}>
          {label ? <Text style={styles.label}>{label}</Text> : null}
          {caption ? <Text style={styles.caption}>{caption}</Text> : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
  },
  captionBlock: {
    marginTop: 4,
    alignItems: 'center',
  },
  label: {
    ...type.fieldLabel,
    fontSize: 11,
    lineHeight: 15,
    color: color.ink,
    textAlign: 'center',
  },
  caption: {
    ...type.caption,
    fontSize: 13,
    lineHeight: 18,
    color: color.inkSoft,
    textAlign: 'center',
  },
});
