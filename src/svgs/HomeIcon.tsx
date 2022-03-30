import * as React from 'react';
import Svg, {SvgProps, Defs, ClipPath, Path, G} from 'react-native-svg';
import {calcFont, calcHeight, calcWidth} from '../constants/style/sizes';
/* SVGR has dropped some elements not supported by react-native-svg: style */
interface Props extends SvgProps {
  color?: string;
}
const width = calcFont(23);
const height = calcFont(23);
function HomeIcon({color, ...props}: Props) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      {...props}>
      <Defs>
        <ClipPath id="prefix__clip-path">
          <Path
            id="prefix__Path_92"
            d="M48.975-31.551l-.047-.059s-.005-.008-.01-.01l-.055-.062-9.663-9.911-.647-.665a.773.773 0 00-1.11 0L27.138-31.68a1.641 1.641 0 00-.4.683l-.015.054-.007.028-.007.031a.408.408 0 00-.01.054.016.016 0 010 .01 1.451 1.451 0 00-.025.234v.085a.2.2 0 000 .038.174.174 0 000 .036v.039a.29.29 0 00.005.046v.023l.007.064a1.633 1.633 0 001.6 1.376h1.063v8.366h17.298v-8.361h1.085a1.54 1.54 0 00.613-.126 1.662 1.662 0 00.52-.357 1.655 1.655 0 00.467-1.163 1.653 1.653 0 00-.357-1.031zM39.4-22.362h-2.8V-27.6h2.8zm5.447-8.361v8.361H41v-5.853a1.013 1.013 0 00-1-1.027h-4a1.013 1.013 0 00-1 1.027v5.853h-3.847v-8.361h-2.4L38-40.212l.578.593 8.67 8.9z"
          />
        </ClipPath>
        <ClipPath id="prefix__clip-path-2">
          <Path id="prefix__Path_91" d="M0 0h375v-51H0z" />
        </ClipPath>
      </Defs>
      <G
        id="prefix__ic_home_active"
        clipPath="url(#prefix__clip-path)"
        transform="translate(-26.67 42.493)">
        <G id="prefix__Group_78" clipPath="url(#prefix__clip-path-2)">
          <Path
            id="prefix__Path_90"
            fill={color}
            d="M21.67-47.493h32.663v31.98H21.67z"
          />
        </G>
      </G>
    </Svg>
  );
}

export {HomeIcon};
