import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {I18nManager, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {calcFont, calcHeight, SCREEN_WIDTH} from '../../constants/style/sizes';
import {CustomButton} from '../CustomButton';

interface Props {
  //subtotal: string;
  total: string;
  // delivery: string;
  oncheckoutPressed: () => void;
  order?: boolean;
}

const CartFooter = ({total, order, oncheckoutPressed}: Props) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const onAddItemsPressed = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {/*  <View style={styles.rowTextContainer}>
          <Text style={styles.text}>subtotal</Text>
          <Text style={styles.text}>{subtotal}</Text>
        </View>
        <View style={styles.rowTextContainer}>
          <Text style={styles.text}>delivery</Text>
          <Text style={styles.text}>{delivery}</Text>
        </View> */}
        <View style={styles.rowTextContainer}>
          <Text style={styles.text}>{t('cart:total')}</Text>
          <Text style={styles.text}>{total}</Text>
        </View>
      </View>

      <CustomButton
        style={{
          marginTop: calcFont(10),
          borderRadius: calcFont(8),
          marginVertical: !order ? 0 : calcFont(15),
        }}
        labelStyle={styles.buttonLabel}
        mode="contained"
        onPress={oncheckoutPressed}>
        {order ? t('general:cancel') : t('cart:payNow')}
      </CustomButton>
      {!order && (
        <CustomButton
          labelStyle={styles.buttonLabel}
          onPress={onAddItemsPressed}
          style={{marginVertical: calcFont(15)}}>
          {t('cart:addItems')}
        </CustomButton>
      )}
    </View>
  );
};

export {CartFooter};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    paddingHorizontal: calcFont(20),
    paddingTop: calcFont(15),
  },
  textContainer: {
    height: calcHeight(41),

    borderTopWidth: 1,
    borderColor: COLORS.CART_ITEM_BORDER,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    //backgroundColor: 'red',
  },
  rowTextContainer: {
    flex: 1,
    minHeight: calcHeight(20),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //backgroundColor: 'red',
  },
  text: {
    fontSize: calcFont(16),
    letterSpacing: -0.28,
    color: COLORS.HEADER_TEXT,
    textTransform: 'capitalize',
    fontWeight: 'normal',
    fontStyle: 'normal',
  },
  buttonLabel: {
    fontSize: calcFont(14),
    fontWeight: I18nManager.isRTL ? 'normal' : 'bold',
    fontStyle: 'normal',
    letterSpacing: 0.8,
    textTransform: 'capitalize',
  },
});
