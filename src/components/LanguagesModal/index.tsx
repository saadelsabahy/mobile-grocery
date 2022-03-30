import {useTheme} from '@react-navigation/native';
import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, I18nManager, Pressable, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {
  calcFont,
  calcHeight,
  calcWidth,
  SCREEN_HEIGHT,
} from '../../constants/style/sizes';
import {AuthenticationContext} from '../../contexts';
import {useLanguage} from '../../hooks/useLanguage';
import {CheckedCheckBox} from '../../svgs/CheckedCheckBox';
import {CustomModal} from '../CustomModal';

interface Props {
  isVisible: boolean;
  hideModal: () => void;
}
const langs = {
  ar: {
    LanguageCode: 'ar',
    LanguageName: 'عربي',
  },
  en: {
    LanguageCode: 'en',
    LanguageName: 'English',
  },
};
const LanguagesModal = ({isVisible, hideModal}: Props) => {
  const {selectedLanguage, onChageLanguage} = useLanguage();
  const {
    colors: {primary},
  } = useTheme();
  const {
    state: {settings},
  } = useContext(AuthenticationContext);
  const {t} = useTranslation();
  return (
    <CustomModal
      isVisible={isVisible}
      onBackButtonPress={hideModal}
      onBackdropPress={hideModal}
      style={styles.modal}>
      <View style={[styles.container]}>
        <View style={[styles.itemContainer, {justifyContent: 'center'}]}>
          <Text style={[styles.text, {fontSize: calcFont(16)}]}>
            {t('localization:chooseLang')}
          </Text>
        </View>
        <FlatList
          data={
            settings?.languages_full_info
              ? Object.values(settings?.languages_full_info)
              : []
          }
          keyExtractor={(item, index) => `${item.LanguageCode}`}
          renderItem={({item: {LanguageCode, LanguageName}, index}) => {
            return (
              <Pressable
                onPress={() => onChageLanguage(LanguageCode)}
                style={styles.itemContainer}>
                {selectedLanguage == LanguageCode ? (
                  <CheckedCheckBox />
                ) : (
                  <View style={[styles.unchecked, {borderColor: primary}]} />
                )}
                <Text style={styles.text}>{LanguageName}</Text>
              </Pressable>
            );
          }}
          contentContainerStyle={{paddingHorizontal: calcFont(15.5)}}
        />
      </View>
    </CustomModal>
  );
};

export {LanguagesModal};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: calcWidth(327),
    height: 'auto',
    maxHeight: SCREEN_HEIGHT - 20,
    borderRadius: calcFont(18),
    backgroundColor: COLORS.WHITE,
  },
  itemContainer: {
    width: '100%',
    height: calcHeight(64),
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: COLORS.CART_ITEM_BORDER,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: calcFont(14),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: COLORS.BLACK,
    textTransform: 'capitalize',
  },
  unchecked: {
    width: calcFont(24),
    height: calcFont(24),
    borderRadius: calcFont(24 / 2),
    backgroundColor: COLORS.WHITE,
    borderStyle: 'solid',
    borderWidth: 1,
  },
});
