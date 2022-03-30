import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {calcFont, calcHeight, calcWidth} from '../../constants/style/sizes';
type Props = React.ComponentProps<typeof Button>;

const CustomButton = ({...props}: Props) => {
  const {
    colors: {primary},
  } = useTheme();
  return (
    <Button
      {...props}
      style={[
        styles.button,
        props.style,
        {
          borderColor: props.mode == 'outlined' ? primary : 'transparent',
        },
      ]}
      labelStyle={[styles.label, props.labelStyle]}>
      {props.children || 'click here'}
    </Button>
  );
};

export {CustomButton};

const styles = StyleSheet.create({
  button: {
    width: calcWidth(335),
    height: calcHeight(48),
    borderRadius: calcFont(8),
    //backgroundColor: COLORS.MAINCOLOR,
  },
  label: {
    fontSize: calcFont(14),
    fontStyle: 'normal',
    letterSpacing: calcFont(0.8),
    //textAlign: 'center',
    //color: '#ffffff',
  },
});
