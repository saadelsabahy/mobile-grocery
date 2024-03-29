import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';

const reactotron = Reactotron.configure({
  host: '192.168.1.3',
  name: 'Grocery',
})
  .useReactNative()
  .setAsyncStorageHandler(AsyncStorage)
  /* .use(reactotronRedux()) */
  .connect();

export default reactotron;
