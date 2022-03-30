import {useScrollToTop} from '@react-navigation/native';
import React, {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useQuery} from 'react-query';
import {
  CategoryNameAndAvatar,
  CustomHeader,
  CustomSwiper,
  Loader,
  SearchBar,
} from '../../components';
import {ProductCard} from '../../components/ProductCard';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {COLORS} from '../../constants/style';
import {calcFont, SWIPER_HEIGHT} from '../../constants/style/sizes';
import useAxios from '../../hooks/useAxios';
import {Product} from '../../interfaces';
import {calcDiscount} from '../../utils';
import {HorizontalList, Section} from './components';
interface Props {
  navigation: any;
}

const Home: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const {
    colors: {primary},
  } = useTheme();
  const scrollRef = useRef(null);
  useScrollToTop(scrollRef);
  const Axios = useAxios();

  const getHome = async () => {
    const {data} = await Axios.post(endpoints.home);
    return data;
  };
  const {isLoading, refetch, data, isFetching} = useQuery(
    'homeRequest',
    getHome,
  );

  const onHomeItemPressed = async (item: any) => {
    console.log({item});

    if (item.product_id) {
      navigation.navigate('ProductStack', {
        screen: 'Product',
        params: {id: item.product_id},
      });
    } else if (item.category_id) {
      navigation.navigate('CategoryDetailes', {
        id: item.category_id,
        name: item.name,
      });
    } else {
      if (item.imagelinkType && item.imagelinkId) {
        try {
          if (item.imagelinkType === 'category') {
            const {
              data: {
                CategoryInfo: {Name},
              },
            } = await Axios.post(endpoints.categoryInfo, {
              category_id: item.imagelinkId,
            });
            navigation.navigate('CategoryDetailes', {
              id: item.imagelinkId,
              name: Name,
            });
          } else {
            navigation.navigate('ProductStack', {
              screen: 'Product',
              params: {id: item.imagelinkId},
            });
          }
        } catch (error) {
          console.log('get CategoryInfo error', error);
        }
      }
    }
  };

  const renderHomeContent = () => {
    try {
      return (
        <>
          {data?.Sections?.map((section: any, index: number) => {
            switch (section.SectionCodeName) {
              case 'slider':
                return (
                  <Section
                    key={section.SectionCodeName + index}
                    container={{marginTop: calcFont(15)}}>
                    <CustomSwiper
                      images={
                        section.Collections?.length && section.Collections
                      }
                      showButtons={false}
                      showsPagination={true}
                      onImagePressed={onHomeItemPressed}
                    />
                  </Section>
                );

              case 'twoimagebanner':
                return (
                  <Section
                    title={section?.title}
                    key={section.SectionCodeName + index}>
                    <CustomSwiper
                      showButtons={false}
                      showsPagination={false}
                      images={[
                        {
                          slideimage: section?.firstbannerimage,
                          imagelinkId: section?.firstimagelinkId,
                          imagelinkType: section?.firstimagelinkType,
                        },
                        {
                          slideimage: section?.secondbannerimage,
                          imagelinkId: section?.secondimagelinkId,
                          imagelinkType: section?.secondimagelinkType,
                        },
                      ]}
                      onImagePressed={image => {
                        onHomeItemPressed({...image});
                      }}
                    />
                  </Section>
                );
              case 'featuredcategories':
                return section?.categories?.length ? (
                  <Section
                    key={section.SectionCodeName + index}
                    showViewAll
                    title={section.title}>
                    <HorizontalList
                      data={section?.categories}
                      keyExtractor={item => `${item.category_id}`}
                      renderItem={({item, item: {thumb, name}}) => {
                        return (
                          <CategoryNameAndAvatar
                            name={name}
                            avatar={thumb}
                            onItemPressed={() => onHomeItemPressed(item)}
                          />
                        );
                      }}
                    />
                  </Section>
                ) : null;
              case 'featuredproducts':
                return section?.products?.length ? (
                  <Section
                    key={section.SectionCodeName + index}
                    title={section.title}>
                    <HorizontalList
                      data={section?.products}
                      keyExtractor={item => `${item.product_id}`}
                      renderItem={({item}: {item: Product}) => {
                        return (
                          <ProductCard
                            image={item.image || item.thumb}
                            price={`${
                              item.special ? item.special : item.price
                            } ${item.currency}`}
                            discountValue={calcDiscount(
                              item.special,
                              item.price,
                            )}
                            name={item.name}
                            onProductPressed={() => onHomeItemPressed(item)}
                            id={item.product_id}
                            quantity={item.quantity}
                          />
                        );
                      }}
                    />
                  </Section>
                ) : null;
              case 'hotdeals':
                return section?.products?.length ? (
                  <Section
                    key={section.SectionCodeName + index}
                    title={section.title}>
                    <HorizontalList
                      data={section?.products}
                      keyExtractor={item => `${item.product_id}`}
                      renderItem={({item}: {item: Product}) => {
                        return (
                          <ProductCard
                            image={item.thumb}
                            price={`${
                              item.special ? item.special : item.price
                            } ${item.currency}`}
                            name={item.name}
                            onProductPressed={() => onHomeItemPressed(item)}
                            id={item.product_id}
                            quantity={item.quantity}
                            discountValue={calcDiscount(
                              item.special,
                              item.price,
                            )}
                            /*   name={item.name}
                              images={[{slideimage: item.thumb}]}
                              rating={item?.rating}
                              */
                          />
                        );
                      }}
                    />
                  </Section>
                ) : null;
              case 'specialcategories':
                return section?.categories?.length ? (
                  <Section
                    key={section.SectionCodeName + index}
                    showViewAll
                    //container={{backgroundColor: primary}}
                    title={section.title}>
                    <HorizontalList
                      data={section?.categories}
                      keyExtractor={item => `${item.category_id}`}
                      renderItem={({item, item: {icon, name}}) => {
                        return (
                          <CategoryNameAndAvatar
                            name={name}
                            avatar={icon}
                            onItemPressed={() => onHomeItemPressed(item)}
                            circullar
                          />
                        );
                      }}
                    />
                  </Section>
                ) : null;
              case 'oneimagebanner':
                return (
                  <Section
                    key={section.SectionCodeName + index}
                    //container={{marginTop: calcFont(15)}}
                    title={section?.title}>
                    <CustomSwiper
                      showButtons={false}
                      showsPagination={false}
                      images={[
                        {
                          slideimage: section?.bannerimage,
                          imagelinkId: section?.imagelinkId,
                          imagelinkType: section?.imagelinkType,
                        },
                      ]}
                      onImagePressed={image => {
                        onHomeItemPressed({...image});
                      }}
                    />
                  </Section>
                );
            }
          })}
        </>
      );
    } catch (error) {
      console.log('error in rendering home sections', error);
    }
  };

  const onPullToRefresh = async () => {
    refetch();
  };
  return (
    <View style={styles.container}>
      <CustomHeader hideBack hideEndAction title={t('tabs:home')} />

      {isLoading && !data ? (
        <Loader />
      ) : (
        <ScrollView
          style={styles.scrollView}
          ref={scrollRef}
          contentContainerStyle={styles.ScrollViewContentContainer}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={onPullToRefresh}
              tintColor={primary}
              titleColor={primary}
              colors={[primary, primary]}
            />
          }>
          <SearchBar />

          {data?.Sections && <>{renderHomeContent()}</>}
        </ScrollView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  scrollView: {flex: 1},
  swipperWithBtnsContainer: {
    height: SWIPER_HEIGHT,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  ScrollViewContentContainer: {
    flexGrow: 1,
    width: '100%',
    alignSelf: 'center',
  },
});

export {Home};
