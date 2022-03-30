/* eslint-disable react-hooks/exhaustive-deps */
import {useFocusEffect} from '@react-navigation/core';
import React, {useCallback, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {useQuery} from 'react-query';
import {
  CustomHeader,
  EmptyComponent,
  FlatlistWithCustomScrollIndicator,
  Loader,
  RefareLink,
} from '../../components';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {hasNewLogin} from '../../constants/config.constants';
import {COLORS} from '../../constants/style';
import {calcFont, calcHeight} from '../../constants/style/sizes';
import {AuthenticationContext} from '../../contexts';
import useAxios from '../../hooks/useAxios';
import {IAddress} from '../../interfaces';
import {NoAddress} from '../../svgs';
interface Props {}

const Addresses = ({navigation}: Props) => {
  const {t} = useTranslation();
  const Axios = useAxios(hasNewLogin);
  const {
    state: {
      userData: {customer_id},
    },
  } = useContext(AuthenticationContext);
  const getAddresses = useCallback(async () => {
    const data = await Axios.post(
      hasNewLogin ? endpoints.getAddresses : endpoints.addressesList,
      hasNewLogin ? null : {customer_id},
    );
    reactotron.log({data});

    return hasNewLogin ? data?.addresses : data.data.data.addresses;
  }, []);
  const {data, isLoading, refetch, isFetching} = useQuery<IAddress[]>(
    'getAddresses',
    getAddresses,
  );
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, []),
  );
  const onAddAddressPressed = useCallback(() => {
    navigation.navigate('AddAddress');
  }, []);
  const renderEmptyList = () => {
    return (
      <EmptyComponent
        emptyText={t('addAddress:noAddresses')}
        withButton
        buttonText={t('addAddress:addAddress')}
        onPress={onAddAddressPressed}>
        <NoAddress style={{marginBottom: calcFont(10)}} />
      </EmptyComponent>
    );
  };

  const onAddressPressed = (params: Pick<IAddress>) => {
    navigation.navigate('AddAddress', {...params});
  };
  return (
    <View style={styles.container}>
      <CustomHeader
        endActionType={'text'}
        endActionTitle={t('addAddress:add')}
        title={t('moreScreen:locations')}
        onEndActionPressed={onAddAddressPressed}
      />
      {isLoading && <Loader />}
      {!!data && (
        <FlatlistWithCustomScrollIndicator
          contentContainerStyle={styles.contentContainerStyle}
          refresh={isFetching}
          onPullToRefresh={() => refetch()}
          data={data}
          keyExtractor={item => `${item.address_id}`}
          renderItem={({
            item: {
              address_1,
              country,
              city,
              area,
              zone,
              country_id,
              area_id,
              area_code,
              address_id,
              zone_id,
              telephone,
              postcode,
            },
          }: {
            item: IAddress;
          }) => {
            return (
              <RefareLink
                icon={'map-marker'}
                text={`${country} , ${zone} , ${area ? area : city}`}
                subText={address_1}
                containerStyle={styles.addressContainer}
                iconColor={COLORS.PLACEHOLDER}
                onPress={() =>
                  onAddressPressed({
                    address_1,
                    country,
                    city,
                    area,
                    zone,
                    country_id,
                    area_id,
                    area_code,
                    address_id,
                    zone_id,
                    telephone,
                    postcode,
                  })
                }
              />
            );
          }}
          ListEmptyComponent={renderEmptyList}
        />
      )}
    </View>
  );
};

export {Addresses};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  addressContainer: {minHeight: calcHeight(67), marginBottom: calcFont(12)},
  contentContainerStyle: {
    alignItems: 'center',
    paddingTop: calcFont(5),
    flexGrow: 1,
  },
});
