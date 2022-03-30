import React from 'react';
import {FieldError} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Platform, Pressable, View, ViewStyle} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {HelperText} from 'react-native-paper';
import {COMMON_STYLES} from '../../constants/style';
import {CustomInput} from '../CustomInput';

type DateTimePickerProps = React.ComponentProps<typeof DateTimePickerModal>;
interface Props extends DateTimePickerProps {
  onPress: () => void;
  placeholder: string;
  value: string;
  containerStyle?: ViewStyle;
  error?: FieldError;
}

const CustomDatePicker = ({
  containerStyle,
  onPress,
  placeholder,
  value,
  error,
  ...props
}: Props) => {
  const {t} = useTranslation();

  return (
    <View style={[containerStyle]}>
      <Pressable onPress={onPress}>
        <CustomInput
          editable={false}
          placeholder={placeholder}
          value={value || ''}
          onTouchEnd={onPress}
          withBorder
        />
      </Pressable>
      {error && error.message && (
        <HelperText
          type="error"
          visible={true}
          style={[COMMON_STYLES.helperText]}>
          {error.message}
        </HelperText>
      )}
      <DateTimePickerModal
        mode="date"
        display={Platform.OS === 'ios' ? 'inline' : 'calendar'}
        maximumDate={new Date()}
        confirmTextIOS={t('general:confirm')}
        cancelTextIOS={t('general:cancel')}
        {...props}
      />
    </View>
  );
};

export {CustomDatePicker};
