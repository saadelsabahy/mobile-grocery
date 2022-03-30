import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable, StyleSheet, TextInputProps, ViewStyle} from 'react-native';
import {Button, Searchbar} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {calcFont, calcHeight, calcWidth} from '../../constants/style/sizes';
//import {TextInputProps} from 'react-native-paper/lib/typescript/components/TextInput/TextInput';
//type SearchBarProps = React.ComponentProps<typeof >;
interface Props extends TextInputProps {
  containerStyle?: ViewStyle;
}

const SearchBar = ({containerStyle, ...props}: Props) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const onSearchPressed = () => {
    console.log('press');

    navigation.navigate('Search');
  };
  return (
    <Pressable
      style={[styles.container, containerStyle]}
      onPress={onSearchPressed}>
      <Searchbar
        onTouchStart={onSearchPressed}
        iconColor={props.editable ? COLORS.HEADER_TEXT : COLORS.SEARCH_TEXT}
        editable={false}
        placeholderTextColor={COLORS.SEARCH_TEXT}
        placeholder={t('homeScreen:searchPlaceHolder')}
        style={styles.text}
        clearIcon={() =>
          props.value ? (
            <Button style={styles.clearButton} labelStyle={styles.clearLabel}>
              {t('general:cancel')}
            </Button>
          ) : null
        }
        {...props}
      />
      {/*  <Icon
        name="magnify"
        size={calcFont(17)}
        color={props.editable ? COLORS.HEADER_TEXT : COLORS.SEARCH_TEXT}
        style={{transform: [{rotate: I18nManager.isRTL ? '90deg' : '0deg'}]}}
      />
      <TextInput
        editable={false}
        style={[styles.text]}
        placeholder={t('homeScreen:searchPlaceHolder')}
        underlineColor={'transparent'}
        placeholderTextColor={COLORS.SEARCH_TEXT}
        {...props}
      />
      {props.editable && (
        <CustomButton
          style={{}}
          labelStyle={{
            color: COLORS.HEADER_TEXT,
            marginHorizontal: 0,
            textTransform: 'capitalize',
          }}>
          cancel
        </CustomButton>
      )} */}
    </Pressable>
  );
};

export {SearchBar};

const styles = StyleSheet.create({
  container: {
    width: calcWidth(343),
    height: calcHeight(44),
    borderRadius: calcFont(10),
    backgroundColor: COLORS.SEARCH_BG,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: calcFont(6),
    marginBottom: calcFont(25),
    alignSelf: 'center',
    overflow: 'hidden',
    marginTop: calcFont(7),
  },
  text: {
    flex: 1,
    backgroundColor: 'transparent',
    letterSpacing: -0.41,
    color: COLORS.HEADER_TEXT,
    elevation: 0,
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  clearButton: {
    width: 'auto',
    minHeight: calcHeight(70),
    borderRadius: 0,
    justifyContent: 'center',
    //backgroundColor: 'red',
  },
  clearLabel: {
    color: COLORS.HEADER_TEXT,
    marginHorizontal: 0,
    textTransform: 'capitalize',
    fontSize: calcFont(10),
    padding: 5,
    textAlign: 'center',
  },
});
