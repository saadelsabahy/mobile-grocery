import * as React from 'react';
import {useTheme} from 'react-native-paper';
import Svg, {Defs, G, Path, SvgProps} from 'react-native-svg';

function EmptyItems(props: SvgProps) {
  const {
    colors: {primary},
  } = useTheme();
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={250.56}
      height={154.051}
      viewBox="0 0 250.56 154.051"
      {...props}>
      <Defs />
      <G id="prefix__no_products" transform="translate(-56.22 -291.75)">
        <G id="prefix__ic_cart" transform="translate(56.22 293)">
          <Path
            id="prefix__Background"
            fill="#5faf50"
            d="M234.32 73.08a8.12 8.12 0 118.12 8.12 8.119 8.119 0 01-8.12-8.12zM162.4 81.2a8.151 8.151 0 01-1.74-.186 8.151 8.151 0 01-1.74.186H53.36a8.12 8.12 0 110-16.24H8.12a8.12 8.12 0 010-16.241h46.4a8.12 8.12 0 100-16.24h-29a8.12 8.12 0 110-16.241h46.4A8.12 8.12 0 0171.92 0h66.12a8.12 8.12 0 010 16.24h74.24a8.12 8.12 0 010 16.241h25.52a8.12 8.12 0 010 16.24h-22.04a8.12 8.12 0 000 16.241h6.961a8.12 8.12 0 010 16.24z"
            opacity={0.123}
            transform="translate(0 31.32)"
          />
          <Path
            id="prefix__line"
            fill="none"
            stroke="#5faf50"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={2.5}
            d="M212.428 125.86zm-31.469 0zm-119.479 0zm-14.932 0z"
          />
          <Path
            id="prefix__lines"
            fill="none"
            stroke={primary}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={2.5}
            d="M164.356 4.991L151.48 19.436zM134.08 0zm-30.16 4.991l12.875 14.445z"
            opacity={0.55}
          />
        </G>
        <Path
          id="prefix__Path_312"
          stroke={primary}
          d="M2241.463 3969.4l-20.609-11.176-14.786-14.2-45.337 25.372 13.251 13.326-13.251 17.532 13.251 7.616v26.256l46.872 25.618 45.642-25.618v-26.256l15.136-9.7-16.235-15.446z"
          transform="translate(-2031 -3616)"
        />
        <G id="prefix__box_1_" transform="translate(126.156 325.24)">
          <Path
            fill={primary}
            id="prefix__Path_309"
            d="M112.6 42.71l13.36-13.36a2.475 2.475 0 00-.559-3.918l-16.062-8.82a2.474 2.474 0 00-2.382 4.338l13.172 7.233-11.463 11.464L67.426 17 78.892 5.537 90.481 11.9a2.474 2.474 0 002.382-4.338L79.646.305a2.473 2.473 0 00-2.94.419L63.344 14.086 49.982.725a2.475 2.475 0 00-2.94-.419L1.284 25.431a2.475 2.475 0 00-.558 3.919l13.36 13.36L.726 56.07a2.474 2.474 0 00.559 3.918l13.827 7.593v25.38A2.475 2.475 0 0016.4 95.13l45.758 25.125a2.474 2.474 0 002.382 0l45.753-25.125a2.475 2.475 0 001.284-2.17V67.581l13.823-7.592a2.475 2.475 0 00.559-3.918zm-49.258 22.3l-40.617-22.3 40.617-22.3 40.617 22.3zM47.8 5.537L59.261 17 18.022 39.647 6.557 28.182zM18.024 45.772l41.239 22.645L47.8 79.883 6.557 57.238zm88.6 45.725l-40.806 22.409V88.612a2.474 2.474 0 10-4.949 0v25.293L20.06 91.5V70.3l26.982 14.815a2.474 2.474 0 002.94-.419l13.362-13.362L76.705 84.7a2.474 2.474 0 002.94.419L106.627 70.3zM78.892 79.883L67.426 68.416l41.239-22.644 11.467 11.465zm0 0"
            className="prefix__cls-5"
          />
          <Path
            fill={primary}
            id="prefix__Path_310"
            d="M397.275 53.124a2.477 2.477 0 10-1.749-.726 2.5 2.5 0 001.749.726zm0 0"
            className="prefix__cls-5"
            transform="translate(-297.113 -36.256)"
          />
          <Path
            //stroke={primary}
            fill={primary}
            id="prefix__Path_311"
            d="M248.474 314.926a2.475 2.475 0 101.749.725 2.49 2.49 0 00-1.749-.725zm0 0"
            className="prefix__cls-5"
            transform="translate(-185.131 -237.003)"
          />
        </G>
      </G>
    </Svg>
  );
}

export {EmptyItems};
