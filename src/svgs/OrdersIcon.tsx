import * as React from 'react';
import Svg, {SvgProps, Defs, ClipPath, Path, G} from 'react-native-svg';
import {calcFont, calcHeight, calcWidth} from '../constants/style/sizes';
/* SVGR has dropped some elements not supported by react-native-svg: style */
interface Props extends SvgProps {
  color?: string;
}
const width = calcFont(23);
const height = calcFont(23);
function OrdersIcon({color, ...props}: Props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      {...props}>
      <Defs>
        <ClipPath id="prefix__clip-path">
          <Path
            id="prefix__Path_88"
            d="M182.667-41.833h8.667a6.5 6.5 0 016.5 6.5v8.667a6.5 6.5 0 01-6.5 6.5h-8.667a6.5 6.5 0 01-6.5-6.5v-8.667a6.5 6.5 0 016.5-6.5zm0 2.167a4.333 4.333 0 00-4.333 4.333v8.667a4.333 4.333 0 004.333 4.333h8.667a4.333 4.333 0 004.333-4.333v-8.667a4.333 4.333 0 00-4.333-4.333zm6.5 7.583h3.25A1.083 1.083 0 01193.5-31a1.083 1.083 0 01-1.083 1.083h-3.25A1.083 1.083 0 01188.083-31a1.083 1.083 0 011.084-1.083zM187-27.75h5.417a1.083 1.083 0 011.083 1.083 1.083 1.083 0 01-1.083 1.083H187a1.083 1.083 0 01-1.083-1.083A1.083 1.083 0 01187-27.75zm0-8.667h5.417a1.083 1.083 0 011.083 1.083 1.083 1.083 0 01-1.083 1.083H187a1.083 1.083 0 01-1.083-1.083A1.083 1.083 0 01187-36.417zm-4.52 5.68l2.3-2.3a1.083 1.083 0 011.047-.28 1.083 1.083 0 01.766.766 1.084 1.084 0 01-.281 1.047l-3.064 3.064a1.083 1.083 0 01-.766.318 1.083 1.083 0 01-.766-.318l-1.532-1.531a1.083 1.083 0 01.013-1.519 1.083 1.083 0 011.519-.013z"
            className="prefix__cls-1"
          />
        </ClipPath>
        <ClipPath id="prefix__clip-path-2">
          <Path
            id="prefix__Path_87"
            d="M0 0h375v-51H0z"
            className="prefix__cls-1"
          />
        </ClipPath>
      </Defs>
      <G
        id="prefix__ic_orders_light"
        clipPath="url(#prefix__clip-path)"
        transform="translate(-176.167 41.833)">
        <G id="prefix__Group_74" clipPath="url(#prefix__clip-path-2)">
          <Path
            id="prefix__Path_86"
            fill={color}
            d="M171.167-46.833h31.667v31.667h-31.667z"
          />
        </G>
      </G>
    </Svg>
  );
}

export {OrdersIcon};
