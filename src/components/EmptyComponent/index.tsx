import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/style/sizes';
import {CustomButton} from '../CustomButton';

interface Props {
  children: React.ReactNode;
  emptyText?: string;
  buttonText?: string;
  withButton?: boolean;
  onPress?: () => void;
}

const EmptyComponent = ({
  children,
  emptyText,
  withButton,
  onPress,
  buttonText,
}: Props) => {
  return (
    <View style={styles.Container}>
      <View style={[styles.emptyStatusContainer, {flex: withButton ? 0.8 : 1}]}>
        {children}
        {emptyText && <Text style={styles.text}>{emptyText}</Text>}
      </View>
      {withButton && (
        <View style={styles.buttonContainer}>
          <CustomButton
            mode={'contained'}
            children={buttonText}
            onPress={onPress}
          />
        </View>
      )}
    </View>
  );
};

export {EmptyComponent};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {textTransform: 'capitalize'},
  emptyStatusContainer: {
    width: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {flex: 0.2, width: SCREEN_WIDTH, alignItems: 'center'},
});
