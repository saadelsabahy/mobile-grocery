/* eslint-disable react-hooks/exhaustive-deps */
import {useFocusEffect} from '@react-navigation/native';
import React, {useContext, useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Linking, Platform, StyleSheet, View} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {
  CartDeleteDialog,
  CartFooter,
  CartItem,
  CustomHeader,
  CustomModal,
  EmptyComponent,
  FlatlistWithCustomScrollIndicator,
  Loader,
} from '../../components';
import {STORE_URL} from '../../constants/config.constants';
import {COLORS} from '../../constants/style';
import {calcFont} from '../../constants/style/sizes';
import {
  AuthenticationContext,
  cartContext,
  ProductContext,
} from '../../contexts';
import useEffectUpdate from '../../hooks/useEffectUpdate';
import {CartItem as CartItemType, CartItemOption} from '../../interfaces';
import {EmptyCart} from '../../svgs';

interface Props {
  navigation: any;
}
const checkOut =
  Platform.OS === 'ios'
    ? 'index.php?route=checkout/checkout&ismobile=1&token='
    : 'index.php?route=checkout/checkout&token=';
const Cart = ({navigation}: Props) => {
  const {t} = useTranslation();
  const leaveCartAfterCheckoutRef = useRef(false);
  const {
    cartProducts,
    isCartLoading,
    reftchCart,
    removeCartItem,
    isCartFetching,
  } = useContext(cartContext);
  const {setSelectedOptions} = useContext(ProductContext);
  const {
    state: {storeToken},
  } = useContext(AuthenticationContext);
  const [deleteModalVisible, setdeleteModalVisible] = useState(false);
  const [selectedForRemove, setselectedForRemove] = useState<
    | {
        key: string;
        name: string;
      }
    | {}
  >({});

  const onPullToRefresh = async () => {
    // setrefresh(true);
    reftchCart();
    // setrefresh(false);
  };
  const checkOutUrl = useMemo(() => STORE_URL + '/' + checkOut + storeToken, [
    storeToken,
  ]);
  const goToHome = () => {
    navigation.navigate('Home');
  };

  const leaveCart = () => {
    !cartProducts?.products.length && leaveCartAfterCheckoutRef.current
      ? goToHome()
      : null;
  };
  const oncheckoutPressed = React.useCallback(async () => {
    // reactotron.log(checkOutUrl);

    try {
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(checkOutUrl, {
          ...Platform.select({
            // iOS Properties
            ios: {
              dismissButtonStyle: 'close',
              readerMode: false,
              animated: true,
              modalEnabled: true,
              enableBarCollapsing: false,
            },
            // Android Properties
            android: {
              showTitle: true,
              enableUrlBarHiding: true,
              enableDefaultShare: true,
              forceCloseOnRedirection: false,
            },
          }), // Specify full animation resource i
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
        }).then(async res => {
          console.log('res', res);
          if (res.type && res.type === 'cancel') {
            reftchCart();
          }
        });
      } else {
        Linking.openURL(checkOutUrl);
      }
      leaveCartAfterCheckoutRef.current = true;
    } catch (error) {
      console.log(error);
    }
  }, [cartProducts?.products.length]);
  useEffectUpdate(leaveCartAfterCheckoutRef.current ? leaveCart : () => null);
  useFocusEffect(
    React.useCallback(() => {
      reftchCart();
      return () => {
        leaveCartAfterCheckoutRef.current = false;
      };
    }, []),
  );
  //console.log(leaveCartAfterCheckoutRef);
  const onItemPressed = (productId: string, options: CartItemOption[]) => {
    navigation.navigate('ProductStack', {
      screen: 'Product',
      params: {id: productId, options},
    });
  };
  const onConfirmRemove = async () => {
    removeCartItem(selectedForRemove.key, selectedForRemove.name);
    setselectedForRemove({});
    hideModal();
  };
  const onDeleteItemPressed = (key: string, name: string) => {
    leaveCartAfterCheckoutRef.current = false;
    setdeleteModalVisible(true);
    setselectedForRemove({key, name});
  };
  const hideModal = () => setdeleteModalVisible(false);

  const renderEmptyCart = () => (
    <EmptyComponent
      emptyText={t('cart:emptyText')}
      withButton
      buttonText={t('cart:addItems')}
      onPress={goToHome}>
      <EmptyCart style={{marginBottom: calcFont(26.5)}} />
    </EmptyComponent>
  );
  return (
    <View style={[styles.container]}>
      <CustomHeader title={t('tabs:cart')} />
      {isCartLoading && <Loader />}
      {cartProducts && (
        <>
          <View style={styles.listContainer}>
            <FlatlistWithCustomScrollIndicator
              refresh={isCartFetching}
              onPullToRefresh={onPullToRefresh}
              data={cartProducts?.products as CartItemType[]}
              keyExtractor={item => `${item.name}${item.key}`}
              renderItem={({
                item: {
                  name,
                  quantity,
                  currency,
                  image,
                  key,
                  total,
                  product_id,
                  available_quantity,
                  unlimited,
                  option,
                },
              }) => {
                return (
                  <CartItem
                    name={name}
                    // initialAmount={quantity}
                    price={total.replace(`${currency}`, '').trim()}
                    image={image}
                    currency={currency}
                    onDeleteItemPressed={() =>
                      onDeleteItemPressed(`${key}`, name)
                    }
                    amount={quantity}
                    itemKey={key}
                    onItemPressed={() => onItemPressed(product_id, option)}
                    quantity={available_quantity}
                    unlimited={unlimited}
                  />
                );
              }}
              ListEmptyComponent={renderEmptyCart}
            />
          </View>
          {!!cartProducts?.products?.length && (
            <CartFooter
              total={cartProducts?.totals[0]?.text
                .replace(cartProducts.products[0].currency, '')
                .trim()}
              oncheckoutPressed={oncheckoutPressed}
            />
          )}
        </>
      )}
      <CustomModal
        style={styles.modal}
        isVisible={deleteModalVisible}
        onModalHide={hideModal}>
        <CartDeleteDialog
          onRemovePressed={onConfirmRemove}
          onCanclePressed={hideModal}
        />
      </CustomModal>
    </View>
  );
};

export {Cart};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {flex: 1, alignItems: 'center'},
  emptyText: {
    fontSize: calcFont(16),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.4,
    textAlign: 'center',
    color: COLORS.HEADER_TEXT,
  },
  modal: {justifyContent: 'center', alignItems: 'center'},
});
