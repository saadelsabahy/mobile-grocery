import {useNavigation} from '@react-navigation/core';
import React, {useContext, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  I18nManager,
  Keyboard,
  StyleSheet,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import {Text, useTheme} from 'react-native-paper';
import PhoneInput from 'react-native-phone-number-input';
import {
  AuthParagraph,
  CustomButton,
  CustomHeader,
  CustomHeadline,
  IdentityInput,
  SocialButton,
} from '../../components';
import {Country} from '../../components/CustomCountryPicker/types';
import {FORM_OPTIONS} from '../../constants/constantVariables';
import {COLORS} from '../../constants/style';
import {calcFont, SCREEN_WIDTH} from '../../constants/style/sizes';
import {AuthenticationContext, SnackBarContext} from '../../contexts';
import useSendVerfication from '../../hooks/useSendVerfication';
import {validation} from '../../utils/validation';
interface Props {}
const defaultValues = {
  identity: '',
  lang: I18nManager.isRTL ? 'ar' : 'en',
};
const Login = ({}: Props) => {
  const navigation = useNavigation();
  const {
    colors: {primary},
  } = useTheme();
  const phoneInputRef = useRef<PhoneInput>(null);
  const {t} = useTranslation();
  const {showSnackbar} = useContext(SnackBarContext);
  const {
    state: {identityType},
  } = useContext(AuthenticationContext);
  const [country, setcountry] = useState<Country>({});
  const usePhone = identityType !== 'email';
  const {handleSubmit, errors, reset, control} = useForm(
    FORM_OPTIONS(defaultValues),
  );
  const {
    isLoading,
    mutate,
    onFacebookLoginPressed,
    onGoogleLoginPressed,
    onAppleLoginPressed,
  } = useSendVerfication(defaultValues, reset);

  //toggleSecureInput

  const onSignUpPressed = () => {
    navigation.navigate('Auth', {screen: 'Register'});
  };
  /*  const onForgetPasswordPressed = () => {
    navigation.navigate('Auth', {
      screen: 'CompeleteProfile',
      params: {id: 77, fields: FIELDS},
    });
  }; */
  const onSignIn = ({identity}: typeof defaultValues) => {
    console.log('sign', identity);
    Keyboard.dismiss();

    if (!phoneInputRef.current?.isValidNumber(identity) && usePhone) {
      showSnackbar(t('validation:wrongPhone'), true);
    } else {
      try {
        mutate({
          ...defaultValues,
          identity,
        });
      } catch (error) {
        console.log('login error', error);
      }
    }
  };
  const onSelectCountry = (country: Country) => {
    setcountry(country);
  };
  return (
    <View style={[styles.container]}>
      <CustomHeader hideEndAction title={t('auth:signIn')} />

      <KeyboardAwareScrollView
        style={{flex: 1}}
        contentContainerStyle={styles.keyboardAwareContent}
        keyboardShouldPersistTaps="always"
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        resetScrollToCoords={{x: 0, y: 0}}>
        {/* top container */}
        <View style={styles.topContainer}>
          <CustomHeadline title={t('auth:welcome')} />
          <AuthParagraph
            text={t('auth:loginParagraph', {
              authType: !usePhone ? t('inputs:email') : t('inputs:telephone'),
            })}
            //actionText={'Create new account.'}
            onActionPressed={onSignUpPressed}
          />
        </View>
        {/* dummy checkbox */}

        {/* center container */}
        <View style={styles.centerContainer}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <IdentityInput
                fieldName={usePhone ? t('inputs:telephone') : t('inputs:email')}
                error={errors.identity}
                onChangeText={value => onChange(value)}
                onBlur={onBlur}
                value={value}
                placeholder={
                  usePhone ? t('inputs:telephone') : t('inputs:email')
                }
                onSelect={usePhone ? onSelectCountry : undefined}
                country={usePhone ? country : undefined}
                usePhone={usePhone}
                phoneInputRef={usePhone ? phoneInputRef : undefined}
              />
            )}
            name="identity"
            rules={usePhone ? validation(t).phone : validation(t).email}
          />

          <View style={{marginTop: calcFont(21)}}>
            <CustomButton
              onPress={handleSubmit(onSignIn)}
              mode="contained"
              /*  loading={isLoading} */
            >
              {t('auth:signIn')}
            </CustomButton>
          </View>
        </View>
        {/* bottom container */}
        <View>
          <Text style={styles.or}>{t('auth:or')}</Text>
          <SocialButton
            type="google"
            title={t('auth:loginWithGoogle')}
            onPress={onGoogleLoginPressed}
          />
          <SocialButton
            type="facebook"
            title={t('auth:loginWithFacebook')}
            onPress={onFacebookLoginPressed}
          />
          <SocialButton
            type="apple"
            title={t('auth:loginWithApple')}
            onPress={onAppleLoginPressed}
          />
        </View>
        {/* <CustomButton
          mode="contained"
          children={'compelete'}
          onPress={onForgetPasswordPressed}
        /> */}
      </KeyboardAwareScrollView>
      <Modal
        isVisible={isLoading}
        backdropColor={COLORS.WHITE}
        style={styles.modal}>
        <ActivityIndicator color={primary} animating={isLoading} />
      </Modal>
    </View>
  );
};

export {Login};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  topContainer: {
    marginBottom: calcFont(36),
    alignSelf: 'flex-start',
    marginStart: calcFont(20),
  },
  centerContainer: {
    marginBottom: calcFont(25),
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.9,
  },
  forgetPassword: {
    opacity: 0.64,
    fontSize: calcFont(14),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: calcFont(-0.28),
    textAlign: 'center',
    color: COLORS.HEADER_TEXT,
    marginTop: calcFont(31),
    marginBottom: calcFont(21),
    textTransform: 'capitalize',
  },
  or: {
    alignSelf: 'center',
    textTransform: 'uppercase',
    fontSize: calcFont(14),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: COLORS.HEADER_TEXT,
    opacity: 0.64,
    marginBottom: calcFont(32),
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAwareContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
});
