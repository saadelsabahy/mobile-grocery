import React, {useContext, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import PhoneInput from 'react-native-phone-number-input';
import {useMutation} from 'react-query';
import reactotron from 'reactotron-react-native';
import {ConfirmationModal, CustomInput, IdentityInput} from '../../components';
import {Country} from '../../components/CustomCountryPicker/types';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {COLORS} from '../../constants/style';
import COMMON_STYLES from '../../constants/style/CommonStyles';
import {calcFont, SCREEN_HEIGHT} from '../../constants/style/sizes';
import {AuthenticationContext, SnackBarContext} from '../../contexts';
import useAxios from '../../hooks/useAxios';
import useVerifyCode from '../../hooks/useVerifyCode';
import {
  CustomerType,
  UpdateCustomerResponseType,
  ValidateCustomerResponseType,
  VerifyCodeResponseType,
} from '../../interfaces/Auth';
import {validation} from '../../utils/validation';

const usePhone = true;
interface Props {}

const PersonalInformation = () => {
  const [country, setcountry] = useState<Country>({});
  const phoneInputRef = useRef<PhoneInput>(null);
  const [showVerficationModal, setshowVerficationModal] = useState(false);
  const [verifyRequestData, setverifyRequestData] = useState({
    id: '',
    verification_provider: '',
  });
  const {t} = useTranslation();
  const Axios = useAxios(true);
  const {showSnackbar} = useContext(SnackBarContext);
  const {
    state: {email, userName, userData},
    authContext,
  } = useContext(AuthenticationContext);
  reactotron.log(userData?.telephone?.substring(3));

  const defaultValues = {
    identity: usePhone ? userData?.telephone : email,
    name: userName,
    code: '',
  };
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
  /* vefy for has verification */
  const {isLoading: verifyCodeLoading, mutate: VerifyCode} = useVerifyCode({
    defaultValues,
    reset,
    changeData: true,
  });
  /* validate and update customer */
  const {isLoading, mutate} = useMutation(
    (userData: any) => Axios.post(endpoints.validateCustomerProfile, userData),
    {
      onSuccess: (data, variables) => onApplyChangesSuccess(data, variables),
    },
  );
  const {isLoading: updateLoading, mutate: updateCustomer} = useMutation(
    (userData: any) => Axios.post(endpoints.updateCustomer, userData),
    {
      onSuccess: (data: UpdateCustomerResponseType) =>
        onUpdateCustomerSuccess(data),
    },
  );
  const onApplyChangesSuccess = async (
    {
      data: {success, id, has_verification, verification_provider, errors},
    }: ValidateCustomerResponseType,
    variables: CustomerType,
  ) => {
    if (success && has_verification) {
      setshowVerficationModal(true);
      setverifyRequestData({id, verification_provider});
    } else {
      if (success && id) {
        await updateCustomer({...variables});
      } else {
        showSnackbar(errors[Object.keys(errors)[0]][0], true);
      }
    }
  };
  const onApplyChanges = ({identity, name}: any) => {
    if (!phoneInputRef.current?.isValidNumber(identity) && usePhone) {
      showSnackbar(t('validation:wrongPhone'), true);
    } else {
      mutate({
        ...userData,
        email: usePhone ? userData.email : identity,
        name,
        telephone: usePhone ? identity : userData.telephone,
      });
    }
  };
  const onVerifyCodePressed = (
    {identity, name}: typeof defaultValues,
    {code}: {code: string},
  ) => {
    //reactotron.log({...userData, code, name, email});

    VerifyCode(
      {identity, code, ...verifyRequestData},
      {onSuccess: data => onVerifyCodeSuccess(data, {identity, name})},
    );
  };
  const onVerifyCodeSuccess = (
    {data}: {data: VerifyCodeResponseType},
    {identity, name}: {identity: string; name: string},
  ) => {
    const {success, customer, message} = data;
    if (success) {
      updateCustomer({
        ...customer,
        email: usePhone ? userData.email : identity,
        name,
        telephone: usePhone ? identity : userData.telephone,
      });
    } else {
      showSnackbar(message, true);
    }
  };
  /* onUpdate customer success */
  const onUpdateCustomerSuccess = async (data: UpdateCustomerResponseType) => {
    // reactotron.log(data);
    const {
      data: {data: customer, success, errors},
    } = data;
    // reactotron.log(data);

    if (success) {
      await authContext.signIn({
        userToken: `${customer.telephone}${customer.email}`,
        userData: customer,
      });
      await authContext.restoreToken();
      showVerficationModal && hideVerficationModal();
    } else {
      showSnackbar(errors[Object.keys(errors)[0]][0], true);
    }
  };

  const hideVerficationModal = () => {
    setshowVerficationModal(false);
  };
  const onSelectCountry = (country: Country) => {
    setcountry(country);
  };
  //reactotron.log(userData);

  return (
    <View style={[styles.container]}>
      <View style={{height: SCREEN_HEIGHT * 0.5 /* backgroundColor: 'red' */}}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <CustomInput
              fieldName={t('inputs:name')}
              returnKeyType={'next'}
              error={errors.name}
              onChangeText={value => onChange(value)}
              onBlur={onBlur}
              value={value}
              placeholder={t('inputs:lastName')}
              inputStyle={styles.input}
            />
          )}
          name="name"
          rules={validation(t).name}
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <IdentityInput
              fieldName={usePhone ? t('inputs:telephone') : t('inputs:email')}
              returnKeyType={'next'}
              error={errors.identity}
              onChangeText={value => onChange(value)}
              onBlur={onBlur}
              value={value}
              placeholder={usePhone ? t('inputs:telephone') : t('inputs:email')}
              //inputStyle={styles.input}
              onSelect={usePhone ? onSelectCountry : undefined}
              country={usePhone ? country : undefined}
              usePhone={usePhone}
              keyboardType={usePhone ? 'numeric' : 'email-address'}
              phoneInputRef={phoneInputRef}
            />
          )}
          name="identity"
          rules={usePhone ? validation(t).phone : validation(t).email}
        />
      </View>

      <Button
        mode="contained"
        style={styles.button}
        labelStyle={[COMMON_STYLES.whiteText]}
        onPress={handleSubmit(onApplyChanges)}
        loading={showVerficationModal ? isLoading : isLoading || updateLoading}>
        {t('general:applyChanges')}
      </Button>
      <ConfirmationModal
        hideVerficationModal={hideVerficationModal}
        showVerficationModal={showVerficationModal}
        onVerifyCodePressed={handleSubmit(onVerifyCodePressed)}
        defaultValues={defaultValues}
        onResendCode={handleSubmit(onApplyChanges)}
        loading={updateLoading || verifyCodeLoading}
      />
    </View>
  );
};

export default PersonalInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignSelf: 'center',
    backgroundColor: COLORS.WHITE,
  },
  button: {marginBottom: calcFont(30)},
  input: {
    paddingHorizontal: 5,
    borderWidth: 0,
    backgroundColor: 'transparent',
    paddingBottom: 0,
    marginBottom: calcFont(22),
  },
});
