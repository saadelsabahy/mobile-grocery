import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {
  CustomHeader,
  EmptyComponent,
  FlatlistWithCustomScrollIndicator,
  Loader,
  ProductCard,
  SearchBar,
} from '../../components';
import {COLORS, COMMON_STYLES} from '../../constants/style';
import {calcFont} from '../../constants/style/sizes';
import {FavouritesContext} from '../../contexts';
import {Product} from '../../interfaces';
import {EmptyWishlist} from '../../svgs';
import {calcDiscount} from '../../utils';

interface Props {}

const Wishlist = ({navigation}: Props) => {
  const {t} = useTranslation();
  const {
    favourites,
    fetchingFavourites,
    loadingFavourite,
    reftchFavourites,
  } = useContext(FavouritesContext);

  const onProductPressed = (id: string | undefined) => {
    id &&
      navigation.navigate('ProductStack', {
        screen: 'Product',
        params: {id},
      });
  };
  const renderProductCardItem = ({item}: {item: Product; index: number}) => {
    return (
      <ProductCard
        onProductPressed={() => onProductPressed(item.product_id)}
        name={item.name}
        image={item.thumb || item.image}
        price={`${item.special ? item.special : item.price}`.trim()}
        discountValue={calcDiscount(String(item.special), item.price)}
        id={item.product_id}
        containerStyle={COMMON_STYLES.twoCoulmsProductCard}
        quantity={item.quantity}
      />
    );
  };
  const goToHome = () => {
    navigation.navigate('Home');
  };
  const renderEmptyWhishlist = () => (
    <EmptyComponent
      emptyText={t('favouriteScreen:emptyText')}
      withButton
      buttonText={t('cart:addItems')}
      onPress={goToHome}>
      <EmptyWishlist style={{marginBottom: calcFont(26.5)}} />
    </EmptyComponent>
  );

  return (
    <View style={styles.container}>
      <CustomHeader title={t('favouriteScreen:favourite')} />
      {!!favourites?.length && (
        <View style={styles.listHeaderComponent}>
          <SearchBar
            containerStyle={{
              marginVertical: calcFont(14),
              marginBottom: calcFont(14),
            }}
          />
        </View>
      )}
      <View style={styles.listContainer}>
        {loadingFavourite && <Loader />}
        {!!favourites && (
          <FlatlistWithCustomScrollIndicator
            ListHeaderComponentStyle={styles.listHeaderComponent}
            numColumns={2}
            key={2}
            data={favourites}
            keyExtractor={item => `${item.product_id}`}
            renderItem={renderProductCardItem}
            refresh={fetchingFavourites}
            onPullToRefresh={() => reftchFavourites()}
            ListEmptyComponent={renderEmptyWhishlist}
          />
        )}
      </View>
    </View>
  );
};

export {Wishlist};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  listContainer: {
    flex: 1,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listHeaderComponent: {
    //backgroundColor: COLORS.GRAY_LIGHT,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.GRAY_LIGHT,
    justifyContent: 'center',
    backgroundColor: COLORS.GRAY_LIGHT,
  },
});
