import React from 'react';
import {FieldError} from 'react-hook-form';
import {
  I18nManager,
  StyleSheet,
  TextInput as NativeTextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {HelperText, Text, TextInput} from 'react-native-paper';
import {TextInputProps} from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
import {COLORS, COMMON_STYLES} from '../../constants/style';
import {
  calcFont,
  calcHeight,
  calcWidth,
  SCREEN_WIDTH,
} from '../../constants/style/sizes';

interface Props extends Partial<TextInputProps> {
  fieldName?: string;
  error?: FieldError;
  reference?: any;
  inputStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  withBorder?: boolean;
  fieldNameStyle?: TextStyle;
}

const CustomInput = ({
  fieldName,
  error,
  reference,
  inputStyle,
  containerStyle,
  withBorder,
  fieldNameStyle,
  ...props
}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {fieldName && (
        <Text style={[styles.fieldName, fieldNameStyle]}>{fieldName}</Text>
      )}
      <TextInput
        textContentType={'oneTimeCode'}
        mode={withBorder ? 'outlined' : 'flat'}
        style={[
          styles.input,
          {color: !props.value ? COLORS.PLACEHOLDER : COLORS.HEADER_TEXT},
          {
            borderRadius: withBorder ? calcFont(6) : 0,
            backgroundColor: withBorder ? COLORS.INPUT_COLOR : 'transparent',
          },
          inputStyle,
        ]}
        ref={reference}
        placeholderTextColor={COLORS.PLACEHOLDER}
        placeholder={props.placeholder && `${props.placeholder}`}
        autoCapitalize={'none'}
        autoCorrect={false}
        theme={{
          colors: {placeholder: COLORS.CART_ITEM_BORDER},
        }}
        underlineColorAndroid="transparent"
        render={innerProps => (
          <NativeTextInput
            {...innerProps}
            style={[innerProps.style, {paddingTop: 8, paddingBottom: 8}]}
          />
        )}
        {...props}
      />

      {error && error.message && (
        <HelperText
          type="error"
          visible={true}
          style={[COMMON_STYLES.helperText]}>
          {error.message}
        </HelperText>
      )}
    </View>
  );
};

export {CustomInput};

const styles = StyleSheet.create({
  container: {
    //marginVertical: 10,
  },
  fieldName: {
    fontSize: calcFont(12),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0.8,
    color: COLORS.PLACEHOLDER,
    textTransform: 'capitalize',
  },
  input: {
    width: calcWidth(335),
    height: calcHeight(54),
    borderRadius: 0,
    backgroundColor: COLORS.WHITE,
    borderStyle: 'solid',
    borderWidth: calcFont(0),
    borderColor: 'transparent',
    paddingHorizontal: calcFont(5),
    fontFamily: 'Cairo-Regular',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    fontSize: calcFont(16),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.28,
    elevation: 0,
    shadowOffset: {width: 0, height: 0},
    marginBottom: calcFont(8),
  },
  multiLineInput: {
    paddingTop: calcFont(8),
    paddingBottom: calcFont(0),
    height: calcHeight(100),
  },
});
