import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {hasNewLogin} from '../../constants/config.constants';
import {COLORS} from '../../constants/style';
import {calcFont, calcHeight, calcWidth} from '../../constants/style/sizes';
import {AuthenticationContext, SnackBarContext} from '../../contexts';
import {AppleIcon, FacebookIcon, GoogleIcon} from '../../svgs';

interface Props {
  title: string;
  type: 'facebook' | 'google' | 'apple';
  onPress?: () => void;
}

const SocialButton = ({title, type, onPress}: Props) => {
  const {t} = useTranslation();
  const {
    state: {identityType},
  } = useContext(AuthenticationContext);
  const {showSnackbar} = useContext(SnackBarContext);

  const onPressWhenIdentityIsPhone = () => {
    showSnackbar(t('messages:socialMobileIdentity'), true);
  };
  return (
    <Pressable
      onPress={
        !hasNewLogin
          ? onPress
          : identityType === 'email'
          ? onPress
          : onPressWhenIdentityIsPhone
      }
      style={({pressed}) => [
        styles.container,
        {
          opacity: pressed ? 0.7 : 1,
          backgroundColor:
            type == 'facebook'
              ? COLORS.FACEBOOK_COLOR
              : type == 'google'
              ? COLORS.GOOGLE_COLOR
              : COLORS.APPLE_COLOR,
        },
      ]}>
      <View style={[{marginStart: calcFont(16)}]}>
        {type == 'facebook' ? (
          <FacebookIcon />
        ) : type == 'google' ? (
          <GoogleIcon />
        ) : (
          <AppleIcon />
        )}
      </View>
      <View style={[styles.containerFlex /* {backgroundColor: 'red'} */]}>
        <Text style={styles.title}> {title}</Text>
      </View>
    </Pressable>
  );
};

export {SocialButton};

const styles = StyleSheet.create({
  container: {
    width: calcWidth(335),
    height: calcHeight(44),
    borderRadius: calcFont(8),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: calcFont(12),
  },
  containerFlex: {
    width: calcWidth(187),
    minHeight: calcHeight(20),
    justifyContent: 'center',
    marginStart: calcFont(30),
  },
  title: {
    fontSize: calcFont(12),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: calcFont(0.8),
    textAlign: 'center',
    color: COLORS.WHITE,
    textTransform: 'uppercase',
  },
});
