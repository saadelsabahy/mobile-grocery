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
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useMutation} from 'react-query';
import {
  AuthParagraph,
  CustomButton,
  CustomHeader,
  CustomHeadline,
  CustomInput,
  SocialButton,
} from '../../components';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {COLORS} from '../../constants/style';
import {calcFont, calcWidth} from '../../constants/style/sizes';
import useAxios from '../../hooks/useAxios';
import useOldSocialLogin from '../../hooks/useOldSocialLogin';
import {validation} from '../../utils/validation';

interface Props {
  navigation: any;
}
const defaultValues = {
  email: '',
  password: '',
  phone: '',
  firstname: '',
  lastname: '',
};

const Register = ({navigation}: Props) => {
  const insets = useSafeAreaInsets();
  const {
    colors: {primary},
  } = useTheme();
  const [secureInput, setsecureInput] = React.useState(true);
  const passwordInputRef = React.useRef<NativeInput>();
  const {t} = useTranslation();
  const Axios = useAxios();

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
    onSignInSuccess: onSignUpSuccess,
    onFacebookLogin,
    onAppleLoginPressed,
    onGoogleLogin,
    isLoading: socialLoginLoading,
  } = useOldSocialLogin(defaultValues, reset);
  //toggleSecureInput
  const toggleSecureInput = () => {
    passwordInputRef?.current?.focus();
    setsecureInput(!secureInput);
  };
  const onSignInPressed = () => {
    navigation.goBack();
  };

  /* sign up */

  const {isLoading, mutate} = useMutation(
    (userData: typeof defaultValues) =>
      Axios.post(endpoints.registerCustomer, userData),
    {onSuccess: ({data}) => onSignUpSuccess(data)},
  );

  const onSignUp = async (data: typeof defaultValues) => {
    // Reactotron.log(data);
    Keyboard.dismiss();

    try {
      mutate(data);
    } catch (error) {
      console.log('register error');
    }
  };

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom}]}>
      <CustomHeader hideEndAction title={t('auth:signUp')} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.keyboardAwareContent}
        keyboardShouldPersistTaps="always"
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        resetScrollToCoords={{x: 0, y: 0}}>
        <View style={styles.topContainer}>
          <CustomHeadline title={t('auth:createAccount')} />
          <AuthParagraph
            text={t('auth:createAccountParagraph')}
            actionText={t('auth:alreadyHaveAccount')}
            onActionPressed={onSignInPressed}
          />
        </View>
        {/* center container */}
        <View style={styles.centerContainer}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <CustomInput
                fieldName={t('inputs:firstName')}
                //onSubmitEditing={onEmailSubmitEditing}
                returnKeyType={'next'}
                error={errors.firstname}
                onChangeText={value => onChange(value)}
                onBlur={onBlur}
                value={value}
                placeholder={t('inputs:placeholder', {
                  fieldName: t('inputs:firstName'),
                })}
              />
            )}
            name="firstname"
            rules={validation(t).name}
          />
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <CustomInput
                fieldName={t('inputs:lastName')}
                //onSubmitEditing={onEmailSubmitEditing}
                returnKeyType={'next'}
                error={errors.lastname}
                onChangeText={value => onChange(value)}
                onBlur={onBlur}
                value={value}
                placeholder={t('inputs:placeholder', {
                  fieldName: t('inputs:lastName'),
                })}
              />
            )}
            name="lastname"
            rules={validation(t).name}
          />
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <CustomInput
                fieldName={t('inputs:telephone')}
                //onSubmitEditing={onEmailSubmitEditing}
                returnKeyType={'next'}
                error={errors.phone}
                onChangeText={value => onChange(value)}
                onBlur={onBlur}
                value={value}
                keyboardType="numeric"
                placeholder={t('inputs:placeholder', {
                  fieldName: t('inputs:telephone'),
                })}
              />
            )}
            name="phone"
            rules={validation(t).phone}
          />

          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <CustomInput
                fieldName={t('inputs:email')}
                // onSubmitEditing={onEmailSubmitEditing}
                returnKeyType={'next'}
                error={errors.email}
                onChangeText={value => onChange(value)}
                onBlur={onBlur}
                value={value}
                placeholder={t('inputs:placeholder', {
                  fieldName: t('inputs:email'),
                })}
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
          <CustomButton onPress={handleSubmit(onSignUp)} mode="contained">
            {t('auth:signUp')}
          </CustomButton>
        </View>
        {/* bottom container */}
        <View style={{alignItems: 'center'}}>
          {/* <Text numberOfLines={2} style={styles.privacyText}>
            By Signing up you agree to our Terms Conditions & Privacy Policy.
          </Text> */}
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

export {Register};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  keyboardAwareContent: {flexGrow: 1, alignItems: 'center'},
  topContainer: {
    marginBottom: calcFont(15),
    alignSelf: 'flex-start',
    marginStart: calcFont(20),
  },
  centerContainer: {
    marginBottom: calcFont(10),
  },
  forgetPassword: {
    opacity: 0.64,
    fontSize: calcFont(14),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: calcFont(-0.28),
    textAlign: 'center',
    color: '#010f07',
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
    color: '#010f07',
    opacity: 0.64,
    marginBottom: calcFont(9),
  },
  privacyText: {
    width: calcWidth(275),
    opacity: 0.74,
    fontSize: calcFont(14),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.25,
    textAlign: 'center',
    color: COLORS.BLACK,
    marginBottom: calcFont(15),
    textTransform: 'capitalize',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
