import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {calcFont} from '../../constants/style/sizes';
import useSendVerfication from '../../hooks/useSendVerfication';
import useVerifyCode from '../../hooks/useVerifyCode';
import {validation} from '../../utils/validation';
import {ConfirmationInput} from '../ConfirmationInput';
import {CustomButton} from '../CustomButton';
import {CustomModal} from '../CustomModal';

interface Props {
  defaultValues: {code: string};
  showVerficationModal: boolean;
  hideVerficationModal: () => void;
  onVerifyCodePressed: () => void;
  onResendCode: () => void;
  identity: string;
  loading: boolean;
}

const ConfirmationModal = ({
  defaultValues,
  hideVerficationModal,
  showVerficationModal,
  onVerifyCodePressed,
  identity,
  onResendCode,
  loading,
}: Props) => {
  const {t} = useTranslation();
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
  const {isError, isLoading, mutate, data} = useVerifyCode(
    defaultValues,
    reset,
  );
  const {
    isLoading: sendVerifcationLoading,
    mutate: sendVerifcation,
  } = useSendVerfication(defaultValues, reset);

  return (
    <CustomModal
      onModalHide={hideVerficationModal}
      isVisible={showVerficationModal}
      onBackdropPress={hideVerficationModal}>
      <View
        style={{
          backgroundColor: COLORS.WHITE,
          alignItems: 'center',
          width: '100%',
          //height: '7%',
          justifyContent: 'center',
        }}>
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
        <CustomButton
          mode="contained"
          onPress={handleSubmit(onVerifyCodePressed)}
          loading={loading}>
          {t('auth:continue')}
        </CustomButton>
        <View
          style={{
            marginTop: calcFont(26),
            marginBottom: calcFont(25),
            width: '100%',
            alignItems: 'center',
          }}>
          <Text>
            {t('auth:notRecieveCode')}{' '}
            {
              <Text
                style={[
                  styles.resend,
                  {opacity: sendVerifcationLoading ? 0.2 : 1, color: primary},
                ]}
                onPress={onResendCode}>
                {sendVerifcationLoading
                  ? `${t('auth:resendCode')}.....`
                  : t('auth:resendCode')}
              </Text>
            }
          </Text>
        </View>
      </View>
    </CustomModal>
  );
};

export {ConfirmationModal};

const styles = StyleSheet.create({
  resend: {
    marginStart: calcFont(6),
    fontSize: calcFont(14),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.28,
  },
});
