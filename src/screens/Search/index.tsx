/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useInfiniteQuery} from 'react-query';
import {
  CustomHeader,
  Loader,
  ProductCard,
  RecentSearchesList,
  SearchBar,
} from '../../components';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {COLORS, COMMON_STYLES} from '../../constants/style';
import {
  calcFont,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../constants/style/sizes';
import useAxios from '../../hooks/useAxios';
import {Product} from '../../interfaces';
import {calcDiscount, removeDublicates} from '../../utils';
import useRecentSearch from './useRecentSearch';

interface Props {}

const Search = ({navigation}: Props) => {
  const [searchText, setsearchText] = useState<string>('');
  const {
    colors: {primary},
  } = useTheme();
  const {t} = useTranslation();
  const Axios = useAxios();
  const {clearRecent, setRecentSearch, recentSearch} = useRecentSearch();
  const [currentPage, setcurrentPage] = useState<number>(0);
  const getSearchData = useCallback(
    async ({pageParam}) => {
      const {
        data: {items},
      } = await Axios.post(endpoints.advancedFilter, {
        filterText: searchText,
        start: pageParam,
        limit: 10,
      });
      setcurrentPage(pageParam + 10);
      return items;
    },
    [searchText],
  );
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    isLoading,
  } = useInfiniteQuery(
    `searchQuery${searchText}`,
    ({pageParam = 0}) => getSearchData({pageParam}),
    {
      getNextPageParam: lastPage => {
        /*  Reactotron.log(lastPage[lastPage.length - 1].product_id); */

        if (lastPage?.length) {
          return currentPage;
        }
        return undefined;
      },
      // getPreviousPageParam: (firstPage) => firstPage.prevCursor,
      staleTime: 100,
      cacheTime: 100,
      enabled: !!searchText,
      select: data => ({
        ...data,
        pages: data?.pages?.flatMap(page => page),
      }),
    },
  );
  const onChangeText = (text: string) => {
    setsearchText(text);
  };
  // Reactotron.log(hasNextPage, isFetchingNextPage, data);

  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  useEffect(() => {
    return () => {
      setcurrentPage(0);
    };
  }, []);

  const renderLoader = useCallback(() => {
    return hasNextPage ? (
      <ActivityIndicator animating={isFetchingNextPage} color={primary} />
    ) : null;
  }, [isFetchingNextPage]);
  const onProductPressed = (productId: string, productName: string) => {
    !recentSearch.includes(productName) && setRecentSearch(productName);
    !!productId &&
      navigation.navigate('ProductStack', {
        screen: 'Product',
        params: {id: productId},
      });
  };

  const renderSearchItem = ({item}: {item: Product}) => {
    return (
      <ProductCard
        name={item.name}
        image={item.image}
        price={`${item.special ? item.special : item.price} ${item.currency}`}
        discountValue={calcDiscount(item.special, item.price)}
        onProductPressed={() => onProductPressed(item.product_id, item.name)}
        id={item.product_id}
        quantity={item.quantity}
        containerStyle={COMMON_STYLES.twoCoulmsProductCard}
      />
    );
  };
  //remove dublicates

  const notRedundency = removeDublicates(data?.pages!);
  const onSearchItemPressed = (item: string) => {
    setsearchText(item);
  };
  return (
    <SafeAreaView style={[styles.container]}>
      <CustomHeader title={t('homeScreen:searchPlaceHolder')} />
      <SearchBar
        editable
        autoFocus
        placeholder={t('homeScreen:searchPlaceHolder')}
        onChangeText={onChangeText}
        value={searchText}
        containerStyle={styles.searchBarContainer}
      />
      {!searchText && !!recentSearch.length && (
        <RecentSearchesList
          onSearchItemPressed={onSearchItemPressed}
          data={recentSearch}
          onClearPressed={clearRecent}
        />
      )}
      <View style={[styles.container]}>
        {isLoading ? (
          <Loader />
        ) : (
          <KeyboardAwareFlatList
            data={searchText && notRedundency?.length ? notRedundency : []}
            renderItem={renderSearchItem}
            keyExtractor={item => `${item.product_id}`}
            numColumns={2}
            ListFooterComponent={renderLoader}
            ListFooterComponentStyle={COMMON_STYLES.paginationLoaderStyle}
            onEndReached={onEndReached}
            keyboardShouldPersistTaps="always"
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export {Search};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  searchContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 17,
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    marginBottom: 0,
    marginVertical: calcFont(10),
    width: '100%',
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    height: SCREEN_HEIGHT / 17,
  },
  listContainerStyle: {
    flexGrow: 1,
    alignSelf: 'center',
  },
});
