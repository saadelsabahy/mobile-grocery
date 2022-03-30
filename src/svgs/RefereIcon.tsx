import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';
import {COLORS} from '../constants/style';
import {calcFont} from '../constants/style/sizes';
interface Props extends SvgProps {
  color?: string;
}
const width = calcFont(22);
const height = calcFont(22);
function RefereIcon({color, ...props}: Props) {
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
          d="M6.9 20A2.983 2.983 0 014 16.939V7.758A2.983 2.983 0 016.9 4.7h3.551a.746.746 0 01.725.766.746.746 0 01-.725.765H6.9a1.491 1.491 0 00-1.45 1.53v9.181A1.492 1.492 0 006.9 18.47h8.7a1.492 1.492 0 001.45-1.531v-1.53a.726.726 0 111.45 0v1.53A2.984 2.984 0 0115.6 20zm.724-4.984v-1.215a6.528 6.528 0 011.6-4.714c1.164-1.23 2.899-1.443 4.976-1.54V4.574A.56.56 0 0114.739 4a.529.529 0 01.361.149l4.718 4.518a.6.6 0 01.037.81l-.033.036-4.717 4.612a.525.525 0 01-.769-.032.593.593 0 01-.136-.393v-2.952a10.6 10.6 0 00-3.106.412q-1.832.616-2.835 3.481a.546.546 0 01-.51.374z"
        />
      </G>
    </Svg>
  );
}

export {RefereIcon};
