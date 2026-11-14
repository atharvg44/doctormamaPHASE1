import Svg, { Circle, Path } from 'react-native-svg';

import { color } from '@/theme';

export type IconName =
  | 'chevronRight'
  | 'chevronLeft'
  | 'mic'
  | 'phone'
  | 'check'
  | 'close'
  | 'clock'
  | 'pin'
  | 'alert'
  | 'info'
  | 'speaker'
  | 'plus'
  | 'wifiOff'
  | 'search'
  | 'user'
  | 'calendar';

type Props = {
  name: IconName;
  size?: number;
  /** Always inherits a text role — icons never get their own colour. */
  tint?: string;
  strokeWidth?: number;
};

/**
 * One hand-drawn-feeling line set, 24px grid, round caps.
 * 2px stroke is the minimum for low-vision users.
 */
export function Icon({ name, size = 28, tint = color.ink, strokeWidth = 2 }: Props) {
  const common = {
    stroke: tint,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'chevronRight' && <Path d="M9 5 16 12 9 19" {...common} />}
      {name === 'chevronLeft' && <Path d="M15 5 8 12 15 19" {...common} />}
      {name === 'mic' && (
        <>
          <Path d="M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3Z" {...common} />
          <Path d="M5.5 11.5a6.5 6.5 0 0 0 13 0" {...common} />
          <Path d="M12 18v3" {...common} />
        </>
      )}
      {name === 'phone' && (
        <Path
          d="M6.2 3.5h3l1.4 3.8-2 1.4a12.5 12.5 0 0 0 6.7 6.7l1.4-2 3.8 1.4v3a2 2 0 0 1-2 2A17.5 17.5 0 0 1 4.2 5.5a2 2 0 0 1 2-2Z"
          {...common}
        />
      )}
      {name === 'check' && <Path d="M4 12.5 9.5 18 20 6.5" {...common} />}
      {name === 'close' && <Path d="M6 6 18 18M18 6 6 18" {...common} />}
      {name === 'clock' && (
        <>
          <Circle cx="12" cy="12" r="8.5" {...common} />
          <Path d="M12 7.5V12l3 2" {...common} />
        </>
      )}
      {name === 'pin' && (
        <>
          <Path d="M12 21s7-6.4 7-11.2A7 7 0 0 0 5 9.8C5 14.6 12 21 12 21Z" {...common} />
          <Circle cx="12" cy="9.8" r="2.5" {...common} />
        </>
      )}
      {name === 'info' && (
        <>
          <Circle cx="12" cy="12" r="8.5" {...common} />
          <Path d="M12 11v6" {...common} />
          <Path d="M12 7.6h.01" {...common} />
        </>
      )}
      {name === 'alert' && (
        <>
          <Path d="M12 3.5 22 20.5H2L12 3.5Z" {...common} />
          <Path d="M12 9.5v5" {...common} />
          <Path d="M12 17.5h.01" {...common} />
        </>
      )}
      {name === 'speaker' && (
        <>
          <Path d="M4 9.5h4L13 5.5v13l-5-4H4v-5Z" {...common} />
          <Path d="M16.5 9a4.5 4.5 0 0 1 0 6" {...common} />
          <Path d="M19 6.5a8 8 0 0 1 0 11" {...common} />
        </>
      )}
      {name === 'plus' && <Path d="M12 5v14M5 12h14" {...common} />}
      {name === 'wifiOff' && (
        <>
          <Path d="M3 9a15 15 0 0 1 18 0" {...common} />
          <Path d="M6.5 12.5a10 10 0 0 1 11 0" {...common} />
          <Path d="M10 16a5 5 0 0 1 4 0" {...common} />
          <Path d="M12 19.5h.01" {...common} />
          <Path d="M4 4 20 20" {...common} />
        </>
      )}
      {name === 'search' && (
        <>
          <Circle cx="10.5" cy="10.5" r="6.5" {...common} />
          <Path d="M15.5 15.5 20 20" {...common} />
        </>
      )}
      {name === 'user' && (
        <>
          <Circle cx="12" cy="8" r="3.5" {...common} />
          <Path d="M4.5 20a7.5 7.5 0 0 1 15 0" {...common} />
        </>
      )}
      {name === 'calendar' && (
        <>
          <Path d="M4 6.5h16v14H4v-14Z" {...common} />
          <Path d="M4 10.5h16M8.5 3.5v4M15.5 3.5v4" {...common} />
        </>
      )}
    </Svg>
  );
}
