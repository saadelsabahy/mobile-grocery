import * as React from 'react';
import Svg, {SvgProps, Defs, ClipPath, Path, G} from 'react-native-svg';
import {calcFont, calcHeight, calcWidth} from '../constants/style/sizes';
/* SVGR has dropped some elements not supported by react-native-svg: style */
interface Props extends SvgProps {
  color?: string;
}
const width = calcFont(23);
const height = calcFont(23);
function MoreIcon({color, ...props}: Props) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      {...props}>
      <Defs>
        <ClipPath id="prefix__clip-path">
          <Path
            id="prefix__Path_72"
            d="M328-30.25h18v-2.5h-18zm0 6.25h18v-2.5h-18zm0-15v2.5h18V-39z"
          />
        </ClipPath>
        <ClipPath id="prefix__clip-path-2">
          <Path id="prefix__Path_71" d="M0 0h375v-51H0z" />
        </ClipPath>
      </Defs>
      <G
        id="prefix__ic_more_light"
        clipPath="url(#prefix__clip-path)"
        transform="translate(-328 39)">
        <G id="prefix__Group_60" clipPath="url(#prefix__clip-path-2)">
          <Path id="prefix__Path_70" fill={color} d="M323-44h28v25h-28z" />
        </G>
      </G>
    </Svg>
  );
}

export {MoreIcon};
