import * as React from 'react';
import {useTheme} from 'react-native-paper';
import Svg, {Circle, Defs, G, Path, SvgProps} from 'react-native-svg';
import {COLORS} from '../constants/style';
import {calcFont} from '../constants/style/sizes';
/* SVGR has dropped some elements not supported by react-native-svg: style */
interface Props extends SvgProps {
  color?: string;
}
const width = calcFont(255);
const height = calcFont(150);

function EmptyCart({color, ...props}: Props) {
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
      <G id="prefix__ic_cart" transform="translate(0 1.25)">
        <Path
          id="prefix__Background"
          fill={color || primary}
          d="M234.32 73.08a8.12 8.12 0 118.12 8.12 8.119 8.119 0 01-8.12-8.12zM162.4 81.2a8.151 8.151 0 01-1.74-.186 8.151 8.151 0 01-1.74.186H53.36a8.12 8.12 0 110-16.24H8.12a8.12 8.12 0 010-16.241h46.4a8.12 8.12 0 100-16.24h-29a8.12 8.12 0 110-16.241h46.4A8.12 8.12 0 0171.92 0h66.12a8.12 8.12 0 010 16.24h74.24a8.12 8.12 0 010 16.241h25.52a8.12 8.12 0 010 16.24h-22.04a8.12 8.12 0 000 16.241h6.961a8.12 8.12 0 010 16.24z"
          opacity={0.123}
          transform="translate(0 31.32)"
        />
        <Path
          id="prefix__Rectangle"
          fill="#ebf5ea"
          d="M2.32 0h77.72l-6.96 10.44 9.28 6.96H0l10.44-6.96z"
          transform="translate(89.32 33.64)"
        />
        <Path
          id="prefix__line"
          fill="none"
          stroke={color || primary}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={2.5}
          d="M212.428 125.86zm-31.469 0zm-119.479 0zm-14.932 0z"
        />
        <Path
          id="prefix__bag"
          fill={COLORS.WHITE}
          stroke={color || primary}
          strokeLinecap="round"
          strokeMiterlimit={10}
          strokeWidth={2.5}
          d="M169.993 141.52H92.755a4.62 4.62 0 01-4.588-4.64V53.36a3.506 3.506 0 013.523-3.48h80.6a2.309 2.309 0 012.294 2.32v84.68a4.619 4.619 0 01-4.591 4.64z"
        />
        <Path
          id="prefix__Rectangle-2"
          fill="none"
          stroke={color || primary}
          strokeMiterlimit={10}
          strokeWidth={2.5}
          d="M90.48 49.88V35.96a2.211 2.211 0 012.082-2.32h77.036a2.211 2.211 0 012.082 2.32v13.92"
        />
        <Circle
          id="prefix__Oval"
          cx={4.06}
          cy={4.06}
          r={4.06}
          className="prefix__cls-6"
          transform="translate(107.88 66.12)"
        />
        <Circle
          id="prefix__Oval-2"
          cx={4.06}
          cy={4.06}
          r={4.06}
          className="prefix__cls-6"
          transform="translate(146.16 66.12)"
        />
        <Path
          id="prefix__Oval-3"
          d="M37.12-16A18.56 18.56 0 0118.56 2.56 18.56 18.56 0 010-16"
          className="prefix__cls-7"
          transform="translate(112.52 90.24)"
        />
        <Path
          id="prefix__Path_3"
          d="M1.231 0l8.244 8.138a1.16 1.16 0 01-.253 1.84L0 15.084"
          className="prefix__cls-7"
          transform="translate(90.48 34.796)"
        />
        <Path
          id="prefix__Path_3-2"
          d="M-.393 0l-7.89 8.047a1.16 1.16 0 00.273 1.83L1.378 15"
          className="prefix__cls-7"
          transform="translate(171.039 34.88)"
        />
        <Path
          id="prefix__lines"
          fill="none"
          stroke={color || primary}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={2.5}
          d="M161.356 4.991L148.48 19.436zM131.08 0zm-30.16 4.991l12.875 14.445z"
          opacity={0.55}
        />
      </G>
    </Svg>
  );
}

export {EmptyCart};
