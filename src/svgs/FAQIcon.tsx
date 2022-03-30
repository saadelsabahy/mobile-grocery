import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';
import {COLORS} from '../constants/style';
import {calcFont} from '../constants/style/sizes';
interface Props extends SvgProps {
  color?: string;
}
const width = calcFont(22);
const height = calcFont(22);
function FaqIcon({color, ...props}: Props) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      {...props}>
      <G>
        <Path fill="none" d="M0 0h24v24H0z" />
        <Path
          fill={color || COLORS.SETTINGS_LIST_ITEM_LEFT}
          d="M18.666 17h-10a.833.833 0 000 1.667h10v.833a.759.759 0 01-.833.833h-10a2.435 2.435 0 01-2.5-2.5V6.167a2.435 2.435 0 012.5-2.5h10a.759.759 0 01.833.833z"
        />
      </G>
    </Svg>
  );
}

export {FaqIcon};
