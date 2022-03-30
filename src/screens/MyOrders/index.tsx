import {useFocusEffect} from '@react-navigation/native';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {I18nManager, Platform, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useQuery} from 'react-query';
import {
  CustomHeader,
  FlatlistWithCustomScrollIndicator,
  Loader,
} from '../../components';
import {MyordersCard} from '../../components/MyOrdersCard';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {COLORS} from '../../constants/style';
import {calcFont} from '../../constants/style/sizes';
import {cartContext} from '../../contexts';
import useAxios from '../../hooks/useAxios';
import {OrderType} from '../../interfaces';
import {EmptyOrders} from '../../svgs';
import useReorder from './useReorder';
dayjs.extend(customParseFormat);
interface Props {}

const MyOrders = ({navigation}: Props) => {
  const {t} = useTranslation();
  const Axios = useAxios();
  const {addTocartLoading} = useContext(cartContext);
  const {onReorderPressed, isLoading: isReorderLoading} = useReorder();
  const onOrderPressed = (id: string) => {
    id && navigation.navigate('OrderDetailes', {id});
  };
  const getOrders = async () => {
    const {
      data: {orders},
    }: {data: {orders: OrderType[]}} = await Axios.post(endpoints.getOrderList);

    return orders;
  };

  const {data, isLoading, isFetching, refetch} = useQuery('orders', getOrders);
  useFocusEffect(
    React.useCallback(() => {
      refetch();

      return () => {};
    }, []),
  );
  const renderEmptyOrders = () => (
    <View style={styles.emptyOrdersContainer}>
      <EmptyOrders style={{marginBottom: calcFont(26.5)}} />
      <Text>{t('myPurchases:emptyOrders')}</Text>
    </View>
  );
  const formatOrderDate = (date: string) => {
    const initial = I18nManager.isRTL
      ? date.split(/\//).reverse()
      : date.split(/\//);
    const formatedDate = [initial[1], initial[0], initial[2]].join(
      Platform.OS === 'android' ? '-' : '/',
    );

    return dayjs(formatedDate, 'DD/MM/YYYY').format('MMM D, YYYY');
  };
  return (
    <View style={[styles.container]}>
      <CustomHeader title={t('accountScreen:myOrders')} />
      {isLoading && <Loader />}
      {data && (
        <FlatlistWithCustomScrollIndicator
          data={data}
          keyExtractor={item => `${item.order_id}`}
          contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}
          renderItem={({item}: {item: OrderType}) => {
            return (
              <MyordersCard
                name={item.order_id}
                status={item.status}
                orderDate={formatOrderDate(item.date_added)}
                onMyordersCardPressed={() => onOrderPressed(item.order_id)}
                onReorderPressed={() => onReorderPressed(item.order_id)}
              />
            );
          }}
          ListEmptyComponent={renderEmptyOrders}
          refresh={isFetching}
          onPullToRefresh={() => refetch()}
        />
      )}
    </View>
  );
};

export {MyOrders};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  emptyOrdersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
