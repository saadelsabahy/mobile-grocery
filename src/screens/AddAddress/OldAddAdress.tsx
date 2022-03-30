import React, {useContext, useEffect, useRef} from 'react';
import {Controller, ControllerRenderProps, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useMutation, useQuery} from 'react-query';
import reactotron from 'reactotron-react-native';
import {
  CustomButton,
  CustomHeader,
  CustomInput,
  IdentityInput,
  Loader,
} from '../../components';
import {CustomPicker} from '../../components/GenderPicker';
import {COLORS} from '../../constants/style';
import {calcFont, calcHeight, calcWidth} from '../../constants/style/sizes';
import {AuthenticationContext, SnackBarContext} from '../../contexts';
import {AddressFieldType, IAddress} from '../../interfaces';
import useOldRequests from './UseOldRequest';
enum COUNTRY_DROPDOWNS {
  country = 'country_id',
  region = 'zone_id',
  city = 'area_id',
  location = 'location',
  telephone = 'telephone',
  default = 'default',
  postcode = 'postcode',
  firstName = 'firstname',
  lastName = 'lastname',
}

const OldAddAddress = ({route}) => {
  const {t} = useTranslation();
  const params: IAddress = route?.params;

  const {
    state: {
      userData: {firstname, lastname, customer_id},
    },
  } = useContext(AuthenticationContext);
  const ADD_ADDRESS_FIELDS: AddressFieldType[] = [
    {
      name: 'firstname',
      placeholder: t('inputs:firstName'),
      required: true,
      value: '',
      defaultValue: firstname,
    },
    {
      name: 'lastname',
      placeholder: t('inputs:lastName'),
      required: true,
      value: '',
      defaultValue: lastname,
    },
    {
      name: 'country_id',
      placeholder: t('inputs:country'),
      required: true,
      value: '',
      defaultValue: params?.country_id || '',
    },
    {
      name: 'zone_id',
      placeholder: t('inputs:zone'),
      required: true,
      value: '',
      defaultValue: params?.zone_id || '',
    },
    {
      name: 'area_id',
      placeholder: t('inputs:area'),
      required: false,
      value: '',
      defaultValue: params?.area_id || '',
    },
    {
      name: 'city',
      placeholder: t('inputs:city'),
      required: true,
      value: '',
      defaultValue: params?.city || '',
    },
    {
      name: 'address_1',
      placeholder: t('inputs:addressDetails'),
      required: true,
      value: '',
      defaultValue: params?.address_1 || '',
    },
    {
      name: 'telephone',
      placeholder: t('inputs:telephone'),
      required: true,
      value: '',
      defaultValue: params?.telephone || '',
    },

    {
      name: 'postcode',
      placeholder: t('inputs:postCode'),
      required: false,
      value: '',
      defaultValue: params?.postcode || '',
    },
  ];
  const phoneRef = useRef();

  const {showSnackbar} = useContext(SnackBarContext);
  const {
    getCountries,
    regionsList,
    getRegionsMutate,
    citiesList,
    getCitiesMutate,
    addAddress,
    editAddress,
  } = useOldRequests();

  const {data, isLoading} = useQuery('getCountries', getCountries);
  const {isLoading: addAddressLoading, mutate} = useMutation(
    'addAddress',
    !params ? addAddress : editAddress,
  );

  useEffect(() => {
    params?.country_id && getRegionsMutate(+params?.country_id);
    params?.zone_id && getCitiesMutate(+params?.zone_id);
  }, []);
  const {handleSubmit, errors, reset, control} = useForm();

  const onSubmitLocation = (data: any) => {
    reactotron.log({...data});
    const body = {
      ...data,
      customer_id,
      address_id: params?.address_id,
    };
    !params && delete body.address_id;
    mutate(body, {
      onSuccess: response => {
        if (response?.status === 'ok') {
          showSnackbar(t('addAddress:addAddressSuccess'));
        } else {
          showSnackbar(response.error[Object.keys(response.error)[0]], true);
        }
      },
    });
  };
  const dropdownData = (name: string) => {
    try {
      return name === COUNTRY_DROPDOWNS.country
        ? data?.map(item => ({
            ...item,
            key: item.country_id,
            label: item.name,
          }))
        : name === COUNTRY_DROPDOWNS.region
        ? regionsList?.map(item => ({
            ...item,
            label: item.name,
            key: item.zone_id,
          }))
        : citiesList?.map(item => ({
            ...item,
            label: item.locale_name,
            key: item.area_id,
          }));
    } catch (error) {}
  };
  const renderContent = (
    {name, placeholder}: AddressFieldType,
    renderProps: ControllerRenderProps<Record<string, any>>,
  ) => {
    switch (name) {
      case COUNTRY_DROPDOWNS.country:
      case COUNTRY_DROPDOWNS.city:
      case COUNTRY_DROPDOWNS.region:
        return (
          <CustomPicker
            error={errors[name]}
            selectedKey={
              name === COUNTRY_DROPDOWNS.country
                ? renderProps.value || params?.country_id
                : name === COUNTRY_DROPDOWNS.region
                ? renderProps.value || params?.zone_id
                : renderProps.value || params?.area_id
            }
            onChange={(option: any) => {
              console.log('changed', option);

              name === COUNTRY_DROPDOWNS.country &&
                getRegionsMutate(option.country_id);
              name === COUNTRY_DROPDOWNS.region &&
                getCitiesMutate(option.zone_id);
              renderProps.onChange(option.key);
            }}
            value={renderProps.value}
            placeholder={placeholder}
            header={placeholder}
            data={dropdownData(name)}
          />
        );
      case COUNTRY_DROPDOWNS.telephone:
        return (
          <View style={{width: calcWidth(335)}}>
            <IdentityInput
              usePhone
              phoneInputRef={phoneRef}
              fieldName={placeholder}
              fieldNameStyle={styles.fieldNameStyle}
              value={renderProps.value}
              error={errors[name]}
              onChangeText={value => renderProps.onChange(value)}
              withBorder
            />
          </View>
        );

      default:
        return (
          <CustomInput
            error={errors[name]}
            onChangeText={value => renderProps.onChange(value)}
            onBlur={renderProps.onBlur}
            value={renderProps.value}
            placeholder={placeholder}
            fieldName={placeholder}
            fieldNameStyle={styles.fieldNameStyle}
            containerStyle={{marginVertical: calcFont(7)}}
            keyboardType={
              name === COUNTRY_DROPDOWNS.postcode ? 'numeric' : 'default'
            }
            withBorder={true}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title={
          !params ? t('addAddress:addAddress') : t('addAddress:editAddress')
        }
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <KeyboardAwareFlatList
            removeClippedSubviews={false}
            style={{flex: 1, width: '100%'}}
            contentContainerStyle={{alignItems: 'center'}}
            data={ADD_ADDRESS_FIELDS}
            keyExtractor={item => `${item.order}${item.name}`}
            renderItem={({
              item: {name, placeholder, required, value, order, defaultValue},
            }) =>
              name !== COUNTRY_DROPDOWNS.location ? (
                <Controller
                  defaultValue={
                    defaultValue
                    // name === COUNTRY_DROPDOWNS.firstName
                    //   ? firstname
                    //   : name === COUNTRY_DROPDOWNS.lastName
                    //   ? lastname
                    //   : value
                  }
                  key={name + order}
                  control={control}
                  render={renderProps =>
                    renderContent(
                      {
                        name,
                        placeholder,
                        required,
                        value,
                        order,
                      },
                      renderProps,
                    )
                  }
                  name={name}
                  rules={{
                    required: {
                      value: required,
                      message: t('validation:required', {fieldName: ''}),
                    },
                  }}
                />
              ) : null
            }
            ListFooterComponent={
              <View style={{marginVertical: calcFont(20)}}>
                <CustomButton
                  mode={'contained'}
                  onPress={handleSubmit(onSubmitLocation)}
                  loading={addAddressLoading}>
                  {t('auth:submit')}
                </CustomButton>
              </View>
            }
          />
        </>
      )}
    </SafeAreaView>
  );
};

export {OldAddAddress};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'space-between',
  },
  mapContainer: {
    width: '100%',
    height: calcHeight(280),
  },
  inputsContainer: {
    paddingTop: 10,
    flex: 1,
    // height: SCREEN_HEIGHT * 0.44,
    // backgroundColor: COLORS.RATING_GOLD,

    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  fieldNameStyle: {color: COLORS.HEADER_TEXT},
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  rowInputsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
