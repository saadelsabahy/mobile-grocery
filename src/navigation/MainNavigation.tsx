import {createStackNavigator} from '@react-navigation/stack';
import React, {Fragment} from 'react';
import {hasNewLogin} from '../constants/config.constants';
import {
  AddAddress,
  Addresses,
  CategoryDetailes,
  ChangePassword,
  FilterScreen,
  Notifications,
  Offers,
  Product,
  Reviews,
  Search,
  Wishlist,
} from '../screens';
import {OldAddAddress} from '../screens/AddAddress/OldAddAdress';
import AuthStack from './AuthStack';
import {Tabs} from './Tabs';
const AddAddressComponent = hasNewLogin ? AddAddress : OldAddAddress;
const Stack = createStackNavigator();
interface Props {}

const ProductStack = () => {
  return (
    <Fragment>
      <Stack.Navigator
        initialRouteName={'Product'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Reviews" component={Reviews} />
      </Stack.Navigator>
    </Fragment>
  );
};
const MainNavigation = () => {
  return (
    <Fragment>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Tabs"
        /* keyboardHandlingEnabled={false} */
      >
        <Stack.Group screenOptions={{gestureEnabled: false}}>
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Favourites" component={Wishlist} />
          <Stack.Screen name="Offers" component={Offers} />
          <Stack.Screen name="ProductStack" component={ProductStack} />
          <Stack.Screen name="CategoryDetailes" component={CategoryDetailes} />
          <Stack.Screen name="Auth" component={AuthStack} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="Addresses" component={Addresses} />
          <Stack.Screen name="AddAddress" component={AddAddressComponent} />
        </Stack.Group>

        <Stack.Group
          screenOptions={{
            presentation: 'transparentModal',
            headerShown: false,
            gestureEnabled: false,
          }}>
          <Stack.Screen name="Filter" component={FilterScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </Fragment>
  );
};

export default MainNavigation;
