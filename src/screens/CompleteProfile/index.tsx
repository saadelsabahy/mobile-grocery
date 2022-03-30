import React, {useContext, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Keyboard, StyleSheet, View} from 'react-native';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import PhoneInput from 'react-native-phone-number-input';
import {useMutation} from 'react-query';
import {
  AcceptTerms,
  CustomButton,
  CustomDatePicker,
  CustomHeader,
  CustomInput,
  IdentityInput,
} from '../../components';
import {Country} from '../../components/CustomCountryPicker/types';
import {CustomPicker} from '../../components/GenderPicker';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {FORM_OPTIONS} from '../../constants/constantVariables';
import {COLORS} from '../../constants/style';
import {calcFont, calcWidth} from '../../constants/style/sizes';
import {AuthenticationContext, SnackBarContext} from '../../contexts';
import useAxios from '../../hooks/useAxios';
import {CompleteProfileIcon} from '../../svgs';
import {formatDate} from '../../utils';
import {validation} from '../../utils/validation';
interface Props {}
const GENDER = [
  {key: 1, label: 'male', labelAr: 'ذكر'},
  {key: 2, label: 'female', labelAr: 'أنثي'},
];

// reactotron.log(defaultValues());

const CompleteProfile = ({route, navigation}: Props) => {
  const {id, fields} = route?.params;
  const phoneInputRef = useRef<PhoneInput>(null);
  const [country, setcountry] = useState<Country>({});

  const {t} = useTranslation();
  const [isDatePickerVisible, setIsDatePickerVisible] = useState<boolean>(
    false,
  );
  const {handleSubmit, errors, reset, control} = useForm(FORM_OPTIONS({}));
  const Axios = useAxios(true);
  const {showSnackbar} = useContext(SnackBarContext);
  const {authContext} = useContext(AuthenticationContext);
  const {isLoading, mutate} = useMutation(
    (userData: unknown) => Axios.post(endpoints.completeProfile, userData),
    {
      onSuccess: data => onCompeleteProfileSuccess(data.data),
      onError: () => showSnackbar(t('messages:checkInfoAndRetry'), true),
    },
  );
  const onCompeleteProfilePressed = (data: any) => {
    console.log(data);

    if (
      !!data.identity &&
      !phoneInputRef.current?.isValidNumber(data.identity)
    ) {
      showSnackbar(t('validation:wrongPhone'), true);
    } else {
      try {
        mutate({
          id,
          ...data,
          gender: GENDER.find(item => item.key === data.gender)?.label.charAt(
            0,
          ),
        });
      } catch (error) {
        console.log('complete err', error);
      }
    }
  };
  const onCompeleteProfileSuccess = async ({
    success,
    errors,
    customer,
  }: {
    success: boolean;
    errors: object;
    customer: any;
  }) => {
    if (success) {
      await authContext.signIn({
        userToken: `${customer.telephone}${customer.email}`,
        userData: customer,
      });
      await authContext.restoreToken();
      navigation.navigate('More');
      reset();
    } else {
      showSnackbar(
        Object.keys(errors)?.length
          ? errors[Object.keys(errors)[0]][0]
          : t('messages:checkInfoAndRetry'),
        true,
      );
    }
  };

  const hideDatePicker = () => setIsDatePickerVisible(false);

  const showDatePicker = () => {
    Keyboard.dismiss();
    setIsDatePickerVisible(true);
  };
  const onSelectCountry = (country: Country) => {
    setcountry(country);
  };
  const returnedInput = (item: typeof fields) => {
    switch (item.name.toLocaleLowerCase()) {
      case 'telephone':
        return (
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <View style={styles.phoneContainer}>
                <IdentityInput
                  error={errors.identity}
                  onChangeText={(value: string) => onChange(value)}
                  onBlur={onBlur}
                  value={value}
                  placeholder={item.placeholder}
                  onSelect={onSelectCountry}
                  country={country}
                  usePhone={true}
                  phoneInputRef={phoneInputRef}
                  withBorder
                />
              </View>
            )}
            name="identity"
            rules={validation(t).phone}
            defaultValue={''}
          />
        );
      case 'gender':
        return (
          <Controller
            control={control}
            render={({onChange, value}) => (
              <CustomPicker
                error={errors[item.name]}
                onChange={(option: unknown) => {
                  onChange(option.key);
                }}
                value={value}
                selectedKey={GENDER.find(item => item.key == value)?.key}
                placeholder={item.placeholder}
                data={GENDER}
              />
            )}
            name={item.name}
            rules={{
              required: {
                value: item.required,
                message: t('validation:required', {fieldName: item.name}),
              },
            }}
            defaultValue={''}
          />
        );
      case 'dob':
        return (
          <Controller
            control={control}
            render={({onChange, value}) => (
              <CustomDatePicker
                isVisible={isDatePickerVisible}
                error={errors[item.name]}
                onConfirm={value => {
                  onChange(formatDate(value));
                  hideDatePicker();
                }}
                value={value}
                //date={value}
                placeholder={item.placeholder}
                containerStyle={{marginVertical: calcFont(10)}}
                onPress={showDatePicker}
                onCancel={hideDatePicker}
                onHide={hideDatePicker}
              />
            )}
            name={item.name}
            rules={{
              required: {
                value: item.required,
                message: t('validation:required', {fieldName: item.name}),
              },
            }}
            defaultValue={''}
          />
        );
      case 'terms':
      case 'newsletter':
        return (
          <Controller
            control={control}
            render={({onChange, value}) => (
              <AcceptTerms
                onChange={value => onChange(!value)}
                value={value}
                placeholder={item.placeholder.replace(/(<([^>]+)>)/gi, ' ')}
                error={errors[item.name]}
              />
            )}
            name={item.name}
            rules={{
              required: {
                value: item.required,
                message: t('validation:required', {fieldName: item.name}),
              },
            }}
            defaultValue={''}
          />
        );
      case 'customer_group_id':
        return (
          <Controller
            control={control}
            render={({onChange, value}) => (
              <CustomPicker
                error={errors[item.name]}
                keyExtractor={(item: any) => item.customer_group_id}
                labelExtractor={(item: any) => item.name}
                onChange={(option: any) => {
                  onChange(option.customer_group_id);
                  console.log({
                    sel: item?.values?.find(
                      (item: any) => item.customer_group_id == value,
                    )?.customer_group_id,
                  });
                }}
                value={value}
                selectedKey={
                  item?.values?.find(
                    (item: any) => item.customer_group_id == value,
                  )?.customer_group_id
                }
                placeholder={item.placeholder}
                data={item.values.map((item: any, index: number) => ({
                  ...item,
                  label: item.name,
                  key: item.customer_group_id,
                }))}
              />
            )}
            name={item.name}
            rules={{
              required: {
                value: item.required,
                message: t('validation:required', {fieldName: item.name}),
              },
            }}
            defaultValue={''}
          />
        );
      default:
        return (
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <CustomInput
                error={errors[item.name]}
                onChangeText={value => onChange(value)}
                onBlur={onBlur}
                value={value}
                placeholder={item.placeholder}
                containerStyle={{marginVertical: calcFont(10)}}
                withBorder
              />
            )}
            name={item.name}
            rules={{
              required: {
                value: item.required,
                message: t('validation:required', {
                  fieldName: item.placeholder,
                }),
              },
            }}
            defaultValue={''}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader hideEndAction title={t('auth:compeleteProfile')} />

      <KeyboardAwareFlatList
        /*   keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag" */
        removeClippedSubviews={false}
        style={{flex: 1}}
        contentContainerStyle={{alignItems: 'center'}}
        data={fields}
        keyExtractor={item => `${item.order}${item.name}`}
        renderItem={({item}) => returnedInput(item)}
        ListFooterComponent={
          <View style={{marginVertical: calcFont(20)}}>
            <CustomButton
              mode={'contained'}
              onPress={handleSubmit(onCompeleteProfilePressed)}
              loading={isLoading}>
              {t('auth:submit')}
            </CustomButton>
          </View>
        }
        ListHeaderComponent={
          <View style={{marginVertical: calcFont(15)}}>
            <CompleteProfileIcon />
          </View>
        }
      />
    </View>
  );
};

export {CompleteProfile};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  phoneContainer: {width: calcWidth(335)},
});
