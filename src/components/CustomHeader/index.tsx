import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {I18nManager, StyleSheet, View} from 'react-native';
import {Appbar, Button, List, Text, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../constants/style';
import {calcFont, calcWidth, SCREEN_WIDTH} from '../../constants/style/sizes';
import {BackIcon} from '../../svgs';
import {CustomButton} from '../CustomButton';
interface Props {
  hideBack?: boolean;
  liked?: boolean;
  hideTitle?: boolean;
  withBorder?: boolean;
  hideEndAction?: boolean;
  endActionType?: 'text' | 'icon';
  endActionTitle?: string;
  title?: string;
  handleWhishlist?: () => void;
  onEndActionPressed?: () => void;
}

const CustomHeader = ({
  hideBack,
  hideTitle,
  hideEndAction,
  endActionType,
  endActionTitle,
  title,
  withBorder,
  liked,
  handleWhishlist,
  onEndActionPressed,
}: Props) => {
  const navigation = useNavigation();

  const {
    colors: {primary, text},
  } = useTheme();

  return (
    <Appbar.Header
      style={[
        styles.APPBAR,
        {
          borderBottomWidth: withBorder ? 1 : 0,
          backgroundColor: COLORS.WHITE,
        },
      ]}>
      {!hideBack ? (
        <Appbar.Action
          icon={() => <BackIcon />}
          onPress={() => navigation.goBack()}
          style={styles.appbarAction}
        />
      ) : (
        <Appbar.Action style={styles.appbarAction} />
      )}
      {!hideTitle ? (
        <Appbar.Content
          title={title}
          style={styles.appbarContent}
          titleStyle={[styles.title, {color: text}]}
        />
      ) : (
        <Appbar.Content />
      )}
      {!hideEndAction && endActionType === 'text' && (
        <CustomButton
          compact
          mode="text"
          style={styles.textButton}
          labelStyle={[styles.endActionText, {color: primary}]}
          onPress={onEndActionPressed}>
          {endActionTitle}
        </CustomButton>
      )}
      {!hideEndAction && endActionType === 'icon' && (
        <Appbar.Action
          icon={props => (
            <Icon
              name={liked ? 'heart' : 'heart-outline'}
              {...props}
              size={calcFont(24)}
              color={primary}
            />
          )}
          onPress={handleWhishlist}
          style={styles.appbarAction}
        />
      )}
      {!endActionType && <Appbar.Action style={styles.appbarAction} />}
    </Appbar.Header>
  );
};

export {CustomHeader};

const styles = StyleSheet.create({
  APPBAR: {
    //backgroundColor: COLORS.WHITE,
    width: SCREEN_WIDTH,
    elevation: 0,
    alignSelf: 'center',
    borderColor: COLORS.CART_ITEM_BORDER,
  },
  title: {
    fontSize: calcFont(16),
    fontWeight: '600',
    fontStyle: 'normal',
    //letterSpacing: -0.28,
    color: COLORS.HEADER_TEXT,
    textTransform: 'capitalize',
  },
  appbarAction: {
    marginStart: 0,
    // backgroundColor: 'yellow',
    marginEnd: 0,
  },
  appbarContent: {
    alignItems: 'center',
    marginStart: 0,
    // backgroundColor: 'red',
    marginEnd: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  endActionText: {
    //color: COLORS.MAINCOLOR,
    textTransform: 'capitalize',
    textAlign: 'center',
    fontSize: calcFont(14),
    letterSpacing: calcFont(-0.28),
    marginHorizontal: 0,
    marginVertical: 0,
  },
  textButton: {
    justifyContent: 'center',
    width: 'auto',
    marginEnd: calcFont(5),
    //borderRadius: 0,
  },
});
