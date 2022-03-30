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

function EmptyWishlist({color, ...props}: Props) {
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
      <G id="prefix__ic_emptyfav" transform="translate(-56 -314.002)">
        <Path
          id="prefix__Background"
          fill={color || primary}
          d="M234.32 73.08a8.12 8.12 0 118.12 8.12 8.119 8.119 0 01-8.12-8.12zM162.4 81.2a8.151 8.151 0 01-1.74-.186 8.151 8.151 0 01-1.74.186H53.36a8.12 8.12 0 110-16.24H8.12a8.12 8.12 0 010-16.241h46.4a8.12 8.12 0 100-16.24h-29a8.12 8.12 0 110-16.241h46.4A8.12 8.12 0 0171.92 0h66.12a8.12 8.12 0 010 16.24h74.24a8.12 8.12 0 010 16.241h25.52a8.12 8.12 0 010 16.24h-22.04a8.12 8.12 0 000 16.241h6.961a8.12 8.12 0 010 16.24z"
          opacity={0.123}
          transform="translate(56 324.8)"
        />
        <G id="prefix__Group_390" transform="translate(-5.93)">
          <Path
            id="prefix__Path_299"
            fill="#fff"
            d="M2585.532 4045.023h72.38l6.368 5.49v120.922l-41.545-28.7-43.11 28.7v-120.922z"
            transform="translate(-2434 -3729)"
          />
          <G id="prefix__wish-list" transform="translate(129.93 312.002)">
            <Path
              id="prefix__Path_297"
              d="M100.284 132a1.857 1.857 0 01-1.061-.332l-41.653-28.98-41.653 28.971A1.857 1.857 0 0113 130.14V11.285A9.3 9.3 0 0122.285 2h70.57a9.3 9.3 0 019.285 9.285V130.14a1.857 1.857 0 01-1.856 1.86zM57.57 98.569a1.857 1.857 0 011.061.332l39.8 27.684v-115.3a5.571 5.571 0 00-5.571-5.571H22.285a5.571 5.571 0 00-5.571 5.571v115.3L56.51 98.9a1.857 1.857 0 011.06-.331z"
              //fill={COLORS.WHITE}
              fill={color || primary}
              opacity={0.7}
            />
            <Path
              id="prefix__Path_298"
              d="M67.7 67.663a1.857 1.857 0 01-1.092-.355L50.619 55.677 34.625 67.306a1.857 1.857 0 01-2.858-2.074l6.1-18.811-16-11.631a1.857 1.857 0 011.092-3.359h19.774l6.12-18.811a1.857 1.857 0 013.528 0L58.5 31.431h19.771a1.857 1.857 0 011.092 3.359l-16 11.631 6.1 18.811a1.857 1.857 0 01-1.763 2.431zM50.619 51.525a1.857 1.857 0 011.092.355l12.463 9.062-4.756-14.658a1.857 1.857 0 01.674-2.074l12.467-9.064h-15.4a1.857 1.857 0 01-1.766-1.283L50.619 19.2 45.85 33.869a1.857 1.857 0 01-1.766 1.283h-15.4l12.469 9.059a1.857 1.857 0 01.674 2.074l-4.76 14.656 12.463-9.063a1.857 1.857 0 011.089-.353z"
              fill={color || primary}
              transform="translate(6.952 8.008)"
              opacity={0.7}
            />
          </G>
        </G>
      </G>
    </Svg>
  );
}

export {EmptyWishlist};
