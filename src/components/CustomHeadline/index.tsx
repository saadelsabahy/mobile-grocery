import React from 'react';
import {
  I18nManager,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {Text} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {calcFont, calcHeight, calcWidth} from '../../constants/style/sizes';

interface Props {
  title: string;
  containerStyle?: ViewStyle;
  headlineStyle?: TextStyle;
}

const CustomHeadline = ({title, containerStyle, headlineStyle}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.headline, headlineStyle]}>{title}</Text>
    </View>
  );
};

export {CustomHeadline};

const styles = StyleSheet.create({
  container: {
    minWidth: calcWidth(175),
    minHeight: calcHeight(40),
    marginBottom: calcFont(14),
    justifyContent: 'center',
  },
  headline: {
    fontSize: calcFont(34),
    fontWeight: I18nManager.isRTL ? 'normal' : '500',
    fontStyle: 'normal',
    letterSpacing: calcFont(0.22),
    color: COLORS.HEADER_TEXT,
    textTransform: 'capitalize',
  },
});
