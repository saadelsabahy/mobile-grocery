import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {I18nManager, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../constants/style';
import {calcFont, calcHeight, calcWidth} from '../../constants/style/sizes';
import {LocationIcon} from '../../svgs/LocationIcon';
import {CustomButton} from '../CustomButton';

interface Props {
  address: string;
  //onChangePressed: () => void;
}

const HomeLocation = ({address}: Props) => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const onChangePressed = () => {
    navigation.navigate('Addresses');
  };
  return (
    <View style={[styles.container]}>
      <LocationIcon />

      <Text style={styles.text}>{address}</Text>

      <CustomButton
        style={{width: 'auto', borderRadius: 0}}
        onPress={onChangePressed}>
        {t('general:change')}
      </CustomButton>
    </View>
  );
};

export {HomeLocation};

const styles = StyleSheet.create({
  container: {
    width: calcWidth(343),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    //backgroundColor: 'red',
  },
  text: {
    width: calcWidth(197),
    fontSize: calcFont(12),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#415872',
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
  },
});
