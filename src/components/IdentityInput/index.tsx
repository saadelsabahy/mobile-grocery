import React, {useContext} from 'react';
import {FieldError} from 'react-hook-form';
import {StyleSheet, TextInputProps, TextStyle} from 'react-native';
import {calcFont} from '../../constants/style/sizes';
import {AuthenticationContext} from '../../contexts';
import {Country} from '../CustomCountryPicker/types';
import {CustomInput} from '../CustomInput';
import {CustomPhoneInput} from '../PhoneInput';

interface Props extends TextInputProps {
  error?: FieldError;
  onSelect?: (country: Country) => void;
  country?: Country;
  usePhone: boolean;
  fieldName?: string;
  fieldNameStyle?: TextStyle;
  phoneInputRef?: any;
  withBorder?: boolean;
}

const IdentityInput = ({
  error,
  usePhone,

  fieldName,
  phoneInputRef,
  withBorder,
  ...props
}: Props) => {
  const {
    state: {locationInfo},
  } = useContext(AuthenticationContext);

  return usePhone ? (
    <CustomPhoneInput
      error={error}
      defaultCode={locationInfo?.country_code}
      phoneInputRef={phoneInputRef}
      fieldName={fieldName}
      withBorder={withBorder}
      {...props}
    />
  ) : (
    <CustomInput
      fieldName={fieldName}
      returnKeyType={'next'}
      error={error}
      inputStyle={styles.input}
      {...props}
    />
  );
};

export {IdentityInput};

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 5,
    borderWidth: 0,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    paddingBottom: 0,
    marginBottom: calcFont(22),
  },
});
{
  /* <CustomCountryPicker
      error={error}
      onSelect={onSelect}
      country={country}
      {...props}
    /> */
}
