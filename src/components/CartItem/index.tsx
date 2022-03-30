import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {I18nManager, Pressable, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button, Text, useTheme} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {
  calcFont,
  calcHeight,
  calcWidth,
  SCREEN_WIDTH,
} from '../../constants/style/sizes';
import {cartContext} from '../../contexts';
import CartCounter from './CartCounter';

interface Props {
  price: string;
  name: string;
  initialAmount?: number;
  onDeleteItemPressed: () => void;
  image: string;
  currency: string;
  amount: number;
  onItemPressed: () => void;
  quantity?: number;
  itemKey: number;
  unlimited: number;
}

const CartItem = ({
  price,
  initialAmount = 1,
  name,
  onDeleteItemPressed,
  image,
  onItemPressed,
  amount,
  itemKey,
  quantity = 1,
  unlimited,
}: Props) => {
  const {t} = useTranslation();
  const {onChangeAmount} = useContext(cartContext);
  const {
    colors: {primary},
  } = useTheme();
  const onDecreasePressed = () =>
    onChangeAmount(
      amount <= initialAmount ? initialAmount : +amount - 1,
      itemKey,
    );
  const onIncreasePressed = () =>
    onChangeAmount(
      amount < initialAmount ? initialAmount : +amount + 1,
      itemKey,
    );
  return (
    <Pressable onPress={onItemPressed} style={styles.container}>
      <View style={styles.imageContainer}>
        <FastImage
          source={{uri: image}}
          style={styles.image}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <View style={styles.nameContainer}>
            <Text /* numberOfLines={2} */ style={styles.name}>{name}</Text>
          </View>
          <Text style={[styles.price, {color: primary}]}>{price}</Text>
        </View>
        <View style={styles.row}>
          {/* counrer */}
          <CartCounter
            amount={amount}
            onDecreasePressed={onDecreasePressed}
            onIncreasePressed={onIncreasePressed}
            quantity={quantity}
            unlimited={unlimited}
          />
          <Button
            style={{
              opacity: 0.48,
              //backgroundColor: 'red',
            }}
            onPress={onDeleteItemPressed}
            icon="trash-can-outline"
            labelStyle={{marginStart: calcFont(5.3), marginEnd: 0}}
            theme={{colors: {primary: '#222'}}}>
            {t('cart:remove')}
          </Button>
        </View>
      </View>
    </Pressable>
  );
};

export {CartItem};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - calcWidth(20),
    // height: calcHeight(140),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.CART_ITEM_BORDER,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //paddingVertical: calcFont(10),
  },
  imageContainer: {
    width: calcWidth(75),
    height: calcHeight(75),
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameContainer: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: calcFont(18),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.32,
    color: COLORS.HEADER_TEXT,
  },
  price: {
    //width: calcWidth(53),
    fontSize: calcFont(14),
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0.6,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    //color: COLORS.MAINCOLOR,
  },
});
