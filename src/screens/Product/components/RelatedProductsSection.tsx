import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Text, View} from 'react-native';
import {ProductCard} from '../../../components';
import {Product} from '../../../interfaces';
import {calcDiscount} from '../../../utils';
import {HorizontalList, Section} from '../../Home/components';

interface Props {
  data: Product[];
  onProductPressed: (item: any) => void;
}

const RelatedProductsSection = ({data, onProductPressed}: Props) => {
  const {t} = useTranslation();
  return (
    <Section
      titleContainer={{paddingVertical: 0}}
      title={t('productScreen:similarProducts')}>
      <HorizontalList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        data={data}
        keyExtractor={(item, index) => `${item.product_id}`}
        renderItem={({item, index}) => {
          return (
            <ProductCard
              onProductPressed={() => onProductPressed(item.product_id)}
              name={item.name}
              image={item.image || item.thumb}
              price={`${item.special ? item.special : item.price} `
                .replace(`${item.currency}`, '')
                .trim()}
              discountValue={calcDiscount(item.special, item.price)}
              id={item.product_id}
              quantity={item.quantity}
            />
          );
        }}
      />
    </Section>
  );
};

export {RelatedProductsSection};
