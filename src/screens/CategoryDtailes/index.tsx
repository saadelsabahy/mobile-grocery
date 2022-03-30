import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useInfiniteQuery, useQuery} from 'react-query';
import reactotron from 'reactotron-react-native';
import {
  CustomHeader,
  FlatlistWithCustomScrollIndicator,
  HorizontalCategoriesName,
  Loader,
  ProductCard,
  SearchBar,
} from '../../components';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {COLORS, COMMON_STYLES} from '../../constants/style';
import useAxios from '../../hooks/useAxios';
import {Product} from '../../interfaces';
import {EmptyItems} from '../../svgs';
import {calcDiscount, removeDublicates} from '../../utils';

interface Props {}

const CategoryDetailes = ({route, navigation}: Props) => {
  const {t} = useTranslation();
  const {
    colors: {primary},
  } = useTheme();
  const {id, name} = route?.params;
  const [subcategories, setsubcategories] = useState([]);
  const [visible, setvisible] = React.useState('');
  const [toggleGrid, settoggleGrid] = React.useState(false);
  const [currentPage, setcurrentPage] = React.useState(0);
  const [selectedItemes, setselectedItemes] = React.useState<object>({});
  const [sortItem, setsortItem] = React.useState({});
  const [inputsValues, setinputsValues] = React.useState({});
  const [refresh, setrefresh] = React.useState(false);
  const Axios = useAxios();

  React.useEffect(() => {
    return () => {
      setcurrentPage(0);
      setinputsValues({});
      setsortItem({});
      setselectedItemes({});
    };
  }, []);

  const getCategoryProducts = async ({pageParam}) => {
    const {
      data: {items, subcategories},
    } = await Axios.post(endpoints.advancedFilter, {
      // filterText: searchText,
      start: pageParam,
      limit: 10,
      categories_ids: [id],
      filter_option: Object.values(selectedItemes).filter(x => x),
      sort_order: Object.values(sortItem).length ? sortItem.sort_order : '',
      sort_criteria: Object.values(sortItem).length
        ? sortItem.sort_criteria
        : '',

      starting_price: inputsValues?.startPrice || '',
      ending_price: inputsValues?.endPrice || '',
    });
    setcurrentPage(pageParam + 10);
    setsubcategories(subcategories);
    return items;
  };

  const getFilterOptions = useCallback(async () => {
    const {
      data: {
        data: {options},
      },
    } = await Axios.post(endpoints.filterOptions, {category_id: id});

    return options;
  }, [id]);
  const {data: filterOptions, isLoading: loadingFilterOptions} = useQuery(
    `getfilterOptions${id}`,
    getFilterOptions,
  );
  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    data,
    isError,
    isLoading,
    refetch,
    isFetching,
  } = useInfiniteQuery(
    `categoryDetails${id}`,
    ({pageParam = 0}) => getCategoryProducts({pageParam}),
    {
      getNextPageParam: lastPage => {
        if (lastPage?.length) {
          return currentPage;
        }
        return undefined;
      },
      // getPreviousPageParam: (firstPage) => firstPage.prevCursor,
      staleTime: 100,
      cacheTime: 100,
      enabled: !!id,
      select: data => ({...data, pages: data.pages.flatMap(page => page)}),
    },
  );

  const onShowModalPressed = (type: string) => setvisible(type);
  const hideModal = () => setvisible('');

  const onProductPressed = (productId: string | undefined) => {
    !!productId &&
      navigation.navigate('ProductStack', {
        screen: 'Product',
        params: {id: productId},
      });
  };
  const listHeaderComponent = () => (
    <HorizontalCategoriesName
      subCategories={subcategories}
      onItemPressed={(id, name) =>
        navigation.push('CategoryDetailes', {
          id,
          name,
        })
      }
    />
  );

  const renderProductCardItem = ({item}: {item: Product}) => {
    return (
      <ProductCard
        onProductPressed={() => onProductPressed(item.product_id)}
        name={item.name}
        image={item.image}
        price={`${item.special ? item.special : item.price} ${item.currency}`}
        discountValue={calcDiscount(item.special, item.price)}
        id={item.product_id}
        quantity={item.quantity}
        containerStyle={COMMON_STYLES.twoCoulmsProductCard}
      />
    );
  };

  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  const renderLoader = useCallback(() => {
    return hasNextPage ? (
      <ActivityIndicator animating={isFetchingNextPage} color={primary} />
    ) : null;
  }, [isFetchingNextPage]);

  const onPullToRefresh = async () => {
    setrefresh(true);
    await refetch();
    setrefresh(false);
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title={name}
        // endActionType={'text'}
        // endActionTitle={t('categoriesDetailesScreen:filter')}
        // onEndActionPressed={() => navigation.navigate('Filter')}
      />
      <SearchBar />
      {!!data?.pages.length && !!subcategories.length && listHeaderComponent()}
      {isLoading && <Loader />}
      {!!data && (
        <View style={styles.listContainer}>
          <FlatlistWithCustomScrollIndicator
            // contentContainerStyle={{justifyContent: 'space-evenly'}}
            numColumns={2}
            key={2}
            data={removeDublicates(data?.pages)}
            keyExtractor={(item, index: number) => `${item.product_id}`}
            renderItem={renderProductCardItem}
            onEndReached={onEndReached}
            ListFooterComponent={renderLoader}
            ListFooterComponentStyle={COMMON_STYLES.paginationLoaderStyle}
            onPullToRefresh={onPullToRefresh}
            refresh={refresh}
            ListEmptyComponent={
              <View style={[COMMON_STYLES.emptyStatusContainer]}>
                <EmptyItems />
              </View>
            }
          />
        </View>
      )}
    </View>
  );
};

export {CategoryDetailes};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  listContainer: {
    flex: 1,
    //backgroundColor: '#832',
    //alignItems: 'center',
  },
});
