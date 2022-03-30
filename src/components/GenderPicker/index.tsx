import React from 'react';
import {FieldError} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {I18nManager, StyleSheet, View} from 'react-native';
import ModalSelector from 'react-native-modal-selector-searchable';
import {HelperText, Text, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, COMMON_STYLES} from '../../constants/style';
import {calcFont, calcHeight, calcWidth} from '../../constants/style/sizes';
type PickerProps = React.ComponentProps<typeof ModalSelector>;

interface Props extends PickerProps {
  placeholder: string;
  value: object;
  //selectedName: string;
  error?: FieldError;
  header?: string;
}

const CustomPicker = ({
  placeholder,
  //selectedName = '',
  error,
  header,
  data = [],
  ...props
}: Props) => {
  console.log('selected', placeholder, props?.selectedKey);
  let selectedName =
    data?.find(item => item.key === props.selectedKey)?.label || '';
  //const [selectedItem, setselectedItem] = useState<string>('');
  const {t} = useTranslation();
  const {
    colors: {primary},
  } = useTheme();
  return (
    <View style={{}}>
      {!!header && <Text style={styles.header}>{header}</Text>}

      <ModalSelector
        searchText={t('homeScreen:searchPlaceHolder')}
        search={true}
        selectTextStyle={{color: primary}}
        searchTextStyle={styles.searchTextStyle}
        searchStyle={{}}
        initValueTextStyle={{color: 'red'}}
        closeOnChange
        listType="FLATLIST"
        touchableActiveOpacity={0.7}
        touchableStyle={styles.container}
        cancelText={t('general:cancel')}
        optionContainerStyle={{backgroundColor: COLORS.WHITE}}
        cancelStyle={{backgroundColor: COLORS.WHITE}}
        cancelTextStyle={styles.cancelText}
        optionTextStyle={{...styles.cancelText, color: COLORS.HEADER_TEXT}}
        data={data}
        overlayStyle={{paddingVertical: '10%'}}
        {...props}
        selectedKey={63}>
        <View style={styles.innerItems}>
          <Text
            style={{
              ...styles.cancelText,
              color: COLORS.HEADER_TEXT,
              opacity: selectedName ? 1 : 0.5,
            }}>
            {selectedName || placeholder}
          </Text>

          <View style={styles.iconAndSpacerContainer}>
            <View style={styles.spacer} />
            <Icon
              name="menu-down"
              size={calcFont(25)}
              style={{marginStart: calcFont(12.5)}}
            />
          </View>
        </View>
      </ModalSelector>
      {/* {!data.length && (
        <HelperText
          type="error"
          visible={true}
          style={[COMMON_STYLES.helperText]}>
          {'no data founded'}
        </HelperText>
      )} */}
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

export {CustomPicker};

const styles = StyleSheet.create({
  container: {
    width: calcWidth(335),
    height: calcHeight(54),
    borderRadius: calcFont(6),
    backgroundColor: COLORS.INPUT_COLOR,
    borderStyle: 'solid',
    borderWidth: calcFont(1),
    borderColor: COLORS.INPUT_BORDER_COLOR,
    paddingHorizontal: calcFont(20),
    marginBottom: calcFont(10),
    overflow: 'hidden',
    marginHorizontal: 0,
  },
  header: {
    fontSize: calcFont(12),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0.8,
    color: COLORS.HEADER_TEXT,
    textTransform: 'capitalize',
  },
  innerItems: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconAndSpacerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spacer: {
    width: 0.15,
    height: calcFont(27),
    backgroundColor: COLORS.BLACK,
    opacity: 0.5,
  },
  cancelText: {
    fontFamily: 'Cairo-Regular',
    fontSize: calcFont(16),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.28,
    color: COLORS.MOCK_BG_RED,
    textTransform: 'capitalize',
  },
  searchTextStyle: {
    opacity: 1,
    color: COLORS.SEARCH_TEXT,
    fontFamily: 'Cairo-Regular',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    fontSize: calcFont(16),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.28,
  },
});
