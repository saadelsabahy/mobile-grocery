import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {LanguagesModal, SettingsItem} from '../../components';
import {COLORS} from '../../constants/style';
import {calcFont, SCREEN_WIDTH} from '../../constants/style/sizes';
import {AuthenticationContext} from '../../contexts';
import useLogic from './Logic';

interface Props {}

const MoreScreen = () => {
  const {
    goToWishlist,
    onSignOutPressed,
    onSignInPressed,
    changeLanguage,
    goToProfileInfo,
    showLanguageModal,
    hideLanguageModal,
  } = useLogic();
  const {
    state: {userToken},
  } = useContext(AuthenticationContext);
  const {t} = useTranslation();
  const SETTINGS_LIST = [
    {
      id: 1,
      title: t('favouriteScreen:favourite'),
      leftIcon: 'heart',
      onPress: userToken ? goToWishlist : onSignInPressed,
    },
    {
      id: 2,
      title: t('accountScreen:personalInformation'),
      leftIcon: 'account',
      onPress: userToken ? () => goToProfileInfo(0) : onSignInPressed,
    },
    {
      id: 3,
      title: t('moreScreen:notifications'),
      leftIcon: 'bell',
      onPress: () => goToProfileInfo(1),
    },
    /* {
      id: 4,
      title: t('moreScreen:referToFriends'),
      leftIcon: <RefereIcon />,
      onPress: goToRefereToFriends,
    }, */
    /*   {
      id: 5,
      title: t('moreScreen:rateUs'),
      leftIcon: 'star',
      onPress: onAppReviewPressed,
    }, */
    {
      id: 6,
      title: t('localization:language'),
      leftIcon: 'translate',
      onPress: changeLanguage,
    },
    /*     {id: 7, title: t('moreScreen:faq'), leftIcon: <FaqIcon />},
     */ {
      id: 8,
      title: userToken ? t('auth:signOut') : t('auth:signIn'),
      leftIcon: 'logout',
      onPress: userToken ? onSignOutPressed : onSignInPressed,
    },
  ];

  return (
    <View style={styles.container}>
      {/* <CustomButton onPress={() => authContext.signOut()}>logout</CustomButton> */}

      <Text style={styles.title}>{t('moreScreen:accountSettings')}</Text>

      <Text numberOfLines={2} style={[{...styles.title}, styles.moreHeadText]}>
        {t('moreScreen:headerSubText')}
      </Text>

      <FlatList
        data={SETTINGS_LIST}
        keyExtractor={item => `${item.id}`}
        renderItem={({item: {title, leftIcon, onPress}}) => {
          return <SettingsItem {...{title, leftIcon, onPress}} />;
        }}
      />
      <LanguagesModal
        isVisible={showLanguageModal}
        hideModal={hideLanguageModal}
      />
    </View>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingStart: calcFont(20),
    paddingEnd: calcFont(16),
    backgroundColor: COLORS.WHITE,
  },
  title: {
    fontSize: calcFont(28),
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0.18,
    color: COLORS.HEADER_TEXT,
    marginBottom: calcFont(14),
    textTransform: 'capitalize',
  },
  moreHeadText: {
    opacity: 0.64,
    fontSize: calcFont(16),
    width: SCREEN_WIDTH - 30,
    marginBottom: calcFont(38),
  },
});
