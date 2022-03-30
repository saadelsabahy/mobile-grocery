import React from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  FlatList,
  Platform,
  I18nManager,
  TextStyle,
} from 'react-native';
import {Text} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {calcFont, calcHeight, SCREEN_WIDTH} from '../../constants/style/sizes';

interface Props {
  subCategories: {name: string; category_id: string}[];
  categoryNameStyle?: TextStyle;
  onItemPressed: (id: string, name: string) => void;
}

const HorizontalCategoriesName = ({
  subCategories,
  categoryNameStyle,
  onItemPressed,
}: Props) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={subCategories}
        contentContainerStyle={{justifyContent: 'space-between'}}
        keyExtractor={(item, index) => `${item.category_id}`}
        horizontal
        legacyImplementation={false}
        removeClippedSubviews={Platform.OS === 'android'}
        style={{
          flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <Pressable
              style={[styles.categoryContainer]}
              onPress={() => onItemPressed(item.category_id, item.name)}>
              <Text
                children={item.name}
                style={[styles.categoryName, categoryNameStyle]}
              />
            </Pressable>
          );
        }}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
      />
    </View>
  );
};

export {HorizontalCategoriesName};

const styles = StyleSheet.create({
  container: {
    height: calcHeight(50),
    backgroundColor: COLORS.WHITE,
    width: SCREEN_WIDTH,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.CART_ITEM_BORDER,
  },
  categoryContainer: {
    marginHorizontal: calcFont(29),
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    textTransform: 'uppercase',
    fontSize: calcFont(20),
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0.12,
    color: COLORS.HEADER_TEXT,
  },
});
