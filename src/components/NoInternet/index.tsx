import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '../../constants/style';
import {calcHeight, SCREEN_WIDTH} from '../../constants/style/sizes';
interface Props {}

const NoInternet = () => {
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();
  return (
    <View style={[styles.container, {minHeight: calcHeight(45)}]}>
      <Text
        style={[
          styles.text,
          {
            paddingTop: insets.top,
          },
        ]}>
        {t('messages:noInternet')}
      </Text>
    </View>
  );
};

export {NoInternet};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.MOCK_BG_RED,
  },

  text: {
    textTransform: 'capitalize',
    color: COLORS.WHITE,
  },
});
