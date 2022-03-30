import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Checkbox, RadioButton, Text, useTheme} from 'react-native-paper';
import reactotron from 'reactotron-react-native';
import {COLORS} from '../../../constants/style';
import {calcFont} from '../../../constants/style/sizes';
import {ProductContext} from '../../../contexts';
import {ProductOption} from '../../../interfaces';
interface Props {
  data: ProductOption[];
}

const ProductOptions = ({data}: Props) => {
  const {
    colors: {primary, placeholder},
  } = useTheme();
  const {selectedOptions, onItemPressed} = useContext(ProductContext);
  // reactotron.log({selectedOptions});
  interface RenderItemProps {
    item: ProductOption;
    index?: number;
  }
  const renderOption = (item: ProductOption) => {
    const Element =
      item.type === 'radio' ? RadioButton.Android : Checkbox.Android;
    return item.option_value.map(
      ({name, option_value_id, price_prefix, currency, float_price}, index) => {
        return (
          <View
            key={option_value_id}
            style={[
              styles.row,
              {
                borderBottomWidth:
                  index === item.option_value.length - 1 ? 0 : 1,
                borderRadius: 10,
                borderColor: COLORS.CART_ITEM_BORDER,
              },
            ]}>
            <Text>{name}</Text>
            <View style={styles.optionRadioAndPrefixContainer}>
              <Text>{`(${price_prefix} ${currency} ${float_price})`}</Text>
              <Element
                value={option_value_id}
                color={primary}
                uncheckedColor={placeholder}
                status={
                  selectedOptions[`${item.option_id}`]?.includes(
                    option_value_id,
                  )
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={
                  item.type === 'radio'
                    ? () => null
                    : () =>
                        onItemPressed(
                          option_value_id,
                          item.option_id,
                          item.type,
                        )
                }
              />
            </View>
          </View>
        );
      },
    );
  };
  const renderOptionItem = ({item}: RenderItemProps) => {
    console.log(item.type);

    return (
      <View
        style={styles.optionSection}
        key={item.product_option_id + item.name}>
        <Text style={styles.sectionName}>{item.name}</Text>
        {item.type === 'radio' && (
          <RadioButton.Group
            onValueChange={newValue =>
              onItemPressed(newValue, item.option_id, item.type)
            }>
            {renderOption(item)}
          </RadioButton.Group>
        )}
        {item.type === 'checkbox' && renderOption(item)}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {data.map((item, index) => renderOptionItem({item, index}))}
    </View>
  );
};

export {ProductOptions};

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separator: {
    width: 335,
    height: 1,
    backgroundColor: '#000',
    //  borderRadius: 4,
    //  backgroundColor: '#fbfbfb',
    //  borderStyle: 'solid',
    //  borderWidth: 1,
    //  borderColor: 'rgba(151, 151, 151, 0.13)',
  },
  optionSection: {
    paddingHorizontal: calcFont(20),
    paddingVertical: calcFont(5),
    backgroundColor: COLORS.WHITE,
    marginVertical: calcFont(9),
  },
  sectionName: {
    marginBottom: calcFont(15),
  },
  optionRadioAndPrefixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.63,
  },
});
