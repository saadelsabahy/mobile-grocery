import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, View} from 'react-native';
import {CustomHeader, SettingsItem} from '../../components';
import {COLORS} from '../../constants/style';
import {calcFont} from '../../constants/style/sizes';
import {
  getSavedPushNotification,
  unsubscribeToNotification,
} from '../../utils/Notifications';
interface Props {}

const ProfileInfo = ({navigation, route}: Props) => {
  const {id: SCREEN_ID} = route?.params;
  const {t} = useTranslation();
  const [switches, setswitches] = useState<{pushnotification?: boolean} | null>(
    {},
  );
  const [render, setrender] = useState<boolean>(false);
  const onSwitchChange = async (key: string) => {
    // console.log(key);

    setswitches(prev => ({...prev, [key]: !prev[key]}));
    await AsyncStorage.setItem(
      'pushnotification',
      JSON.stringify({...switches, [key]: !switches[key]}),
    );
    setrender(prev => !prev);
  };
  useEffect(() => {
    savedPushNotification();

    switches.pushnotification
      ? messaging().subscribeToTopic('all')
      : unsubscribeToNotification();
    return () => {};
  }, [render, switches.pushnotification]);

  const savedPushNotification = async () => {
    const SavedNotification = await getSavedPushNotification();
    setswitches(SavedNotification ? {pushnotification: true} : {});
  };
  const PROFILE_INFO_LIST = [
    {
      id: 1,
      title: t('accountScreen:personalInformation'),
      leftIcon: 'account',
      onPress: () => navigation.navigate('ProfileSettings'),
    },

    {
      id: 2,
      title: t('moreScreen:locations'),
      leftIcon: 'map-marker',
      onPress: () => navigation.navigate('Addresses'),
    },
  ];
  const NOTIFICATION_LIST = [
    {
      id: 1,
      title: t('accountScreen:pushnotification'),
      leftIcon: 'bell',
      key: 'pushnotification',
      //onPress: () => navigation.navigate('ProfileSettings'),
    },

    /*   {
      id: 2,
      title: t('accountScreen:sms notification'),
      leftIcon: 'bell',
    },
    {
      id: 3,
      title: t('accountScreen:pormotional notification'),
      leftIcon: 'bell',
    }, */
  ];
  console.log(
    {switches},
    //Object.keys(switches).map((item) => switches[item]),
  );
  return (
    <View style={styles.container}>
      <CustomHeader title={t('moreScreen:profileInfo')} />
      <View style={{flex: 1, paddingHorizontal: calcFont(20)}}>
        <FlatList
          data={SCREEN_ID == 0 ? PROFILE_INFO_LIST : NOTIFICATION_LIST}
          keyExtractor={(item, index) => `${item.id}`}
          renderItem={({item: {id, title, leftIcon, onPress, key}, index}) => {
            return (
              <SettingsItem
                {...{title, leftIcon, onPress}}
                wihSwitch={SCREEN_ID == 1}
                switchProps={
                  SCREEN_ID == 1
                    ? {
                        onValueChange: () => onSwitchChange(key),
                        value: switches[`${key}`],
                      }
                    : undefined
                }
              />
            );
          }}
        />
      </View>
    </View>
  );
};
export {ProfileInfo};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    //alignItems: 'center',
  },
});
