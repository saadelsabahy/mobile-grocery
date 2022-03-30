import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useQuery} from 'react-query';
import reactotron from 'reactotron-react-native';
import {CartFooter, CustomHeader, Loader, RefareLink} from '../../components';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {COLORS} from '../../constants/style';
import {calcFont, calcHeight} from '../../constants/style/sizes';
import useAxios from '../../hooks/useAxios';
import {MyordersItemType, OrderDetailsType} from '../../interfaces';

interface Props {}

const OrderDetailes = ({route, navigation}: Props) => {
  const {id} = route?.params;
  reactotron.log(id);
  const {t} = useTranslation();
  const Axios = useAxios();
  const getOrderInfo = async () => {
    const {data}: {data: OrderDetailsType} = await Axios.post(
      endpoints.getOrderInfo,
      {
        order_id: id,
      },
    );

    return data;
  };
  const {data, isLoading} = useQuery(`orderInfo${id}`, getOrderInfo, {
    cacheTime: 0,
    staleTime: 0,
    enabled: !!id,
  });
  return (
    <View style={[styles.container]}>
      <CustomHeader title={id} withBorder />
      {isLoading && <Loader />}
      {!!data && (
        <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false}>
          {/* <OrdersMap /> */}
          <View style={styles.contentContainer}>
            {/* location address */}
            <View style={styles.deliveryLocationContainer}>
              <Text style={styles.deliveryLocation}>
                {t('myPurchases:deliveryLocation')}
              </Text>
              <RefareLink
                icon={'map-marker'}
                text={data.shipping_address.replace(/<br\s*\/?>/gi, ' , ')}
                //subText={'21 Building,300 Street ,Palestine Square'}
                containerStyle={{height: calcHeight(67)}}
                iconColor={COLORS.PLACEHOLDER}
              />
            </View>
            {/* order products*/}
            <View style={{flex: 1}}>
              <Text style={[styles.deliveryLocation, styles.orderSummeryText]}>
                {t('myPurchases:orderSummary')}
              </Text>
              {data?.products?.map((item: MyordersItemType, index) => {
                return (
                  <View key={item.name + index} style={styles.rowTextContainer}>
                    <View style={styles.productNameContainer}>
                      <Text
                        style={
                          styles.productName
                        }>{`${item.quantity} - ${item.name}`}</Text>
                    </View>
                    <View style={styles.priceContainer}>
                      <Text
                        style={[
                          styles.productName,
                          {marginVertical: 0},
                        ]}>{`${item.price}`}</Text>
                    </View>
                  </View>
                );
              })}
            </View>

            {!!data && (
              <CartFooter
                total={data?.totals[data.totals.length - 1].text}
                order
                oncheckoutPressed={() => navigation.goBack()}
              />
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export {OrderDetailes};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: calcFont(20),
    flex: 1,
  },
  deliveryLocationContainer: {
    paddingVertical: calcFont(20),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.CART_ITEM_BORDER,
  },
  deliveryLocation: {
    marginBottom: calcFont(10),
    fontSize: calcFont(16),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.28,
    color: COLORS.HEADER_TEXT,
    textTransform: 'capitalize',
  },
  orderSummeryText: {marginVertical: calcFont(10), alignSelf: 'flex-start'},
  rowTextContainer: {
    height: 'auto',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productNameContainer: {
    marginVertical: calcFont(11),
    width: '70%',
  },
  productName: {
    fontSize: calcFont(16),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.28,
    color: COLORS.HEADER_TEXT,
  },
  priceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
{
  /* <FlatList
          data={data?.products}
          keyExtractor={(_, index) => `${index}`}
          renderItem={({item, index}) => {
            return (
              <MyordersCard
                name={item.name}
                image={item.image}
                status={`${t('myPurchases:orderStatus')} : ${status}`}
                manufacturer={`${t('myPurchases:manufacturer')} : ${
                  item.manufacturer
                }`}
                quantity={`${t('myPurchases:quantity')} : ${item.quantity}`}
                price={`${t('categoriesDetailesScreen:price')} : ${item.total}`}
                orderDate={`${t('myPurchases:orderDate')} : ${data.date_added}`}
              />
            );
          }}
        /> */
}
