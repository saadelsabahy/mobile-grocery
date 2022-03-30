import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Chip, Text, useTheme} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {calcFont, calcHeight, calcWidth} from '../../constants/style/sizes';
import {FilterContext} from '../../contexts';

interface FilterOptionItem {
  name: string;
  id: number;
}
interface Props {
  data?: {
    filterOptions: FilterOptionItem[];
    categoryId: string;
    categoryName: string;
  };
  children?: React.ReactNode;
  withoutClear?: boolean;
}

const FilterSection = ({data, children, withoutClear}: Props) => {
  const {
    colors: {text, primary},
  } = useTheme();
  const {onItemPressed, selectedFilters, resetFilterSection} = useContext(
    FilterContext,
  );
  const onChipPressed = (item: FilterOptionItem, categoryId: string) => {
    onItemPressed(String(item.id), categoryId);
  };

  const onClearAllPressed = (id: string) => {
    resetFilterSection(id);
  };
  console.log({selectedFilters});

  return (
    <View style={styles.container}>
      <View style={styles.filterSectionHeader}>
        <Text style={styles.sectionName}>{data?.categoryName}</Text>
        {!withoutClear && (
          <Button
            labelStyle={[
              //styles.clearButton,
              {
                color: text,
              },
            ]}
            onPress={() => onClearAllPressed(data?.categoryId!)}>
            clear All
          </Button>
        )}
      </View>
      {data?.filterOptions?.length ? (
        <View style={styles.optionsContainer}>
          {data.filterOptions.map(item => {
            const selected =
              selectedFilters[data.categoryId] === String(item.id);
            return (
              <Chip
                //selected
                onPress={() => onChipPressed(item, data.categoryId)}
                key={`${item.id}`}
                style={[
                  styles.chip,
                  {backgroundColor: selected ? primary : COLORS.FILTER_CHIP_BG},
                ]}
                textStyle={[
                  styles.optionText,
                  {
                    color: selected ? COLORS.WHITE : text,
                    opacity: selected ? 1 : 0.54,
                  },
                ]}>
                {item.name}
              </Chip>
            );
          })}
        </View>
      ) : (
        children
      )}
    </View>
  );
};

export {FilterSection};

const styles = StyleSheet.create({
  container: {
    width: calcWidth(335),
    marginBottom: calcFont(10),
  },
  filterSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: calcFont(10),
  },
  sectionName: {
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0.6,
    textAlign: 'left',
    color: '#010f07',
    textTransform: 'uppercase',
  },
  clearButton: {
    marginHorizontal: 0,
    marginVertical: 0,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  chip: {
    minWidth: calcWidth(80),
    height: calcHeight(38),
    borderRadius: calcFont(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: calcFont(12),
  },
  optionText: {
    fontSize: calcFont(12),
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 1.03,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});
