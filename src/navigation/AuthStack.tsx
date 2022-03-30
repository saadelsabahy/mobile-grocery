import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {hasNewLogin} from '../constants/config.constants';
import {
  CompleteProfile,
  ForgetPassword,
  Login,
  OldLogin,
  Register,
  VerificationCode,
} from '../screens';
const Auth = createStackNavigator();
interface Props {}
const LoginComponent = hasNewLogin ? Login : OldLogin;
const AuthStack = (props: Props) => {
  return (
    <Auth.Navigator
      screenOptions={{headerShown: false, keyboardHandlingEnabled: false}}
      initialRouteName="Login">
      {/* <Auth.Screen name="Account" component={Account} /> */}
      <Auth.Screen name="Login" component={LoginComponent} />
      <Auth.Screen name="Register" component={Register} />
      <Auth.Screen name="ForgetPassword" component={ForgetPassword} />
      <Auth.Screen name="VerificationCode" component={VerificationCode} />
      <Auth.Screen name="CompeleteProfile" component={CompleteProfile} />
    </Auth.Navigator>
  );
};

export default AuthStack;
