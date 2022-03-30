import axios from 'axios';
import React, {useContext, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Text} from 'react-native-paper';
import {useMutation} from 'react-query';
import Reactotron from 'reactotron-react-native';
import {
  AuthParagraph,
  CustomButton,
  CustomHeader,
  CustomInput,
} from '../../components';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {API_V1, STORE_URL} from '../../constants/config.constants';
import {COLORS} from '../../constants/style';
import COMMON_STYLES from '../../constants/style/CommonStyles';
import {
  calcFont,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../constants/style/sizes';
import {SnackBarContext} from '../../contexts';
import {validation} from '../../utils/validation';

interface Props {
  navigation: any;
}
const defaultValues = {
  requestCodeEmail: '',
  securityCode: '',
  newPassword: '',
  confirmPassword: '',
};
const ForgetPassword = ({navigation}: Props) => {
  const {t} = useTranslation();
  const {showSnackbar} = useContext(SnackBarContext);
  const [requestCode, setRequestCode] = useState<boolean>(true);

  const {handleSubmit, errors, reset, control, watch} = useForm({
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues,
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });
  const newPassword = React.useRef({});
  newPassword.current = watch('newPassword', '');
  const onSignInPressed = () => {
    navigation.goBack();
  };
  const onRequestCodePressed = (data: typeof defaultValues) => {
    Reactotron.log(data);

    try {
      requestCodeMutation(data);
    } catch (error) {
      console.log('requestCode error');
    }
  };

  const onRequestCodeSuccess = async (data: any) => {
    if (requestCode) {
      const {status, message} = data?.data;
      console.log('requestCode', data?.data);
      if (status === 'ok') {
        setRequestCode(false);
        reset();
        showSnackbar(message);
      } else {
        showSnackbar(t('messages:checkInfoAndRetry'), true);
      }
    } else {
      const {status, message} = data?.data;
      Reactotron.log('reset pass', status);
      if (status === 'ok') {
        reset();
        showSnackbar(message || t('messages:doneSuccessfuly'));
        onSignInPressed();
      } else {
        showSnackbar(message || t('messages:checkInfoAndRetry'), true);
      }
    }
  };
  const {isLoading, mutate: requestCodeMutation} = useMutation(
    (userData: typeof defaultValues) =>
      requestCode
        ? axios.post(STORE_URL + API_V1 + endpoints.forgetpassword, {
            email: userData?.requestCodeEmail,
          })
        : axios.post(STORE_URL + API_V1 + endpoints.resetpassword, {
            security_code: userData?.securityCode,
            new_password: userData?.newPassword,
            confirm_password: userData?.confirmPassword,
          }),
    {onSuccess: data => onRequestCodeSuccess(data)},
  );

  return (
    <View style={[styles.container]}>
      <CustomHeader hideEndAction title={t('auth:forgetPassword')} />
      {!requestCode && (
        <AuthParagraph
          text={t('auth:forgetPassParagraph')}
          //actionText={t('auth:alreadyHaveAccount')}
          containerStyle={styles.paragraphContainer}
        />
      )}
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1}}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        extraHeight={0}
        extraScrollHeight={0}
        resetScrollToCoords={{x: 0, y: 0}}>
        <View style={[styles.formContainer]}>
          {requestCode && (
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <CustomInput
                  fieldName={t('inputs:email')}
                  // onSubmitEditing={onEmailSubmitEditing}
                  returnKeyType={'next'}
                  error={errors.requestCodeEmail}
                  onChangeText={value => onChange(value)}
                  onBlur={onBlur}
                  value={value}
                  placeholder={t('inputs:placeholder', {
                    fieldName: t('inputs:email'),
                  })}
                />
              )}
              name="requestCodeEmail"
              rules={validation(t).email}
            />
          )}
          {!requestCode && (
            <>
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <CustomInput
                    fieldName={t('inputs:securityCode')}
                    // onSubmitEditing={onEmailSubmitEditing}
                    returnKeyType={'next'}
                    error={errors.securityCode}
                    onChangeText={value => onChange(value)}
                    onBlur={onBlur}
                    value={value}
                    placeholder={t('inputs:placeholder', {
                      fieldName: t('inputs:securityCode'),
                    })}
                    maxLength={6}
                    keyboardType="numeric"
                  />
                )}
                name="securityCode"
                rules={validation(t).securityCode}
              />
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <CustomInput
                    fieldName={t('inputs:newPassword')}
                    // onSubmitEditing={onEmailSubmitEditing}
                    returnKeyType={'next'}
                    error={errors.newPassword}
                    onChangeText={value => onChange(value)}
                    onBlur={onBlur}
                    value={value}
                    placeholder={t('inputs:placeholder', {
                      fieldName: t('inputs:newPassword'),
                    })}
                    secureTextEntry
                  />
                )}
                name="newPassword"
                rules={validation(t).password}
              />
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <CustomInput
                    fieldName={t('inputs:confirmPassword')}
                    // onSubmitEditing={onEmailSubmitEditing}
                    returnKeyType={'next'}
                    error={errors.confirmPassword}
                    onChangeText={value => onChange(value)}
                    onBlur={onBlur}
                    value={value}
                    // reference={newPassword}
                    placeholder={t('inputs:placeholder', {
                      fieldName: t('inputs:confirmPassword'),
                    })}
                    secureTextEntry
                  />
                )}
                rules={{
                  validate: value =>
                    value === newPassword.current ||
                    t('validation:confirmPassword', {
                      fieldName: t('inputs:newPassword'),
                    }),
                }}
                name="confirmPassword"
                // rules={validation(t)['password']}
              />
            </>
          )}
          <CustomButton
            mode="contained"
            style={[{marginVertical: calcFont(10)}]}
            labelStyle={[COMMON_STYLES.whiteText]}
            onPress={handleSubmit(onRequestCodePressed)}
            loading={isLoading}>
            {t('auth:continue')}
          </CustomButton>

          {/* <Text children={t('auth:signIn')} onPress={onSignInPressed} /> */}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export {ForgetPassword};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  paragraphContainer: {margin: calcFont(10)},
  formContainer: {
    flex: 1,
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.5,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  secondaryButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
