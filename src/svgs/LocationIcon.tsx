import * as React from 'react';
import {useTheme} from 'react-native-paper';
import Svg, {ClipPath, Defs, G, Path, SvgProps} from 'react-native-svg';
import {COLORS} from '../constants/style';
import {calcFont} from '../constants/style/sizes';

interface Props extends SvgProps {
  color?: string;
}
const width = calcFont(23);
const height = calcFont(23);

function LocationIcon({color, ...props}: Props) {
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
            id="prefix__Path_49"
            d="M38-43a7 7 0 00-7 7c0 4.17 4.42 9.92 6.24 12.11a.993.993 0 001.53 0C40.58-26.08 45-31.83 45-36a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 01-2.5-2.5 2.5 2.5 0 012.5-2.5 2.5 2.5 0 012.5 2.5 2.5 2.5 0 01-2.5 2.5z"
          />
        </ClipPath>
        <ClipPath id="prefix__clip-path-2">
          <Path id="prefix__Path_48" d="M1 960h375V-202H1z" />
        </ClipPath>
      </Defs>
      <G
        id="prefix__ic_location"
        clipPath="url(#prefix__clip-path)"
        transform="translate(-31 43)">
        <G id="prefix__Group_44" clipPath="url(#prefix__clip-path-2)">
          <Path
            id="prefix__Path_47"
            fill={color || primary}
            d="M26-48h24v29.47H26z"
          />
        </G>
      </G>
    </Svg>
  );
}

export {LocationIcon};
