import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';
import {COLORS} from '../constants/style';
import {calcFont} from '../constants/style/sizes';
import {I18nManager} from 'react-native';

const width = calcFont(24);
const height = calcFont(24);
function BackIcon(props: SvgProps) {
  return (
    <Svg
      data-name="icon/24/back"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{transform: [{rotate: I18nManager.isRTL ? '180deg' : '0deg'}]}}
      {...props}>
      <G data-name="icon/24/back">
        <Path fill="none" d="M0 0h24v24H0z" />
        <Path
          d="M10.414 12l5.293-5.293a1 1 0 00-1.414-1.414l-6 6a1 1 0 000 1.414l6 6a1 1 0 101.414-1.414z"
          fill={COLORS.HEADER_TEXT}
        />
      </G>
    </Svg>
  );
}

export {BackIcon};
