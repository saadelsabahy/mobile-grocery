import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';
import reactotron from 'reactotron-react-native';

export const unsubscribeToNotification = () => {
  PushNotification.abandonPermissions();
  messaging().unsubscribeFromTopic('all');
};
export const PushNotificationConfigration = (navigation?: any) => {
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token: string) {
      console.log('TOKEN:', token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification: any) {
      const {foreground, title, message} = notification;
      if (foreground && (title || message)) {
        console.log('send...');

        PushNotification.localNotification({
          ...notification,
          channelId: 'local_channel',
        });
      }
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification: any) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);

      // process the action
    },
    senderID: '831283984513',
    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err: any) {
      console.log(err.message, err);
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,

    requestPermissions: true,
    subscribeTopic(topic: string) {
      console.log(topic);

      PushNotification.subscribeToTopic(topic);
    },
  });
  PushNotification.createChannel(
    {
      channelId: 'local_channel', // (required)
      channelName: 'My channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: true, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
};
export const getSavedPushNotification = async () => {
  const savedPushNotification = await AsyncStorage.getItem('pushnotification');

  const parsedSavedPushNotification =
    savedPushNotification && (await JSON.parse(savedPushNotification));
  return parsedSavedPushNotification?.pushnotification;
  //setswitches(savedPushNotification ? parsedSavedPushNotification : {});
};
export const enableNotification = async () => {
  await AsyncStorage.setItem(
    'pushnotification',
    JSON.stringify({pushnotification: true}),
  );
};
export const checkPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    const saved = await getSavedPushNotification();

    saved === undefined
      ? enableNotification()
      : saved?.pushnotification
      ? enableNotification()
      : null;
    messaging().subscribeToTopic('all');
  } else {
    try {
      // await messaging().requestPermission();
      // //await enableNotification();
      // messaging().subscribeToTopic('all');
    } catch (error) {
      console.log('permission rejected');
    }
  }
};
