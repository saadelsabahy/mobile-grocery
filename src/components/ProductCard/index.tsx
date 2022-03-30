/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/core';
import React, {useContext, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {IconButton, Text, useTheme} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {calcFont, calcHeight, calcWidth} from '../../constants/style/sizes';
import {
  AuthenticationContext,
  cartContext,
  FavouritesContext,
} from '../../contexts';
import {CartItem, ChangeAmountEnum, Product} from '../../interfaces';
import {itemQuentityInCart} from '../../utils';
import {CustomButton} from '../CustomButton';
import IncreaseAndDecreaseAmount from '../IncreaseAndDecrease';
import {SaveSign} from '../SaveSign';

interface Props {
  image: string | undefined;
  name: string;
  price: string;
  onProductPressed: () => void;
  id: string;
  quantity: number;
  hasDiscount?: string | false;
  containerStyle?: ViewStyle;
  discountValue?: number;
}

const ProductCard = ({
  image,
  name,
  price,
  id,
  quantity,
  onProductPressed,
  containerStyle,
  discountValue,
}: Props) => {
  const {t} = useTranslation();
  const [amount, setamount] = useState<number>(1);
  const [selectedForTransaction, setselectedForTransaction] = useState<string>(
    '',
  );
  const {
    cartProducts,
    addToCart,
    removeCartItem,
    addTocartLoading,
    removeFromCartLoading,
    onChangeAmount,
  } = useContext(cartContext);
  const {favourites, addToFavourites, removeFromFavourites} = useContext(
    FavouritesContext,
  );
  const {
    state: {userToken},
  } = useContext(AuthenticationContext);
  const {
    colors: {primary},
  } = useTheme();
  const navigation = useNavigation();
  const cartProductsIds = [
    ...new Set(
      cartProducts?.products?.map((item: CartItem) => item.product_id),
    ),
  ];
  const favouritesProductsIds = [
    ...new Set(favourites?.map((item: Product) => item.product_id)),
  ];
  const liked = favouritesProductsIds.includes(id);
  const addedToCart = cartProductsIds.includes(id);
  const cartItemQuantity: number = itemQuentityInCart(
    addedToCart,
    cartProducts?.products!,
    id,
  );
  const onAddToFavouritePressed = () => {
    if (userToken) {
      liked ? removeFromFavourites(id) : addToFavourites(id);
    } else {
      navigation.navigate('Auth');
    }
  };
  const onAddToCartPressed = async () => {
    setselectedForTransaction(id);
    addedToCart
      ? await removeCartItem(id, name)
      : await addToCart(id, name, {}, amount);
    setselectedForTransaction('');
  };
  const onChangeProductAmount = (type: ChangeAmountEnum) => {
    if (type == ChangeAmountEnum.INCREASE) {
      setamount(prev => (prev < quantity ? prev + 1 : quantity));
    } else {
      setamount(prev => (prev > 1 ? prev - 1 : 1));
    }
  };

  useEffect(() => {
    addedToCart && onChangeAmount(amount, +id);
    return () => {
      setselectedForTransaction('');
    };
  }, [amount]);
  useEffect(() => {
    setamount(addedToCart ? cartItemQuantity : 1);
    return () => {};
  }, [cartItemQuantity]);
  //reactotron.log({image});

  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable style={[styles.imageContainer]} onPress={onProductPressed}>
        <FastImage
          source={{uri: image || ''}}
          resizeMode={FastImage.resizeMode.contain}
          style={{width: '100%', height: '100%'}}
        />
      </Pressable>
      <Text style={[styles.price, {color: primary}]} onPress={onProductPressed}>
        {price}
      </Text>
      <View style={styles.nameContainer}>
        <Text numberOfLines={2} style={styles.name} onPress={onProductPressed}>
          {name}
        </Text>
      </View>

      {/* counter or add to cart */}
      <View style={styles.seperator}>
        {!addedToCart ? (
          <CustomButton
            mode={'contained'}
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={onAddToCartPressed}
            loading={
              id == selectedForTransaction &&
              (addTocartLoading || removeFromCartLoading)
            }>
            {addedToCart
              ? t('categoriesDetailesScreen:removeFromCart')
              : t('categoriesDetailesScreen:addToCart')}
          </CustomButton>
        ) : (
          <IncreaseAndDecreaseAmount
            onChangeAmount={onChangeProductAmount}
            amount={
              amount // cartProducts?.products?.find((item) => item.key == id).quantity
            }
            itemKey={+id}
            quantity={+quantity}
          />
        )}
      </View>
      {/* add to wishlist */}
      <View style={[styles.absoluteRow]}>
        {!!discountValue && discountValue < 100 && (
          <SaveSign
            text={
              `${discountValue}% ${t('general:discount')}` ||
              `20%'${t('general:discount')}`
            }
          />
        )}
        <IconButton
          icon={liked ? 'heart' : 'heart-outline'}
          onPress={onAddToFavouritePressed}
          color={primary}
          size={calcFont(20)}
          style={styles.addToFavoriteIcon}
        />
      </View>
    </View>
  );
};

export {ProductCard};

const styles = StyleSheet.create({
  container: {
    width: calcWidth(165),
    height: 'auto',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    shadowColor: COLORS.BLACK,
    borderRadius: calcFont(8),
    marginEnd: calcFont(14.4),
    marginVertical: calcFont(19),
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  imageContainer: {
    width: calcWidth(107.4),
    height: calcHeight(85.9),
  },
  price: {
    fontSize: calcFont(12),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.29,
    textAlign: 'center',
  },
  nameContainer: {
    flex: 1,
    minHeight: calcHeight(50),
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'red',
  },
  name: {
    fontSize: calcFont(12),
    fontWeight: 'normal',
    fontStyle: 'normal',
    //letterSpacing: -0.33,
    textAlign: 'center',
    color: COLORS.SECTION_TITLE,
    paddingHorizontal: calcFont(15),
  },
  seperator: {
    flex: 1,
    width: '100%',
    borderTopWidth: 1,
    borderColor: COLORS.PRODUCT_SEPERATOR,
    marginTop: calcFont(8.4),
    justifyContent: 'center',
    alignItems: 'center',

    //backgroundColor: 'red',
  },
  button: {
    width: calcWidth(117),
    height: calcHeight(25),
    borderRadius: calcFont(4),

    justifyContent: 'center',
    alignItems: 'center',
    marginTop: calcFont(7.6),
    marginBottom: calcFont(7.1),
    overflow: 'hidden',
  },
  buttonLabel: {
    fontSize: calcFont(10),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    //color: COLORS.WHITE,
    height: calcHeight(25 - calcFont(10 / 2)),
  },
  absoluteRow: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
  },
  addToFavoriteIcon: {
    marginTop: 0,
    paddingTop: 0,
    position: 'absolute',
    top: 0,
    end: 0,
  },
});
