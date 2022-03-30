import * as React from 'react';
import {useTheme} from 'react-native-paper';
import Svg, {ClipPath, Defs, G, Path, SvgProps} from 'react-native-svg';
import {COLORS} from '../constants/style';
import {calcFont} from '../constants/style/sizes';
/* SVGR has dropped some elements not supported by react-native-svg: style */
interface Props extends SvgProps {
  color?: string;
}
const width = calcFont(21);
const height = calcFont(21);

function PlusIcon({color, ...props}: Props) {
  const {
    colors: {primary},
  } = useTheme();
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      {...props}>
      <Defs>
        <ClipPath id="prefix__clip-path">
          <Path
            id="prefix__Path_244"
            fill="none"
            d="M10-25a10 10 0 0010-10 10 10 0 00-10-10A10 10 0 000-35a10 10 0 0010 10z"
            clipRule="evenodd"
            transform="translate(0 45)"
          />
        </ClipPath>
        <ClipPath id="prefix__clip-path-2">
          <Path
            id="prefix__Path_243"
            fill="none"
            d="M-70-75.111h333.333V-668H-70z"
            transform="translate(70 668)"
          />
        </ClipPath>
      </Defs>
      <G id="prefix__ic_add" transform="translate(0 45)">
        <G
          id="prefix__Group_265"
          clipPath="url(#prefix__clip-path)"
          transform="translate(0 -45)">
          <G
            id="prefix__Group_264"
            clipPath="url(#prefix__clip-path-2)"
            transform="translate(-31.111 -276.889)">
            <G id="prefix__Group_263" transform="translate(31.111 276.889)">
              <Path
                id="prefix__Path_242"
                fill="none"
                stroke={color || primary}
                strokeWidth={2.025}
                d="M10 20A10 10 0 100 10a10 10 0 0010 10z"
              />
            </G>
          </G>
        </G>
        <Path
          id="prefix__Path_247"
          d="M16.937-23.956h-3.285v1.2h7.793v-1.2h-4.508z"
          transform="translate(-7.584 -11.691)"
          fill={color || primary}
        />
        <Path
          id="prefix__Path_248"
          d="M16.937-23.956h-3.285v1.2h7.793v-1.2h-4.508z"
          transform="rotate(90 19.602 -32.992)"
          fill={color || primary}
        />
      </G>
    </Svg>
  );
}

export {PlusIcon};
