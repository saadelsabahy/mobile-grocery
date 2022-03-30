import React from 'react';
import {View, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {calcFont, calcHeight, calcWidth} from '../../constants/style/sizes';

interface Props {}

const OrdersMap = (props: Props) => {
  return (
    <View
      style={{
        width: calcWidth(335),
        height: calcHeight(170),
        borderRadius: calcFont(12),
        overflow: 'hidden',
        alignSelf: 'center',
        marginVertical: calcFont(20),
      }}>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        pitchEnabled={false}
        rotateEnabled={false}
        zoomEnabled={false}
        scrollEnabled={false}>
        <Marker coordinate={{latitude: 37.78825, longitude: -122.4324}} />
      </MapView>
    </View>
  );
};

export {OrdersMap};
