/* eslint-disable react-hooks/exhaustive-deps */
import {AxiosResponse} from 'axios';
import DOMSerializer from 'dom-serializer';
import React, {useCallback, useContext, useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, View} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {Text, useTheme} from 'react-native-paper';
import RenderHTML from 'react-native-render-html';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {useQuery} from 'react-query';
import reactotron from 'reactotron-react-native';
import {
  CustomButton,
  CustomHeader,
  CustomSwiper,
  Loader,
} from '../../components';
import CartCounter from '../../components/CartItem/CartCounter';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {FONTS} from '../../constants/style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/style/sizes';
import {
  AuthenticationContext,
  FavouritesContext,
  ProductContext,
} from '../../contexts';
import {cartContext} from '../../contexts/CartContext';
import useAxios from '../../hooks/useAxios';
import useEffectUpdate from '../../hooks/useEffectUpdate';
import {CartItemOption, Product as ProductInterface} from '../../interfaces';
import {itemQuentityInCart} from '../../utils';
import {
  Options,
  ProductAttributes,
  ProductSection,
  RelatedProductsSection,
} from './components';
import styles from './styles';
const renderersProps = {
  img: {
    enableExperimentalPercentWidth: true,
  },
  ol: {enableExperimentalRtl: true},
  ul: {enableExperimentalRtl: true},
};
const tagsStyles = {
  body: {
    fontFamily: FONTS.regular.fontFamily,
    textAlign: 'right',
  },
  //div: {textAlign: I18nManager.isRTL ? 'right' : 'left'},
  p: {textAlign: 'left'},
  h: {
    fontFamily: FONTS.regular.fontFamily,
  },
  img: {
    alignSelf: 'right',
  },
};
interface Props {}
function renderNode(node, index) {
  if (node.name === 'img') {
    return (
      <RenderHTML
        contentWidth={SCREEN_WIDTH}
        source={{html: DOMSerializer(node)}}
        renderersProps={renderersProps}
        tagsStyles={tagsStyles}
        key={index}
      />
    );
  }
  if (node.name == 'iframe') {
    const a = node.attribs;
    const iframeHtml = `<iframe src="${a.src}" width="90%" height="100%" />`;
    console.log('a.src', a.src);

    return (
      <View
        key={index}
        style={{
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT / 4,
        }}>
        <WebView source={{html: iframeHtml}} />
      </View>
    );
  }
}
const Product = ({route, navigation}: Props) => {
  const {t} = useTranslation();
  const {
    colors: {primary},
  } = useTheme();

  const Axios = useAxios();
  const {id, options} = route?.params;
  const {
    selectedOptions,
    resetSelectedOptions,
    quantity,
    setquantity,
    price,
    setprice,
    resetState,
    setSelectedOptions,
  } = useContext(ProductContext);

  const {
    addToCart,
    cartProducts,
    onChangeAmount,
    addTocartLoading,
    removeFromCartLoading,
    selectedForAction,
  } = useContext(cartContext);
  const {
    state: {userToken},
  } = useContext(AuthenticationContext);
  const {favourites, addToFavourites, removeFromFavourites} = useContext(
    FavouritesContext,
  );
  const addedToCart = useMemo(
    () =>
      [
        ...new Set(cartProducts?.products?.map(item => item.product_id)),
      ].includes(id),
    [id, cartProducts?.products.length],
  );

  const getProductRequest = async () => {
    const data: AxiosResponse<{
      Product: ProductInterface;
    }> = await Axios.post(endpoints.product, {
      product_id: id,
    });
    return data.data.Product;
  };
  const {isLoading, data} = useQuery(`productQuery${id}`, getProductRequest, {
    onError: () => navigation.goBack(),
  });
  const key = useMemo(
    () =>
      cartProducts?.products.find(item => item.product_id === data?.product_id)
        ?.key,
    [data?.product_id],
  );
  const cartItemQuantity = itemQuentityInCart(
    addedToCart,
    cartProducts?.products!,
    id,
  );

  const onProductPressed = (id: string | undefined) => {
    navigation.push('Product', {id});
  };

  const favouritesProductsIds = [
    ...new Set(favourites?.map(item => item.product_id)),
  ];
  const liked = favouritesProductsIds.includes(id);
  const handleWhishlist = useCallback(() => {
    if (userToken) {
      liked ? removeFromFavourites(id) : addToFavourites(id);
    } else {
      navigation.navigate('Auth');
    }
  }, [userToken, liked]);
  const onDecreasePressed = () => {
    setquantity(prev => (prev <= 1 ? 1 : prev - 1));
    //console.log(cartItemQuantity !== quantity - 1);
  };
  //console.log(cartItemQuantity);

  const onIncreasePressed = () => {
    setquantity(prev =>
      prev >= +data?.quantity! && +!data?.unlimited
        ? +data?.quantity!
        : prev + 1,
    );
  };
  const updateCartCounter = useCallback(() => {
    //console.log({key});

    addedToCart &&
      cartItemQuantity !== quantity &&
      onChangeAmount(quantity, key!);
  }, [quantity, key]);
  useEffectUpdate(updateCartCounter);
  const onAddToCart = () => {
    //console.log({selectedOptions});

    const currentSelectedOptions = Object.keys(selectedOptions).reduce(
      function (result, key) {
        // @ts-ignore
        result[key] =
          Array.isArray(selectedOptions[key]) && selectedOptions[key].length > 0
            ? selectedOptions[key].join(',')
            : selectedOptions[key];
        return result;
      },
      {},
    );
    reactotron.log({currentSelectedOptions});
    addedToCart
      ? navigation.push('Tabs', {screen: 'Cart'})
      : addToCart(
          data?.product_id!,
          data?.name!,
          currentSelectedOptions,
          quantity,
        );
  };

  /* set product options */

  useEffect(() => {
    options?.length &&
      options.map((item: CartItemOption) => {
        setSelectedOptions(prev => ({
          ...prev,
          [item.product_option_id]: item.product_option_value_id,
        }));
      });
  }, [options?.length, data]);
  /* change quentity when quentity in cart change*/
  useEffect(() => {
    setquantity(addedToCart ? cartItemQuantity : 1);
    return () => {
      resetSelectedOptions();
    };
  }, []);
  // reactotron.log({
  //   optionPriceInfo,
  // });

  useEffect(() => {
    //console.log(data?.special ? data.special : data?.float_price);

    data?.float_price &&
      setprice(data?.special ? data.float_special : data.float_price);
    return () => {
      resetState();
    };
  }, [data?.special, data?.float_price]);
  /* change amount request when product added to cart */
  // useEffect(() => {

  // }, []);
  const {bottom} = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingBottom: bottom + 10}]}>
      <CustomHeader
        title={t('productScreen:productDetails')}
        endActionType="icon"
        liked={liked}
        handleWhishlist={handleWhishlist}
      />
      {isLoading && <Loader />}
      {data && !Array.isArray(data) && (
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          nestedScrollEnabled={true}>
          <View style={styles.swiperContainer}>
            <CustomSwiper
              onImagePressed={() => {}}
              product={true}
              images={
                data?.product_images?.length
                  ? data.product_images.map((item: {url: string}) => ({
                      slideimage: item.url,
                    }))
                  : [{slideimage: data.image}]
              }
              showsPagination
            />
            <View style={styles.productDetailesContainer}>
              <Text children={data.name} style={styles.productName} />
              <View style={styles.priceAndCounterContainer}>
                <View style={{flex: 1}}>
                  <Text
                    children={
                      `${(Math.round(price * quantity * 100) / 100).toFixed(
                        2,
                      )} ` + data.currency
                    }
                    style={[styles.price, {color: primary}]}
                  />
                  {!!data.special && (
                    <Text
                      children={data.price}
                      style={styles.priceBeforeDiscount}
                    />
                  )}
                </View>
                <CartCounter
                  product
                  containerStyle={{flex: 1}}
                  amount={quantity}
                  onDecreasePressed={onDecreasePressed}
                  onIncreasePressed={onIncreasePressed}
                  countStyle={styles.count}
                  quantity={data.quantity}
                  unlimited={data.unlimited}
                />
              </View>
            </View>
          </View>
          {!!data.product_options?.length && (
            <ProductSection>
              <Options data={data.product_options} />
            </ProductSection>
          )}
          {!!data.fixed_description?.length && (
            <ProductSection label={t('productScreen:productDetails')}>
              <HTMLView
                value={data?.fixed_description}
                style={{width: '100%'}}
                addLineBreaks={true}
                TextComponent={props => <Text {...props} />}
                renderNode={renderNode}
              />
            </ProductSection>
          )}
          {!!data?.attributes?.length && (
            <ProductSection label={t('screens:product:attributes')}>
              <ProductAttributes attributes={data.attributes} />
            </ProductSection>
          )}
          {!!data?.related_product?.length && (
            <RelatedProductsSection
              data={data?.related_product}
              onProductPressed={onProductPressed}
            />
          )}
        </ScrollView>
      )}
      {data?.price && (
        <View style={{alignItems: 'center'}}>
          <CustomButton
            onPress={onAddToCart}
            mode="contained"
            loading={
              selectedForAction == data.product_id &&
              (addTocartLoading || removeFromCartLoading)
            }>{`${
            addedToCart
              ? t('cart:goToCart')
              : t('categoriesDetailesScreen:addToCart') + ` (${data?.price})`
          }`}</CustomButton>
        </View>
      )}
    </View>
  );
};

export {Product};
