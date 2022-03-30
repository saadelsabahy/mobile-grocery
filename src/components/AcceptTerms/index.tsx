import React from 'react';
import {FieldError} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {Checkbox, HelperText, Text, useTheme} from 'react-native-paper';
import {onChange} from 'react-native-reanimated';
import {COLORS, COMMON_STYLES} from '../../constants/style';
import {calcWidth} from '../../constants/style/sizes';

interface Props {
  error?: FieldError;
  value: boolean;
  onChange: (status: boolean) => void;
  placeholder: string;
}

const AcceptTerms = ({error, value = false, onChange, placeholder}: Props) => {
  const {
    colors: {primary},
  } = useTheme();
  return (
    <View
      style={{
        width: calcWidth(335),
      }}>
      <View style={styles.rowContainer}>
        <Checkbox.Android
          color={primary}
          status={value ? 'checked' : 'unchecked'}
          onPress={() => {
            onChange(value);
          }}
        />
        <Text>{placeholder}</Text>
      </View>
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

export {AcceptTerms};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: 'red',
  },
});
