import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  TextInput as NativeInput,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import {Text, TextInput, useTheme} from 'react-native-paper';
import {useMutation} from 'react-query';
import {
  CustomButton,
  CustomHeader,
  CustomHeadline,
  CustomInput,
  SocialButton,
} from '../../components';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {COLORS} from '../../constants/style';
import {calcFont, SCREEN_WIDTH} from '../../constants/style/sizes';
import useAxios from '../../hooks/useAxios';
import useOldSocialLogin from '../../hooks/useOldSocialLogin';
import {validation} from '../../utils/validation';
interface Props {}
const defaultValues = {
  email: '',
  password: '',
};
const OldLogin = ({}: Props) => {
  const navigation = useNavigation();
  const [secureInput, setsecureInput] = React.useState(true);
  const passwordInputRef = React.useRef<NativeInput>();
  const {t} = useTranslation();
  const Axios = useAxios();
  const {
    colors: {primary},
  } = useTheme();
  const {handleSubmit, errors, reset, control} = useForm({
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues,
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });

  const {
    onAppleLoginPressed,
    onFacebookLogin,
    onGoogleLogin,
    onSignInSuccess,
    isLoading: socialLoginLoading,
  } = useOldSocialLogin(defaultValues, reset);
  //toggleSecureInput
  const toggleSecureInput = () => {
    passwordInputRef?.current?.focus();
    setsecureInput(!secureInput);
  };
  const onEmailSubmitEditing = () => {
    passwordInputRef?.current?.focus();
  };
  const onSignUpPressed = () => {
    navigation.navigate('Auth', {screen: 'Register'});
  };
  const onForgetPasswordPressed = () => {
    navigation.navigate('Auth', {screen: 'ForgetPassword'});
  };
  const onSignIn = (data: typeof defaultValues) => {
    Keyboard.dismiss();

    try {
      mutate(data);
    } catch (error) {
      console.log('register error');
    }
  };

  const {isLoading, mutate} = useMutation(
    (userData: typeof defaultValues) =>
      Axios.post(endpoints.loginCustomer, userData),
    {
      onSuccess: ({data}) => onSignInSuccess(data),
    },
  );

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
        </View>

        {/* center container */}
        <View style={styles.centerContainer}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <CustomInput
                fieldName={t('inputs:email')}
                error={errors.email}
                onChangeText={value => onChange(value)}
                onBlur={onBlur}
                value={value}
                placeholder={t('inputs:placeholder', {
                  fieldName: t('inputs:email'),
                })}
                onSubmitEditing={onEmailSubmitEditing}
              />
            )}
            name="email"
            rules={validation(t).email}
          />
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <CustomInput
                fieldName={t('inputs:password')}
                reference={passwordInputRef}
                error={errors.password}
                onChangeText={value => onChange(value)}
                onBlur={onBlur}
                value={value}
                placeholder={t('inputs:placeholder', {
                  fieldName: t('inputs:password'),
                })}
                right={
                  <TextInput.Icon
                    onPress={toggleSecureInput}
                    size={20}
                    color={COLORS.GRAY}
                    name={secureInput ? 'eye-outline' : 'eye-off-outline'}
                  />
                }
                secureTextEntry={secureInput}
              />
            )}
            name="password"
            rules={validation(t).password}
          />

          <View style={styles.buttonsContainer}>
            <CustomButton onPress={handleSubmit(onSignIn)} mode="contained">
              {t('auth:signIn')}
            </CustomButton>

            <View style={[styles.secondaryButtonsContainer]}>
              <Text
                children={t('auth:forgetPassword')}
                onPress={onForgetPasswordPressed}
              />
              <Text children={t('auth:signUp')} onPress={onSignUpPressed} />
            </View>
          </View>
        </View>
        {/* bottom container */}
        <View>
          <Text style={styles.or}>{t('auth:or')}</Text>
          <SocialButton
            type="google"
            title={t('auth:loginWithGoogle')}
            onPress={onGoogleLogin}
          />
          <SocialButton
            type="facebook"
            title={t('auth:loginWithFacebook')}
            onPress={onFacebookLogin}
          />
          <SocialButton
            type="apple"
            title={t('auth:loginWithApple')}
            onPress={onAppleLoginPressed}
          />
        </View>
      </KeyboardAwareScrollView>
      <Modal
        isVisible={isLoading || socialLoginLoading}
        backdropColor={COLORS.WHITE}
        style={styles.modal}>
        <ActivityIndicator color={primary} animating={isLoading} />
      </Modal>
    </View>
  );
};

export {OldLogin};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  topContainer: {
    marginBottom: calcFont(10),
    alignSelf: 'flex-start',
    marginStart: calcFont(20),
  },
  centerContainer: {
    marginBottom: calcFont(15),
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.9,
  },
  buttonsContainer: {
    marginTop: calcFont(10),
    alignItems: 'center',
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
  secondaryButtonsContainer: {
    marginTop: calcFont(10),
    width: SCREEN_WIDTH * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginBottom: calcFont(10),
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
