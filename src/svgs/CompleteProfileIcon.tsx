import * as React from 'react';
import {useTheme} from 'react-native-paper';
import Svg, {Defs, G, Path, SvgProps} from 'react-native-svg';
import {COLORS} from '../constants/style';
import {calcFont} from '../constants/style/sizes';
/* SVGR has dropped some elements not supported by react-native-svg: style */
const width = calcFont(65);
const height = calcFont(75);

function CompleteProfileIcon(props: SvgProps) {
  const {
    colors: {primary},
  } = useTheme();
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill={primary}
      {...props}>
      <Defs />
      <G
        id="prefix__add-documents"
        opacity={0.537}
        transform="translate(-5.188)">
        <G id="prefix__Group_400">
          <Path
            id="prefix__Path_300"
            d="M65.695 23.161a2.109 2.109 0 00-.111-.549l-.066-.176a2.029 2.029 0 00-.419-.619L43.892.61a2.132 2.132 0 00-.64-.426 2.463 2.463 0 00-.159-.057 2.049 2.049 0 00-.572-.111L42.416 0H28.405a9.147 9.147 0 00-9.137 9.137v1.229h-4.944A9.148 9.148 0 005.188 19.5v42.265a9.148 9.148 0 009.136 9.135H42.5a9.148 9.148 0 009.136-9.137v-1.23h4.943a9.147 9.147 0 009.136-9.133V23.3zM44.507 7.145l14.061 14.063h-9.111a4.956 4.956 0 01-4.949-4.951V7.145zm2.941 54.619a4.956 4.956 0 01-4.95 4.951H14.323a4.956 4.956 0 01-4.95-4.951V19.5a4.956 4.956 0 014.95-4.951h11.918v12.07a9.147 9.147 0 009.137 9.137h12.07zM30.427 26.622v-9.11l14.062 14.061h-9.11a4.956 4.956 0 01-4.952-4.951zM61.528 51.4a4.956 4.956 0 01-4.95 4.951h-4.943V33.665l-.02-.137a2.125 2.125 0 00-.11-.547l-.072-.189a2.053 2.053 0 00-.41-.6l-21.21-21.217a2 2 0 00-.585-.4 1.549 1.549 0 00-.207-.08 2.016 2.016 0 00-.547-.111l-.139-.023h-4.881V9.138A4.957 4.957 0 0128.4 4.187h11.923v12.07a9.146 9.146 0 009.135 9.137h12.07z"
          />
          <Path
            id="prefix__Path_301"
            d="M29.65 38.747a2 2 0 00-4 0v7.172h-7.172a2 2 0 000 4h7.172v7.172a2 2 0 004 0v-7.172h7.173a2 2 0 000-4H29.65z"
          />
        </G>
      </G>
    </Svg>
  );
}

export {CompleteProfileIcon};
