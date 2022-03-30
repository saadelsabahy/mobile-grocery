/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {useInfiniteQuery} from 'react-query';
import {
  CategoryNameAndAvatar,
  CustomHeader,
  FlatlistWithCustomScrollIndicator,
  Loader,
  SearchBar,
} from '../../components';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {COLORS, COMMON_STYLES} from '../../constants/style';
import {calcFont} from '../../constants/style/sizes';
import useAxios from '../../hooks/useAxios';
import {categoriesInterface} from '../../interfaces';
interface Props {
  navigation: any;
}

const Categories = ({navigation}: Props) => {
  const [currentPage, setcurrentPage] = useState<number>(0);
  const {t} = useTranslation();
  const {
    colors: {primary},
  } = useTheme();
  const Axios = useAxios();
  const getCategories = useCallback(async ({pageParam}) => {
    const {
      data: {categories},
    }: {data: {categories: categoriesInterface[]}} = await Axios.post(
      endpoints.storeCategories,
      {
        start: pageParam,
        limit: 12,
      },
    );
    setcurrentPage(pageParam + 10);
    return categories;
  }, []);
  const {
    isLoading,
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'categoriesRequest',
    ({pageParam = 0}) => getCategories({pageParam}),
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
      select: data => ({
        ...data,
        pages: data?.pages?.flatMap(page => page),
      }),
    },
  );
  /* functions */
  const onCategoryItemPressed = (item: any) => {
    const {category_id: id, Category_Id, name, Name} = item;

    navigation.navigate('CategoryDetailes', {
      id: Category_Id || id,
      name: Name || name,
      //subCategories: children,
    });
  };
  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  /* useEffect(() => {
    return () => {
      console.log('reset setcurrentPage');

      setcurrentPage(0);
    };
  }, []); */
  const renderLoader = useCallback(() => {
    return hasNextPage ? (
      <ActivityIndicator animating={isFetchingNextPage} color={primary} />
    ) : null;
  }, [isFetchingNextPage]);
  console.log(isLoading, data);

  return (
    <View style={styles.container}>
      <CustomHeader
        title={t('tabs:categories')}
        endActionType="text"
        endActionTitle={t('categoriesDetailesScreen:filter')}
        onEndActionPressed={() => navigation.navigate('Filter')}
      />

      <SearchBar containerStyle={{marginBottom: calcFont(15)}} />

      <View style={styles.listContainer}>
        <Text style={styles.categoryText}>{t('tabs:categories')}</Text>
        {isLoading && <Loader />}
        {!!data?.pages && (
          <FlatlistWithCustomScrollIndicator
            numColumns={3}
            data={data?.pages!}
            keyExtractor={item => `${item.category_id}`}
            renderItem={({item, item: {name, image}}) => {
              return (
                <CategoryNameAndAvatar
                  name={name}
                  avatar={image}
                  onItemPressed={() => onCategoryItemPressed(item)}
                />
              );
            }}
            onPullToRefresh={() => (hasNextPage ? fetchNextPage() : null)}
            refresh={isFetchingNextPage || isLoading ? false : isFetching}
            onEndReached={onEndReached}
            ListFooterComponent={renderLoader}
            ListFooterComponentStyle={COMMON_STYLES.paginationLoaderStyle}
          />
        )}
      </View>
    </View>
  );
};

export {Categories};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  categoryText: {
    fontSize: calcFont(19),
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: -0.52,
    color: COLORS.SECTION_TITLE,
    marginVertical: calcFont(12),
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: calcFont(16),
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderColor: COLORS.CART_ITEM_BORDER,
  },
});
