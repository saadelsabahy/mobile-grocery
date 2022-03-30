import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {
  calcFont,
  calcHeight,
  calcWidth,
  ROUNDED_BORDER,
  SCREEN_WIDTH,
} from '../../constants/style/sizes';

interface Props {}
const CustomMarkerComponent = ({borderColor}: {borderColor: string}) => {
  return <View style={[styles.customMarker, {borderColor}]} />;
};
const CustomSlider = (props: Props) => {
  const [sliderValue, setsliderValue] = useState<number[]>([0]);
  const {
    colors: {primary},
  } = useTheme();
  return (
    <View style={{alignItems: 'center'}}>
      <Text style={styles.sliderText}>{`${sliderValue} kg`}</Text>
      <MultiSlider
        onValuesChange={v => setsliderValue(v)}
        selectedStyle={{backgroundColor: primary}}
        unselectedStyle={{backgroundColor: '#ddd'}}
        customMarker={() => <CustomMarkerComponent borderColor={primary} />}
        sliderLength={SCREEN_WIDTH - 43}
        allowOverlap={true}
      />
    </View>
  );
};

export {CustomSlider};

const styles = StyleSheet.create({
  customMarker: {
    width: calcWidth(18),
    height: calcHeight(18),
    backgroundColor: COLORS.WHITE,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: ROUNDED_BORDER,
  },
  sliderText: {
    fontSize: calcFont(30),
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
});
