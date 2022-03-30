import React, {useContext} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {I18nManager, StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Text, useTheme} from 'react-native-paper';
import {useMutation} from 'react-query';
import reactotron from 'reactotron-react-native';
import {
  AuthParagraph,
  ConfirmationInput,
  CustomButton,
  CustomHeader,
  CustomHeadline,
} from '../../components';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {FORM_OPTIONS} from '../../constants/constantVariables';
import {COLORS} from '../../constants/style';
import {calcFont, calcHeight, calcWidth} from '../../constants/style/sizes';
import {AuthenticationContext, SnackBarContext} from '../../contexts';
import useAxios from '../../hooks/useAxios';
import useSendVerfication from '../../hooks/useSendVerfication';
import {
  default as useVerifyCode,
  default as UseVerifyCode,
} from '../../hooks/useVerifyCode';
import {validation} from '../../utils/validation';

interface Props {}

const VerificationCode = ({route, navigation}: Props) => {
  const {t} = useTranslation();
  const {
    colors: {primary},
  } = useTheme();
  const Axios = useAxios(true);
  const {showSnackbar} = useContext(SnackBarContext);
  const {authContext} = useContext(AuthenticationContext);
  const {
    id,
    verification_provider,
    identity,
  }: {
    id: string;
    verification_provider: string;
    identity: string;
  } = route?.params;
  const defaultValues = {
    code: '',
    id,
    verification_provider,
    identity,
  };
  const {handleSubmit, errors, reset, control} = useForm(
    FORM_OPTIONS(defaultValues),
  );
  const {
    isLoading: sendVerifcationLoading,
    mutate: sendVerifcation,
  } = useSendVerfication(defaultValues, reset);
  const {isError, isLoading, mutate, data} = useVerifyCode({
    defaultValues,
    reset,
  });

  const onVerifyCodePressed = (data: typeof defaultValues) => {
    try {
      mutate({...defaultValues, ...data});
    } catch (error) {
      console.log('login error');
    }
  };
  const onResendVerifcationPressed = () => {
    sendVerifcation({
      identity,
      lang: I18nManager.isRTL ? 'ar' : 'en',
    });
  };
  return (
    <View style={styles.container}>
      <CustomHeader hideEndAction title={t('auth:confirmAccount')} />
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}
        keyboardShouldPersistTaps="always"
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        resetScrollToCoords={{x: 0, y: 0}}>
        <CustomHeadline
          title={t('auth:confirmAccount')}
          containerStyle={styles.headlineContainer}
          headlineStyle={{fontSize: calcFont(24)}}
        />
        <AuthParagraph
          text={`${t('auth:verficationParagraph')} ${identity}`}
          textStyle={{textAlign: 'center'}}
        />

        <View style={{marginTop: calcFont(32), marginBottom: calcFont(40)}}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <ConfirmationInput
                error={errors.code}
                onChangeText={value => onChange(value)}
                onBlur={onBlur}
                value={value}
                onFulfillCode={handleSubmit(onVerifyCodePressed)}
              />
            )}
            name="code"
            rules={validation(t).code}
          />
        </View>
        <CustomButton
          mode="contained"
          onPress={handleSubmit(onVerifyCodePressed)}
          loading={isLoading}>
          {t('auth:continue')}
        </CustomButton>
        <View style={styles.notRecieveContainer}>
          <Text>
            {t('auth:notRecieveCode')}{' '}
            {
              <Text
                style={[
                  styles.resend,
                  {opacity: sendVerifcationLoading ? 0.2 : 1, color: primary},
                ]}
                onPress={onResendVerifcationPressed}>
                {sendVerifcationLoading
                  ? `${t('auth:resendCode')}.....`
                  : t('auth:resendCode')}
              </Text>
            }
          </Text>
        </View>
        <AuthParagraph
          text={t('auth:signPolicy')}
          textStyle={{textAlign: 'center'}}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export {VerificationCode};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  headlineContainer: {
    width: calcWidth(222),
    height: calcHeight(22),
    marginTop: calcFont(18),
    marginBottom: calcFont(16),
    alignSelf: 'center',
    alignItems: 'center',
  },
  resend: {
    marginStart: calcFont(6),
    fontSize: calcFont(14),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.28,
  },
  notRecieveContainer: {
    marginTop: calcFont(26),
    marginBottom: calcFont(25),
    width: '100%',
    alignItems: 'center',
  },
});
