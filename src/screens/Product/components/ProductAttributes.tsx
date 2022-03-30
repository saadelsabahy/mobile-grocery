import {ProductAttribute} from '@interfaces';
import * as React from 'react';
import {FlatList, I18nManager, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

const ProductAttributes: React.FC<{attributes?: ProductAttribute[]}> = ({
  attributes,
}) => {
  const renderTableItem = ({item}: {item: ProductAttribute}) => {
    if (item.product_attribute_description.length < 1) {
      return;
    }
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
        <View style={styles.itemDivider} />
        <View style={styles.itemContent}>
          <Text style={[styles.itemText, styles.itemValue]}>
            {I18nManager.isRTL
              ? item.product_attribute_description[2].text
              : item.product_attribute_description[1].text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      data={attributes}
      renderItem={renderTableItem}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderColor: '#000',
    borderWidth: StyleSheet.hairlineWidth,
  },
  itemHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 4,
  },
  itemText: {
    paddingHorizontal: 5,
  },
  itemDivider: {
    height: '100%',
    borderWidth: StyleSheet.hairlineWidth,
  },
  itemContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 6,
  },
  itemValue: {color: '#0f0f0f'},
});
export {ProductAttributes};
