import * as React from 'react';
import Svg, {SvgProps, Path, Rect} from 'react-native-svg';
import {calcFont} from '../constants/style/sizes';

const width = calcFont(28);
const height = calcFont(28);
function GoogleIcon(props: SvgProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      {...props}>
      <Rect width={width} height={width} fill="#fff" rx={calcFont(4)} />
      <Path
        fill="#ea4335"
        d="M14 10.279a3.363 3.363 0 012.346.9l1.711-1.669A5.829 5.829 0 0014 7.933a6.062 6.062 0 00-5.42 3.343l1.962 1.524A3.667 3.667 0 0114 10.279z"
      />
      <Path
        fill="#4285f4"
        d="M19.824 14.135a5.2 5.2 0 00-.124-1.24H14v2.251h3.343a2.965 2.965 0 01-1.243 1.969l1.917 1.48a5.931 5.931 0 001.807-4.46z"
      />
      <Path
        fill="#fbbc05"
        d="M10.548 15.2a3.734 3.734 0 01-.2-1.2 3.925 3.925 0 01.2-1.2L8.58 11.277a6.054 6.054 0 000 5.447z"
      />
      <Path
        fill="#34a853"
        d="M14 20.067a5.782 5.782 0 004.017-1.467l-1.914-1.486a3.591 3.591 0 01-2.1.607 3.652 3.652 0 01-3.454-2.521l-1.962 1.523A6.052 6.052 0 0014 20.067z"
      />
    </Svg>
  );
}

export {GoogleIcon};
