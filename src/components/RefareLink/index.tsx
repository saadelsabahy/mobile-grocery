import Clipboard from '@react-native-clipboard/clipboard';
import React from 'react';
import {
  I18nManager,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {List, Text} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {calcFont, calcHeight, calcWidth} from '../../constants/style/sizes';
interface Props {
  icon: string;
  text: string;
  subText?: string;
  iconColor?: string;
  containerStyle?: ViewStyle;
  onPress?: () => void;
}

const RefareLink = ({
  icon,
  text,
  subText,
  containerStyle,
  iconColor,
  onPress,
}: Props) => {
  const copyToClipboard = () => {
    Clipboard.setString(text);
  };

  return (
    <Pressable
      style={[styles.container, containerStyle]}
      onPress={onPress || copyToClipboard}>
      <List.Icon
        icon={icon}
        color={iconColor || COLORS.HEADER_TEXT}
        style={{marginHorizontal: 0, marginVertical: 0}}
      />

      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={[styles.text]}>{text.replace(/(<([^>]+)>)/gi, ' ')}</Text>

        {!!subText && (
          <Text style={[styles.text, {fontSize: calcFont(12), opacity: 0.3}]}>
            {subText}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export {RefareLink};

const styles = StyleSheet.create({
  container: {
    width: calcWidth(335),
    minHeight: calcHeight(54),
    borderRadius: calcFont(6),
    backgroundColor: COLORS.INPUT_COLOR,
    borderStyle: 'solid',
    borderWidth: calcFont(1),
    borderColor: COLORS.INPUT_BORDER_COLOR,
    paddingHorizontal: calcFont(20),
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: calcFont(16),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.28,
    color: COLORS.HEADER_TEXT,
    textTransform: 'capitalize',
    // textAlign: I18nManager.isRTL ? 'right' : 'left',
    textAlignVertical: 'center',
  },
});
