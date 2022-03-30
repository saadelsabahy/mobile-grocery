import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../constants/style';
import MoreScreen from './MoreScreen';

interface Props {}

const More = (props: Props) => {
  return (
    <SafeAreaView style={styles.container} edges={['right', 'top', 'left']}>
      <MoreScreen />
    </SafeAreaView>
  );
};

export {More};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});
