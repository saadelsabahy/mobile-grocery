import React from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {IconButton, Text, useTheme} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {calcFont, calcHeight, calcWidth} from '../../constants/style/sizes';

interface Props {
  amount: number;
  onDecreasePressed: () => void;
  onIncreasePressed: () => void;
  product?: boolean;
  containerStyle?: ViewStyle;
  countStyle?: TextStyle;
  quantity: number;
  unlimited?: number;
}

const CartCounter = ({
  amount = 1,
  product,
  onDecreasePressed,
  onIncreasePressed,
  containerStyle,
  countStyle,
  quantity,
  unlimited = 0,
}: Props) => {
  // console.log(
  //   {unlimited, amount, quantity},
  //   +amount === +quantity,
  //   +unlimited ? false : +amount === +quantity ? true : false,
  // );
  const {
    colors: {primary},
  } = useTheme();
  return (
    <View style={[styles.container, containerStyle]}>
      <IconButton
        icon="plus"
        style={[
          styles.icon,
          {backgroundColor: product ? COLORS.COUNTER_ICON_BG : undefined},
        ]}
        color={COLORS.HEADER_TEXT}
        onPress={onIncreasePressed}
        disabled={+unlimited ? false : +amount === +quantity ? true : false}
      />
      <View style={[styles.numberContainer, {borderWidth: product ? 0 : 0.5}]}>
        <Text
          style={[
            styles.count,
            {color: primary},
            countStyle,
          ]}>{`${amount}`}</Text>
      </View>
      <IconButton
        icon={'minus'}
        style={[
          styles.icon,
          {backgroundColor: product ? COLORS.COUNTER_ICON_BG : undefined},
        ]}
        color={COLORS.HEADER_TEXT}
        onPress={onDecreasePressed}
        disabled={+amount === 1}
      />
    </View>
  );
};

export default CartCounter;

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //backgroundColor: 'red',
  },
  numberContainer: {
    minWidth: calcWidth(24),
    minHeight: calcHeight(26),
    borderRadius: calcFont(4),
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: '#868686',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    //backgroundColor: 'red',
    marginStart: 0,
    padding: 0,
    marginEnd: 0,
  },
  count: {
    fontSize: calcFont(16),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.28,
    //color: COLORS.MAINCOLOR,
  },
});
