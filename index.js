/**
 * @format
 */

import messaging from '@react-native-firebase/messaging';
import dayjs from 'dayjs';
import 'dayjs/locale/ar';
import 'dayjs/locale/en';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {PushNotificationConfigration} from './src/utils/Notifications';
PushNotificationConfigration();

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('BACKGROUND', JSON.stringify(remoteMessage));
});
AppRegistry.registerComponent(appName, () => App);
