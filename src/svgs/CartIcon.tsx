import * as React from 'react';
import Svg, {SvgProps, Defs, ClipPath, Path, G} from 'react-native-svg';
import {calcFont, calcHeight, calcWidth} from '../constants/style/sizes';
/* SVGR has dropped some elements not supported by react-native-svg: style */
interface Props extends SvgProps {
  color?: string;
}
const width = calcFont(23);
const height = calcFont(23);
function CartIcon({color, ...props}: Props) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      {...props}>
      <Defs>
        <ClipPath id="prefix__clip-path">
          <Path
            id="prefix__Path_76"
            d="M269.572-37.05v-2.017h-11.5v2.017m-3.025 14.117a2.017 2.017 0 002.017 2.017 2.017 2.017 0 002.017-2.017 2.017 2.017 0 00-2.017-2.017 2.017 2.017 0 00-2.022 2.017zm10.083 0a2.017 2.017 0 002.017 2.017 2.017 2.017 0 002.017-2.017 2.017 2.017 0 00-2.017-2.017 2.017 2.017 0 00-2.022 2.017zm-7.9-5.294l.03-.121.908-1.644h7.512a2.007 2.007 0 001.765-1.039l3.892-7.068-1.755-.968h-.01l-1.109 2.017-2.783 5.042h-7.08l-.131-.272-2.259-4.769-.958-2.017-.948-2.017h-3.3v2.017h2.017l3.63 7.653-1.361 2.47a1.95 1.95 0 00-.252.968 2.017 2.017 0 002.017 2.017h12.1v-2.017h-11.673a.256.256 0 01-.252-.252z"
          />
        </ClipPath>
        <ClipPath id="prefix__clip-path-2">
          <Path id="prefix__Path_75" d="M0 0h375v-51H0z" />
        </ClipPath>
      </Defs>
      <G id="prefix__ic_cart_light" transform="translate(-405 -116.917)">
        <G
          id="prefix__Group_65"
          clipPath="url(#prefix__clip-path)"
          transform="translate(153.992 158)">
          <G id="prefix__Group_64" clipPath="url(#prefix__clip-path-2)">
            <Path
              id="prefix__Path_74"
              fill={color}
              d="M246.008-46.083h30.328v30.167h-30.328z"
            />
          </G>
        </G>
      </G>
    </Svg>
  );
}

export {CartIcon};
