import * as React from 'react';
import {useTheme} from 'react-native-paper';
import Svg, {Circle, Path, SvgProps} from 'react-native-svg';
import {COLORS} from '../constants/style';
import {calcFont} from '../constants/style/sizes';
const width = calcFont(26);
const height = calcFont(30);
interface Props extends SvgProps {}
function CheckedCheckBox({...props}: Props) {
  const {
    colors: {primary},
  } = useTheme();
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      {...props}>
      <Circle cx={12} cy={12} r={12} fill={primary} />
      <Path
        fill={COLORS.WHITE}
        d="M15.494 8.758a.882.882 0 011.248 1.248L11.447 15.3a.882.882 0 01-1.247 0l-2.942-2.941a.882.882 0 111.248-1.248l2.318 2.318z"
      />
    </Svg>
  );
}

export {CheckedCheckBox};
