import React, {useContext} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Keyboard, StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useMutation} from 'react-query';
import {CustomButton, CustomInput} from '../../components';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {calcFont, SCREEN_WIDTH} from '../../constants/style/sizes';
import {AuthenticationContext, SnackBarContext} from '../../contexts';
import useAxios from '../../hooks/useAxios';
import {editCustomerResponseType} from '../../interfaces';
import {validation} from '../../utils/validation';

interface Props {}

const OldPersonalInformation = () => {
  const {t} = useTranslation();
  const Axios = useAxios();
  const {showSnackbar} = useContext(SnackBarContext);
  const {authContext} = useContext(AuthenticationContext);
  const {
    state: {
      email,
      userData: {firstname, lastname},
    },
  } = useContext(AuthenticationContext);
  const defaultValues = {
    email,
    personalInfoPass: '',
    firstName: firstname,
    lastName: lastname,
  };
  const {handleSubmit, errors, reset, control, getValues} = useForm({
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues,
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });
  const {isLoading, mutate} = useMutation(
    (userData: any) => Axios.post(endpoints.editCustomer, userData),
    {
      onSuccess: data => onApplyChangesSuccess(data),
    },
  );
  const onApplyChangesSuccess = async ({
    data: {customer, error, success},
  }: editCustomerResponseType) => {
    if (customer?.customer_id) {
      await authContext.signIn({
        userToken: `${customer.telephone}${customer.email}`,
        userData: customer,
      });

      reset({...getValues(), personalInfoPass: ''});
      await authContext.restoreToken();
      showSnackbar(success || t('messages:checkInfoAndRetry'));
    } else {
      showSnackbar(error || t('messages:checkInfoAndRetry'), true);
    }
  };
  const onApplyChanges = ({
    email,
    personalInfoPass,
    firstName,
    lastName,
  }: typeof defaultValues) => {
    Keyboard.dismiss();
    mutate({
      email,
      password: personalInfoPass,
      firstname: firstName,
      lastname: lastName,
    });
  };
  return (
    <View style={[styles.container]}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.keyboardAwareContent}
        keyboardShouldPersistTaps="always"
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        resetScrollToCoords={{x: 0, y: 0}}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <CustomInput
              fieldName={t('inputs:firstName')}
              returnKeyType={'next'}
              error={errors.firstName}
              onChangeText={value => onChange(value)}
              onBlur={onBlur}
              value={value}
              placeholder={t('inputs:placeholder', {
                fieldName: t('inputs:firstName'),
              })}
            />
          )}
          name="firstName"
          rules={validation(t).name}
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <CustomInput
              fieldName={t('inputs:lastName')}
              returnKeyType={'next'}
              error={errors.lastName}
              onChangeText={value => onChange(value)}
              onBlur={onBlur}
              value={value}
              placeholder={t('inputs:placeholder', {
                fieldName: t('inputs:lastName'),
              })}
            />
          )}
          name="lastName"
          rules={validation(t).name}
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <CustomInput
              fieldName={t('inputs:email')}
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
              returnKeyType={'next'}
              error={errors.personalInfoPass}
              onChangeText={value => onChange(value)}
              onBlur={onBlur}
              value={value}
              secureTextEntry
              placeholder={t('inputs:placeholder', {
                fieldName: t('inputs:password'),
              })}
            />
          )}
          name="personalInfoPass"
          rules={validation(t).password}
        />
      </KeyboardAwareScrollView>
      <CustomButton
        style={{marginVertical: calcFont(10)}}
        mode="contained"
        onPress={handleSubmit(onApplyChanges)}
        loading={isLoading}>
        {t('general:applyChanges')}
      </CustomButton>
    </View>
  );
};

export default OldPersonalInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH * 0.9,
    alignSelf: 'center',
  },

  keyboardAwareContent: {flexGrow: 1, alignItems: 'center'},
});
