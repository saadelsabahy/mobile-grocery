import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {Text} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {calcFont, calcWidth} from '../../constants/style/sizes';

interface Props {
  text: string;
  actionText?: string;
  onActionPressed?: () => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const AuthParagraph = ({
  text,
  actionText,
  onActionPressed,
  containerStyle,
  textStyle,
}: Props) => {
  const {
    colors: {primary},
  } = useTheme();
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.text, textStyle]}>
        {text}
        {actionText ? (
          <Text style={{color: primary}} onPress={onActionPressed}>
            {` ${actionText}`}
          </Text>
        ) : null}
      </Text>
    </View>
  );
};

export {AuthParagraph};

const styles = StyleSheet.create({
  container: {
    width: calcWidth(252),
    opacity: 0.64,
  },
  text: {
    fontSize: calcFont(16),
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: COLORS.HEADER_TEXT,
    textTransform: 'capitalize',
  },
});
