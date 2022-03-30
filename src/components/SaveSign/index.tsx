import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {calcFont, calcHeight, calcWidth} from '../../constants/style/sizes';

interface Props {
  text?: string;
}

const SaveSign = ({text}: Props) => {
  const {
    colors: {primary},
  } = useTheme();

  return text ? (
    <View style={[styles.container, {backgroundColor: primary}]}>
      <Text style={styles.text} numberOfLines={1}>
        {text}
      </Text>
    </View>
  ) : (
    <View />
  );
};

export {SaveSign};

const styles = StyleSheet.create({
  container: {
    minWidth: calcWidth(74),
    height: calcHeight(27),
    borderRadius: calcFont(4),
    justifyContent: 'center',
    alignItems: 'center',
    //paddingVertical: calcFont(5),
  },
  text: {
    fontSize: calcFont(14),
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: -0.39,
    color: COLORS.WHITE,
  },
});
