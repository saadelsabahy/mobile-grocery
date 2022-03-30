import React, {useEffect, useState} from 'react';
import {FieldError} from 'react-hook-form';
import {
  I18nManager,
  Keyboard,
  Pressable,
  StyleSheet,
  TextInputProps,
  View,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {HelperText, Text, useTheme} from 'react-native-paper';
import reactotron from 'reactotron-react-native';
import {COLORS, COMMON_STYLES} from '../../constants/style';
import {calcFont, calcHeight, calcWidth} from '../../constants/style/sizes';
interface Props extends TextInputProps {
  error?: FieldError;
  onFulfillCode: () => void;
}
const CELL_COUNT = 4;
const ConfirmationInput = ({error, onFulfillCode, ...otherprops}: Props) => {
  const {
    colors: {primary},
  } = useTheme();
  const ref = useBlurOnFulfill({
    value: otherprops.value,
    cellCount: CELL_COUNT,
  });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({});
  useEffect(() => {
    if (otherprops?.value?.length === CELL_COUNT) {
      onFulfillCode();
    }
  }, [otherprops.value]);
  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', () => Keyboard.dismiss());
    return () => {};
  }, [Keyboard]);
  return (
    <View style={styles.root}>
      <CodeField
        ref={ref}
        {...props}
        {...otherprops}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        //autoFocus
        renderCell={({index, symbol, isFocused}) => (
          <View
            // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
            // onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[
              styles.cellRoot,
              isFocused && styles.focusCell,
              {borderBottomColor: primary},
            ]}>
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
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
const styles = StyleSheet.create({
  root: {padding: calcFont(20), minHeight: calcHeight(70)},

  codeFieldRoot: {
    width: calcWidth(280),
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
  },
  cellRoot: {
    width: calcWidth(50),
    height: calcHeight(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: COLORS.HEADER_TEXT,
    borderBottomWidth: 0.5,
    backgroundColor: COLORS.WHITE,
    elevation: 1,
  },
  cellText: {
    fontSize: calcFont(16),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: calcFont(-0.28),
    color: '#010f07',
    textAlign: 'center',
  },
  focusCell: {
    //borderBottomColor: COLORS.MAINCOLOR,
    borderBottomWidth: 1,
  },
});

export {ConfirmationInput};
