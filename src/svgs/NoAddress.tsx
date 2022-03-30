import * as React from 'react';
import {useTheme} from 'react-native-paper';
import Svg, {Defs, G, Path, SvgProps} from 'react-native-svg';
import {COLORS} from '../constants/style';
import {calcFont} from '../constants/style/sizes';
/* SVGR has dropped some elements not supported by react-native-svg: style */

const width = calcFont(167);
const height = calcFont(112.327);

function NoAddress(props: SvgProps) {
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
      <G id="prefix__ic_location" transform="translate(0 1.768)">
        <Path
          id="prefix__Background"
          fill="#ebf5ea"
          d="M46 70a7 7 0 110-14H7a7 7 0 110-14h40a7 7 0 000-14H22a7 7 0 010-14h40a7 7 0 110-14h98a7 7 0 010 14h-40a7 7 0 110 14h22a7 7 0 010 14h-10.174c-4.875 0-8.826 3.134-8.826 7s6 7 6 7a7 7 0 010 14zm107-35a7 7 0 117 7 7 7 0 01-7-7z"
          transform="translate(0 21)"
        />
        <Path
          id="prefix__cloud"
          d="M11.927 37h-.948a10.963 10.963 0 110-21.926h.121A16.715 16.715 0 0127.448 0C36.329 0 43.569 7.313 43.9 16.466 49.274 16.813 54 22.04 54 27.49c0 4.475-3.314 9.51-7.24 9.51h-27.3"
          transform="translate(13.844 12)"
        />
        <G id="prefix__Shape" strokeWidth={2} fill="#fff" strokeMiterlimit={10}>
          <Path
            d="M40.004 105.31a4.735 4.735 0 01-3.693-1.758c-11.678-14.4-20.554-27.079-26.38-37.687C4.17 55.38 1.25 46.676 1.25 40a38.495 38.495 0 013.045-15.083A38.607 38.607 0 0112.6 12.6a38.596 38.596 0 0112.317-8.305A38.513 38.513 0 0140 1.25a38.495 38.495 0 0115.083 3.045A38.607 38.607 0 0167.4 12.6a38.596 38.596 0 018.305 12.317A38.513 38.513 0 0178.75 40c0 6.676-2.92 15.379-8.68 25.865-5.827 10.608-14.703 23.288-26.38 37.687a4.79 4.79 0 01-.698.697 4.697 4.697 0 01-2.988 1.06z"
            transform="translate(43 4)"
            stroke={primary}
          />
          <Path
            d="M40.004 104.06c.809 0 1.57-.27 2.2-.782a3.47 3.47 0 00.514-.514c11.631-14.341 20.465-26.958 26.256-37.5C74.63 54.964 77.5 46.464 77.5 40a37.386 37.386 0 00-10.983-26.516 37.372 37.372 0 00-11.921-8.038C49.974 3.49 45.064 2.5 40 2.5s-9.974.991-14.596 2.946a37.373 37.373 0 00-11.92 8.038 37.356 37.356 0 00-8.038 11.92A37.241 37.241 0 002.5 40c0 6.464 2.869 14.963 8.526 25.264 5.79 10.542 14.625 23.159 26.256 37.5a3.487 3.487 0 002.722 1.296m0 2.5a5.989 5.989 0 01-4.664-2.221C11.78 75.289 0 53.843 0 40 0 17.909 17.909 0 40 0s40 17.909 40 40c0 13.843-11.78 35.29-35.34 64.339a6 6 0 01-4.656 2.22z"
            transform="translate(43 4)"
            stroke={primary}
          />
        </G>
        <G
          id="prefix__Oval"
          fill="#f3f7ff"
          stroke={primary}
          strokeWidth={2}
          strokeMiterlimit={10}>
          <Path
            d="M20 38.75c-3.63 0-7.152-1.039-10.184-3.004a18.81 18.81 0 01-7.492-9.474A18.708 18.708 0 011.25 20c0-2.532.496-4.987 1.473-7.298a18.665 18.665 0 014.019-5.96 18.665 18.665 0 015.96-4.019C15.012 1.746 17.468 1.25 20 1.25s4.987.496 7.298 1.473a18.665 18.665 0 015.96 4.019 18.665 18.665 0 014.019 5.96c.977 2.31 1.473 4.766 1.473 7.298s-.496 4.987-1.473 7.298a18.665 18.665 0 01-4.019 5.96 18.665 18.665 0 01-5.96 4.019A18.635 18.635 0 0120 38.75z"
            transform="translate(63 24)"
          />
          <Path
            d="M20 37.5c4.674 0 9.07-1.82 12.374-5.126C35.68 29.07 37.5 24.674 37.5 20s-1.82-9.07-5.126-12.374C29.07 4.32 24.674 2.5 20 2.5S10.93 4.32 7.626 7.626A17.38 17.38 0 002.5 20c0 2.01.337 3.98 1.002 5.854a17.437 17.437 0 002.778 5.01 17.543 17.543 0 004.216 3.833A17.425 17.425 0 0020 37.5m0 2.5a19.904 19.904 0 01-10.864-3.205 20.115 20.115 0 01-4.814-4.377A19.91 19.91 0 010 20C0 8.954 8.954 0 20 0s20 8.954 20 20-8.954 20-20 20z"
            transform="translate(63 24)"
          />
        </G>
        <Path
          id="prefix__Star"
          fill="none"
          stroke="#a3db99"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={2.5}
          d="M125.79 13.224a9 9 0 00-5.014-5.014l-1.771-.71 1.777-.711a9 9 0 005.013-5.013L126.5.004l.71 1.777a9 9 0 005.014 5.014l1.771.705-1.771.71a9 9 0 00-5.013 5.014l-.711 1.77z"
        />
        <Path
          id="prefix__cloud-2"
          d="M8.691 27H8a8 8 0 010-16h.085A12.187 12.187 0 0120 0a12.235 12.235 0 0111.991 12.016 8.346 8.346 0 017.356 8.044c0 3.266-2.415 6.94-5.276 6.94H14.178"
          transform="translate(97 64)"
        />
      </G>
    </Svg>
  );
}

export {NoAddress};
