import * as React from 'react';
import Svg, {SvgProps, Path, Rect} from 'react-native-svg';
import {calcFont} from '../constants/style/sizes';
const width = calcFont(28);
const height = calcFont(28);
function FacebookIcon(props: SvgProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      {...props}>
      <Rect width={width} height={width} fill="#fff" rx={calcFont(4)} />
      <Path
        fill="#395998"
        d="M15.155 21v-7h2.071l.274-2.413h-2.345V10.38c0-.629.064-.966 1.033-.966h1.297V7h-2.071c-2.488 0-3.363 1.17-3.363 3.138v1.449H10.5V14h1.551v7z"
      />
    </Svg>
  );
}

export {FacebookIcon};
