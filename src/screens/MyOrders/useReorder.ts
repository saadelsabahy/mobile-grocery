import {useNavigation} from '@react-navigation/core';
import {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {useMutation} from 'react-query';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {cartContext, SnackBarContext} from '../../contexts';
import useAxios from '../../hooks/useAxios';
import {MyordersItemType} from '../../interfaces';

const useReorder = () => {
  const {t} = useTranslation();
  const Axios = useAxios();
  const {addToCart} = useContext(cartContext);
  const {showSnackbar} = useContext(SnackBarContext);
  const navigation = useNavigation();
  // const cartProductsIds = [
  //   ...new Set(cartProducts?.products?.map(item => item.product_id)),
  // ];

  const getOrderInfo = async (id: string) => {
    const {data} = await Axios.post(endpoints.getOrderInfo, {
      order_id: id,
    });

    return data;
  };
  const addOrderToCart = async (data: any) => {
    try {
      await data?.products?.map((item: MyordersItemType) =>
        // cartProductsIds.includes(item.product_id)
        //   ? null //onChangeAmount(2, +item.product_id)
        addToCart(
          item.product_id,
          item.name,
          item.option,
          item.quantity,
          false,
        ),
      );
      showSnackbar(t('myPurchases:reOrderSuccess'));
      navigation.navigate('Cart');
    } catch (error) {
      showSnackbar(t('myPurchases:reOrderFailed'), true);
      console.log('add order to cart error', error);
    }
  };
  const {data, isLoading, mutate} = useMutation('orderInfo', getOrderInfo, {
    onSuccess: data => addOrderToCart(data),
  });

  const onReorderPressed = async (id: string) => {
    mutate(id);
  };
  return {onReorderPressed, isLoading};
};

export default useReorder;
