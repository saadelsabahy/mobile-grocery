import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';

interface Props {}

const Notifications = (props: Props) => {
  const {t} = useTranslation();
  return (
    <View style={[styles.container]}>
      <Text>Notifications</Text>
    </View>
  );
};

export {Notifications};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
