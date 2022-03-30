import * as React from 'react';
import {useTheme} from 'react-native-paper';
import Svg, {Defs, G, Path, SvgProps} from 'react-native-svg';
import {calcFont} from '../constants/style/sizes';
/* SVGR has dropped some elements not supported by react-native-svg: style */
interface Props extends SvgProps {
  color?: string;
}
const width = calcFont(255);
const height = calcFont(150);

function EmptyOrders({color, ...props}: SvgProps) {
  const {
    colors: {primary},
  } = useTheme();
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      {...props}>
      <Defs />
      <G id="prefix__ic_emptyorder" transform="translate(-56 -288.137)">
        <Path
          id="prefix__Path"
          fill={primary}
          d="M158.92 81.2H53.36a8.12 8.12 0 110-16.24H8.12a8.12 8.12 0 010-16.24h46.4a8.12 8.12 0 100-16.24h-29a8.12 8.12 0 010-16.24h46.4a8.12 8.12 0 010-16.24h66.12a8.12 8.12 0 010 16.24h74.24a8.12 8.12 0 010 16.24h25.52a8.12 8.12 0 110 16.24h-22.04a8.12 8.12 0 000 16.24h6.96a8.12 8.12 0 010 16.24H162.4a8.151 8.151 0 01-1.74-.187 8.151 8.151 0 01-1.74.187z"
          opacity={0.123}
          transform="translate(56 315.24)"
        />
        <G id="prefix__shopping-bag" transform="translate(114.608 289.387)">
          <Path
            id="prefix__Union_1"
            d="M99.856 99.991a21.76 21.76 0 01-15.914 6.953h-62.25A21.7 21.7 0 01.063 83.591L6.014 8.6a9.367 9.367 0 019.3-8.6H90.32a9.368 9.368 0 019.3 8.612l5.949 74.968a21.753 21.753 0 01-5.713 16.411z"
            transform="translate(11.392 26.282)"
            stroke={primary}
          />
          <Path
            id="prefix__Path_274"
            d="M85.242 25.754v17.94a3.9 3.9 0 01-7.8 0v-17.94A17.969 17.969 0 0059.49 7.8h-.034a17.969 17.969 0 00-17.914 17.954v17.94a3.9 3.9 0 11-7.8 0v-17.94A25.782 25.782 0 0159.456 0h.034a25.782 25.782 0 0125.752 25.754z"
            transform="translate(4.718)"
            stroke={primary}
          />
          <Path
            id="prefix__Path_275"
            fill={primary}
            d="M75.843 60.349L58.231 77.962l-2.567 2.567a3.9 3.9 0 01-5.52 0l-9.458-9.458a3.9 3.9 0 115.514-5.517l6.7 6.7 5.327-5.327 12.1-12.1a3.9 3.9 0 115.517 5.52z"
            transform="translate(5.944 11.336)"
          />
        </G>
      </G>
    </Svg>
  );
}

export {EmptyOrders};
