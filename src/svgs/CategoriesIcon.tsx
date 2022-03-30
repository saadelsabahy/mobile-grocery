import * as React from 'react';
import Svg, {SvgProps, G, Rect} from 'react-native-svg';
import {calcFont} from '../constants/style/sizes';
interface Props extends SvgProps {
  color?: string;
}
const width = calcFont(23);
const height = calcFont(23);
function CategoriesIcon({color, ...props}: Props) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      {...props}>
      <G
        transform="translate(-255 -44)"
        fill="none"
        stroke={color}
        strokeWidth={2}>
        <Rect
          data-name="Rectangle 1599"
          width={8}
          height={8}
          rx={1}
          transform="translate(256 45)"
        />
        <Rect
          data-name="Rectangle 1601"
          width={8}
          height={8}
          rx={1}
          transform="translate(256 57)"
        />
        <Rect
          data-name="Rectangle 1600"
          width={8}
          height={8}
          rx={1}
          transform="translate(268 45)"
        />
        <Rect
          data-name="Rectangle 1602"
          width={8}
          height={8}
          rx={1}
          transform="translate(268 57)"
        />
        <Rect
          data-name="Rectangle 1599"
          width={8}
          height={8}
          rx={1}
          transform="translate(256 45)"
        />
        <Rect
          data-name="Rectangle 1601"
          width={8}
          height={8}
          rx={1}
          transform="translate(256 57)"
        />
        <Rect
          data-name="Rectangle 1600"
          width={8}
          height={8}
          rx={1}
          transform="translate(268 45)"
        />
        <Rect
          data-name="Rectangle 1602"
          width={8}
          height={8}
          rx={1}
          transform="translate(268 57)"
        />
      </G>
    </Svg>
  );
}

export {CategoriesIcon};
