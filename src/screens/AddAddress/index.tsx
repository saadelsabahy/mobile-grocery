import Geolocation from '@react-native-community/geolocation';
import {useFocusEffect} from '@react-navigation/core';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Controller, ControllerRenderProps, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {PermissionsAndroid, Platform, StyleSheet, View} from 'react-native';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import MapView, {Marker} from 'react-native-maps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useMutation, useQuery} from 'react-query';
import reactotron from 'reactotron-react-native';
import {
  AcceptTerms,
  CustomButton,
  CustomHeader,
  CustomInput,
  IdentityInput,
  Loader,
} from '../../components';
import {CustomPicker} from '../../components/GenderPicker';
import {COLORS} from '../../constants/style';
import {calcFont, calcHeight, SCREEN_WIDTH} from '../../constants/style/sizes';
import {AuthenticationContext, SnackBarContext} from '../../contexts';
import {AddressFieldType} from '../../interfaces';
import useRequests from './useRequests';
interface Props {}
enum COUNTRY_DROPDOWNS {
  country = 'country_id',
  region = 'zone_id',
  city = 'area_id',
  location = 'location',
  telephone = 'telephone',
  default = 'default',
  postcode = 'postcode',
}

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;
const AddAddress = ({route}) => {
  const {t} = useTranslation();
  const params: IAddress = route?.params;
  const phoneRef = useRef();
  const [currentPosition, setcurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const {
    state: {settings},
  } = useContext(AuthenticationContext);
  const {showSnackbar} = useContext(SnackBarContext);
  const [getLocationLoading, setgetLocationLoading] = useState(false);
  const {
    getAddressFields,
    regionsList,
    getRegionsMutate,
    citiesList,
    getCitiesMutate,
    addAddress,
  } = useRequests();

  const {data, isLoading} = useQuery('address', getAddressFields);
  const {isLoading: addAddressLoading, mutate} = useMutation(
    'addAddress',
    addAddress,
  );

  const {handleSubmit, errors, reset, control} = useForm();
  useFocusEffect(
    useCallback(() => {
      requestLocationPermission();
    }, []),
  );

  useEffect(() => {
    params?.country_id && getRegionsMutate(+params?.country_id);
    params?.zone_id && getCitiesMutate(+params?.zone_id);
  }, []);
  /*  useEffect(() => {
    isFocused && requestLocationPermission();
  }, [isFocused]); */
  ///get location
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getOneTimeLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          getOneTimeLocation();
        } else {
          console.log('Permission Denied');
        }
      } catch (err) {
        console.log({err});
      }
    }
  };
  const getOneTimeLocation = () => {
    setgetLocationLoading(true);
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setcurrentPosition(prev => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
        setgetLocationLoading(false);
      },
      error => {
        console.log({error});
        setgetLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        //maximumAge: 1000,
      },
    );
  };
  const onSubmitLocation = (data: any) => {
    //add lat,long 0,1 for default
    reactotron.log({...data});
    mutate(
      {
        ...data,
        location: `${currentPosition.latitude},${currentPosition.longitude}`,
      },
      {
        onSuccess: data => {
          reactotron.log({data});
          if (data.success) {
            reset();
            showSnackbar(t('addAddress:addAddressSuccess'));
          } else {
            showSnackbar(data.errors[Object.keys(data.errors)[0]], true);
          }
        },
      },
    );
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
            onChange={(option: any) => {
              name == COUNTRY_DROPDOWNS.country &&
                getRegionsMutate(option.country_id);
              name == COUNTRY_DROPDOWNS.region &&
                getCitiesMutate(option.zone_id);
              renderProps.onChange(option.key);
            }}
            value={renderProps.value}
            selectedKey={
              name === COUNTRY_DROPDOWNS.country
                ? renderProps.value || params?.country_id
                : name === COUNTRY_DROPDOWNS.region
                ? renderProps.value || params?.zone_id
                : renderProps.value || params?.area_id
            }
            placeholder={placeholder}
            header={placeholder}
            data={
              name == COUNTRY_DROPDOWNS.country
                ? settings?.countries?.map(item => ({
                    ...item,
                    key: item.country_id,
                    label: item.name,
                  }))
                : name == COUNTRY_DROPDOWNS.region
                ? regionsList?.map(item => ({
                    ...item,
                    label: item.name,
                    key: item.zone_id,
                  }))
                : citiesList?.map(item => ({
                    ...item,
                    label: item.name,
                    key: item.area_id,
                  }))
            }
          />
        );
      case COUNTRY_DROPDOWNS.telephone:
        return (
          <View style={{width: SCREEN_WIDTH * 0.9}}>
            <IdentityInput
              usePhone
              phoneInputRef={phoneRef}
              fieldName={placeholder}
              value={renderProps.value}
              error={errors[name]}
              onChangeText={value => renderProps.onChange(value)}
              withBorder
              placeholder={/* params[name] || */ placeholder}
            />
          </View>
        );
      case COUNTRY_DROPDOWNS.default:
        return (
          <AcceptTerms
            onChange={value => renderProps.onChange(!value)}
            value={renderProps.value}
            placeholder={/* params[name] || */ placeholder}
            error={errors[name]}
          />
        );
      default:
        return (
          <CustomInput
            error={errors[name]}
            onChangeText={value => renderProps.onChange(value)}
            onBlur={renderProps.onBlur}
            value={renderProps.value}
            placeholder={/* params[name] || */ placeholder}
            withBorder
            containerStyle={{marginVertical: calcFont(10)}}
            keyboardType={
              name == COUNTRY_DROPDOWNS.postcode ? 'numeric' : 'default'
            }
          />
        );
    }
  };

  const onRegionChange = (location: any) => {
    setcurrentPosition(location);
  };
  reactotron.log({params});
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title={
          !params ? t('addAddress:addAddress') : t('addAddress:editAddress')
        }
      />
      {isLoading || getLocationLoading ? (
        <Loader />
      ) : (
        <>
          <View style={styles.mapContainer}>
            <MapView
              provider={'google'}
              style={styles.mapView}
              region={currentPosition}
              showsUserLocation={true}
              followsUserLocation={true}
              onRegionChangeComplete={onRegionChange}>
              <Marker coordinate={currentPosition} />
            </MapView>
          </View>
          <KeyboardAwareFlatList
            /*   keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag" */
            removeClippedSubviews={false}
            style={{flex: 1, width: '100%'}}
            contentContainerStyle={{alignItems: 'center'}}
            data={data}
            keyExtractor={item => `${item.order}${item.name}`}
            renderItem={({item: {name, placeholder, required, value, order}}) =>
              name !== COUNTRY_DROPDOWNS.location ? (
                <Controller
                  defaultValue={value}
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

export {AddAddress};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'space-between',
  },
  mapView: {flex: 1, height: calcHeight(280)},
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
  input: {
    width: SCREEN_WIDTH - 20,
    borderWidth: 0,
    borderBottomWidth: 1,
    marginBottom: calcFont(20),
    backgroundColor: 'transparent',
    height: calcHeight(38),
  },
});
