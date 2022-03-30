import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  CustomButton,
  CustomHeader,
  CustomSlider,
  FilterSection,
} from '../../components';
import {COLORS} from '../../constants/style';

const MOCK_DATA = {
  categoryName: 'dummy category',
  categoryId: '1284',
  filterOptions: [
    {name: 'all', id: 1},
    {name: 'Brunch', id: 2},
    {name: 'Salads', id: 3},
    {name: 'pizza', id: 4},
    {name: 'Dinner', id: 5},
    {name: 'Breakfast', id: 6},
    {name: 'Soups', id: 7},
    {name: 'Salads', id: 8},
    {name: 'Brand1', id: 9},
  ],
};

const FilterScreen = () => {
  const {t} = useTranslation();
  const {bottom} = useSafeAreaInsets();
  return (
    <View style={[styles.container, {paddingBottom: bottom}]}>
      <CustomHeader title={t('categoriesDetailesScreen:filter')} />
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <FilterSection data={MOCK_DATA} />
        <FilterSection data={{...MOCK_DATA, categoryId: '1234'}} />
        <FilterSection withoutClear>
          <CustomSlider />
        </FilterSection>
        <FilterSection withoutClear>
          <CustomSlider />
        </FilterSection>
      </ScrollView>
      <CustomButton
        mode="contained"
        children={t('categoriesDetailesScreen:filter')}
        style={{alignSelf: 'center'}}
      />
    </View>
  );
};

export {FilterScreen};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});
