import React, {useEffect, useRef, useState} from 'react';
import {FieldError} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  I18nManager,
  StyleSheet,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';
import {HelperText, Text} from 'react-native-paper';
import PhoneInput from 'react-native-phone-number-input';
import {SafeAreaView} from 'react-native-safe-area-context';
import reactotron from 'reactotron-react-native';
import {COLORS, COMMON_STYLES} from '../../constants/style';
import {calcFont, calcHeight} from '../../constants/style/sizes';
import {CountryCode} from '../CustomCountryPicker/types';
type PhoneInputProps = React.ComponentProps<typeof PhoneInput>;

interface Props extends TextInputProps {
  error?: FieldError;
  defaultCode: CountryCode;
  phoneInputRef: any;
  fieldName?: string;
  withBorder?: boolean;
  fieldNameStyle?: TextStyle;
}

const CustomPhoneInput = ({
  error,
  defaultCode,
  phoneInputRef,
  fieldName,
  withBorder,
  fieldNameStyle,
  ...props
}: Props) => {
  const {t} = useTranslation();
  const [valid, setValid] = useState(false);
  //const phoneInput = useRef<PhoneInput>(null);
  useEffect(() => {
    checkValid();
    return () => {};
  }, [props.value, defaultCode]);

  const checkValid = () => {
    const checkValid = phoneInputRef.current?.isValidNumber(props.value!);
    setValid(checkValid ? checkValid : false);
  };
  /*   const PHONE_NUMBER = I18nManager.isRTL
    ? phoneInputRef.current
        ?.getNumberAfterPossiblyEliminatingZero()
        ?.number?.split('')
        .reverse()
        .join('')
    : phoneInputRef.current?.getNumberAfterPossiblyEliminatingZero(); */

  return (
    <View style={styles.wrapper}>
      {!!fieldName && (
        <Text style={[styles.fieldName, fieldNameStyle]}>{fieldName}</Text>
      )}
      <PhoneInput
        defaultCode={defaultCode}
        textContainerStyle={{backgroundColor: 'transparent'}}
        ref={phoneInputRef}
        defaultValue={props.value}
        //value={ }
        layout="first"
        /*  onChangeText={(text) => {
          props.onChangeFormattedText(text);
        }} */
        onChangeFormattedText={props.onChangeText}
        countryPickerProps={{
          theme: {
            fontFamily: 'Cairo-Regular',
            fontSize: calcFont(14),
            containerButtonStyle: {
              //backgroundColor: 'red',
              width: '100%',
              margin: 0,
            },
          },
        }}
        filterProps={{
          placeholder: t('auth:selectYourCountry'),
          style: [styles.input],
        }}
        textInputProps={{placeholderTextColor: COLORS.PLACEHOLDER}}
        placeholder={t('inputs:telephone')}
        textInputStyle={styles.input}
        flagButtonStyle={{backgroundColor: 'transparent', marginEnd: 0}}
        containerStyle={[
          styles.container,
          {
            borderWidth: withBorder ? 1 : 0,
            borderRadius: withBorder ? calcFont(6) : 0,
            backgroundColor: withBorder ? COLORS.INPUT_COLOR : COLORS.WHITE,
          },
        ]}
        codeTextStyle={styles.code}
      />
      {((!valid && !!props.value) || error?.message) && (
        <HelperText
          type="error"
          visible={true}
          style={[COMMON_STYLES.helperText]}>
          {error?.message ? error.message : t('validation:wrongPhone')}
        </HelperText>
      )}
    </View>
  );
};

export {CustomPhoneInput};

const styles = StyleSheet.create({
  wrapper: {width: '100%'},
  message: {},
  button: {},
  container: {
    width: '100%',
    margin: 0,
    //backgroundColor: 'blue',
    height: calcHeight(54),
    borderBottomWidth: 1,
    borderColor: COLORS.CART_ITEM_BORDER,
  },
  input: {
    flex: 1,
    height: calcHeight(54),
    fontFamily: 'Cairo-Regular',
    fontSize: calcFont(14),
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    color: COLORS.HEADER_TEXT,
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
    padding: 0,
    margin: 0,
    borderWidth: 0,
    paddingBottom: 0,
  },
  fieldName: {
    fontSize: calcFont(12),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0.8,
    color: COLORS.PLACEHOLDER,
    textTransform: 'uppercase',
  },
  code: {
    width: 0,
    margin: 0,
    //backgroundColor: 'red',
    fontFamily: 'Cairo-Regular',
    fontSize: calcFont(16),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.28,
    color: COLORS.HEADER_TEXT,
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
    /*  transform: I18nManager.isRTL
      ? [{perspective: 500}, {rotateY: '180deg'}]
      : [{rotateY: '0deg'}], */
  },
});
