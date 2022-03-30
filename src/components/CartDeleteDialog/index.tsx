import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {
  calcFont,
  calcHeight,
  calcWidth,
  ROUNDED_BORDER,
} from '../../constants/style/sizes';
import {CustomButton} from '../CustomButton';

interface Props {
  onRemovePressed: () => void;
  onCanclePressed: () => void;
}

const CartDeleteDialog = ({onCanclePressed, onRemovePressed}: Props) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <IconButton
        style={styles.icon}
        icon="trash-can-outline"
        color={COLORS.WHITE}
        size={calcFont(32)}
      />
      <View style={styles.dialogTextContainer}>
        <Text style={styles.text}>{t('cart:removeDialog')}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <CustomButton
          style={styles.dialogButton}
          labelStyle={[styles.buttonLabel, {color: COLORS.MOCK_BG_RED}]}
          onPress={onRemovePressed}>
          {t('cart:remove')}
        </CustomButton>
        <CustomButton
          style={styles.dialogButton}
          labelStyle={styles.buttonLabel}
          onPress={onCanclePressed}>
          {t('cart:backToCart')}
        </CustomButton>
      </View>
    </View>
  );
};

export {CartDeleteDialog};

const styles = StyleSheet.create({
  container: {
    width: calcWidth(327),
    height: calcHeight(171),
    borderRadius: calcFont(18),
    backgroundColor: COLORS.WHITE,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: calcFont(37),
  },
  icon: {
    width: calcFont(64),
    height: calcFont(64),
    backgroundColor: COLORS.CART_DIALOG_ICON_BG,
    borderRadius: ROUNDED_BORDER,
    position: 'absolute',
    top: -calcFont(64 / 1.5),
  },
  text: {
    fontSize: calcFont(16),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.28,
    color: COLORS.BLACK,
    textAlign: 'center',
    lineHeight: calcFont(26),
  },
  buttonLabel: {
    fontSize: calcFont(12),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0.4,
  },
  buttonsContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: calcFont(5),
    // backgroundColor: 'red',
  },
  dialogTextContainer: {
    alignItems: 'center',
    marginTop: 64 / 2,
  },
  dialogButton: {
    width: '49%',
  },
});
