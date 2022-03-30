import * as React from 'react';
import {useContext} from 'react';
import {
  I18nManager,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {COLORS, Spaces} from '../../../constants/style';
import {SCREEN_WIDTH} from '../../../constants/style/sizes';
import {ProductContext} from '../../../contexts';
import {OptionValue, ProductOption} from '../../../interfaces';

const OptionLabel: React.FC = ({children}) => (
  <Text style={styles.optionLabel}>{children}</Text>
);

const OptionValueCard: React.FC<{
  onPress: (value: any) => void;
  value: any;
  selected: boolean;
}> = ({onPress, value, selected}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      //disabled={selected}
      style={{
        paddingHorizontal: Spaces.small,
        paddingVertical: Spaces.tiny,
        borderWidth: selected ? 0 : 1,
        borderRadius: 4,
        // borderColor: COLORS.black,
        marginRight: Spaces.tiny,
        marginBottom: Spaces.tiny,
        backgroundColor: selected ? theme.colors.primary : 'transparent',
        margin: Spaces.small,
      }}>
      <Text
        style={{
          color: selected ? COLORS.WHITE : 'black',
        }}>
        {value.name}
      </Text>
    </TouchableOpacity>
  );
};

interface Props {
  data: ProductOption[];
}
const Options = ({data}: Props) => {
  const {selectedOptions, onItemPressed} = useContext(ProductContext);

  const OptionCard: React.FC<{
    option?: ProductOption;
  }> = ({option}) => {
    // console.log('option', option);

    return (
      <View>
        <OptionLabel>
          {option?.name} {Boolean(parseInt(option?.required || '0', 10))}
        </OptionLabel>
        <View
          style={[
            styles.row,
            {
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
            },
          ]}>
          {!!option?.option_value.length &&
            option?.option_value.map((value, index) => {
              let optionValueSelected = selectedOptions[
                `${option.product_option_id}`
              ]?.includes(value.product_option_value_id);

              return (
                <OptionValueCard
                  value={value}
                  selected={optionValueSelected}
                  onPress={() => onPressOptionValue(value, option)}
                  key={`${value}${index}`}
                />
              );
            })}
        </View>
      </View>
    );
  };
  const onPressOptionValue = (value: OptionValue, item: ProductOption) => {
    onItemPressed({
      item: value.product_option_value_id,
      title: item.product_option_id,
      type: item.type,
      prefix: value.price_prefix,
      price: value.float_price,
    });
  };

  return (
    <View>
      {data?.map(option => {
        return (
          <OptionCard
            key={option.option_id}
            option={option}
            //onPressOptionValue={id => onPressOptionValue(option)}
          />
        );
      })}
    </View>
  );
};

export {Options};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentContainer: {
    borderTopRightRadius: Spaces.medium,
    borderTopLeftRadius: Spaces.medium,
    bottom: 0,
    backgroundColor: COLORS.WHITE,
    paddingTop: Spaces.medium,
    width: SCREEN_WIDTH,
  },
  imageContainer: {
    paddingHorizontal: Spaces.medium,
    paddingBottom: Spaces.medium,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BLACK,
    backgroundColor: COLORS.WHITE,
  },
  image: {
    width: 150,
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 4,
  },
  priceContainer: {
    paddingHorizontal: Spaces.medium,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  price: {
    color: 'red',
    fontFamily: 'Cairo-Bold',
    fontSize: 20,
  },
  optionsScrollContent: {
    paddingTop: Spaces.medium,
    paddingHorizontal: Spaces.medium,
  },
  quantityView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: COLORS.BLACK,
    borderWidth: 1,
    alignSelf: 'flex-start',
    width: 150,
  },
  quantityText: {fontSize: 21},
  quantityTextContainer: {
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: COLORS.WHITE,
  },
  submitButtonContainer: {
    paddingTop: Spaces.medium,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spaces.medium,
    marginBottom: Platform.select({
      ios: Spaces.small,
      android: Spaces.medium,
    }),
  },
  button: {
    elevation: 0,
    width: '100%',
    // paddingVertical: Spaces.small,
    // borderRadius: 4,
  },
  buttonText: {
    textTransform: 'uppercase',
    color: COLORS.WHITE,
    fontSize: 17,
    fontFamily: 'Cairo-Bold',
    fontWeight: 'bold',
  },
  closeButtonContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    paddingHorizontal: Spaces.medium,
    paddingTop: Spaces.medium,
  },
  optionLabel: Platform.select({
    default: {fontSize: 21, fontFamily: 'Cairo-SemiBold'},
    ios: {
      fontSize: 21,
      fontFamily: 'Cairo-SemiBold',
      writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
    },
  }),
});
