/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {useTranslation} from 'react-i18next';
import {useQuery} from 'react-query';
import {endpoints} from '../../constants/apiEndpoints.constants';
import useAxios from '../../hooks/useAxios';
import {CartItem} from '../../interfaces';
import {AuthenticationContext} from '../AuthContext';
import {SnackBarContext} from '../SnackBarContext';

interface Props {
  children: ReactNode;
}
type getCartProductsResponseType =
  | {products: CartItem[]; totals: {title: string; text: string}[]}
  | undefined;
interface productContextDefaultValue {
  addToCart: (
    id: string,
    name: string,
    options?: object,
    quantity?: number,
    showSnackBar?: boolean,
  ) => void;
  cartProducts: getCartProductsResponseType;
  isCartLoading: boolean;
  getCartProductsError: boolean;
  isCartFetching: boolean;
  removeCartItem: (key: string, name: string) => void;
  onChangeAmount: (quantity: number, key: number) => void;
  reftchCart: () => void;
  addTocartLoading: boolean;
  removeFromCartLoading: boolean;
  selectedForAction: string;
}
export const cartContext = React.createContext<productContextDefaultValue>(
  {} as productContextDefaultValue,
);
const CartProvider = ({children}: Props) => {
  const [selectedForAction, setselectedForAction] = useState<string>('');
  const {
    state: {storeToken, userToken},
  } = useContext(AuthenticationContext);
  const {showSnackbar} = useContext(SnackBarContext);
  const Axios = useAxios();
  const {t} = useTranslation();
  const [addTocartLoading, setaddTocartLoading] = useState<boolean>(false);
  const [removeFromCartLoading, setremoveFromCartLoading] = useState<boolean>(
    false,
  );

  const getCartProducts = useCallback(async () => {
    const {
      data: {products, totals},
    } = await Axios.post(endpoints.cartProducts);
    return {products, totals};
  }, [storeToken, userToken]);

  const {data, isError, isLoading, refetch, isFetching} = useQuery(
    'getCartProducts',
    getCartProducts,
    {
      enabled: !!storeToken,
    },
  );
  useEffect(() => {
    refetch();
  }, [userToken]);
  const addToCartResponse = (
    name: string,
    message: string,
    error?: boolean,
  ) => {
    showSnackbar(`${name} ${message}`, error);
    setaddTocartLoading(false);
    setselectedForAction('');
  };
  const addToCart = useCallback(
    async (product_id, name, option, quantity = 1, showSnackBar = true) => {
      setselectedForAction(product_id);
      setaddTocartLoading(true);
      try {
        if (product_id) {
          const {
            data: {status, error},
          } = await Axios.post(endpoints.addToCart, {
            /* token: storeToken, */
            product: [
              {
                product_id,
                quantity,
                option,
              },
            ],
          });

          if (status == 'OK') {
            await refetch();
            product_id &&
              showSnackBar &&
              addToCartResponse(name, t('messages:addedToCart'));
          } else {
            addToCartResponse(name, error.warning[0], true);
          }
        }
      } catch (error) {
        console.log('add to cart error', error);
        addToCartResponse(name, t('messages:notAddedToCart'), true);
      }
    },
    [storeToken],
  );

  const removeCartItem = useCallback(
    async (key: string) => {
      setselectedForAction(`${key}`);
      setremoveFromCartLoading(true);
      try {
        await Axios.post(endpoints.removeFromCart, {
          key: `${key}` /* token: storeToken */,
        });
        await refetch();
        setremoveFromCartLoading(false);
        setselectedForAction('');
      } catch (error) {
        console.log('remove cart item error', error);
        //showSnackbar(`${name} ${t('messages:notAddedToCart')}`,true)
        setremoveFromCartLoading(false);
        setselectedForAction('');
      }
    },
    [storeToken],
  );
  const onChangeAmount = async (quantity: number, key: number) => {
    try {
      await Axios.post(endpoints.editCart, {
        quantity,
        key /* token: storeToken */,
      });
      await refetch();
    } catch (error) {}
  };
  return (
    <cartContext.Provider
      value={{
        cartProducts: data,
        isCartLoading: isLoading,
        getCartProductsError: isError,
        reftchCart: refetch,
        removeCartItem,
        isCartFetching: isFetching,
        onChangeAmount,
        addToCart,
        addTocartLoading,
        removeFromCartLoading,
        selectedForAction,
      }}>
      {children}
    </cartContext.Provider>
  );
};

export {CartProvider};
