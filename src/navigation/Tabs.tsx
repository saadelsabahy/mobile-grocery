import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {hasNewLogin} from '../constants/config.constants';
import {COLORS} from '../constants/style';
import {calcFont} from '../constants/style/sizes';
import {AuthenticationContext, cartContext} from '../contexts';
import {
  Cart,
  Categories,
  Home,
  Login,
  More,
  MyOrders,
  OldLogin,
  OrderDetailes,
  ProfileSettings,
} from '../screens';
import {ProfileInfo} from '../screens/ProfileInfo';
import {RefereToFriends} from '../screens/RefereToFriends';
import {
  CartIcon,
  CategoriesIcon,
  HomeIcon,
  MoreIcon,
  OrdersIcon,
} from '../svgs';

const LoginComponent = hasNewLogin ? Login : OldLogin;
const OrdersStack = createStackNavigator();
interface tabBarOPtionsProps {
  label: string;
}
interface Props {}
const Tab = createBottomTabNavigator();

const tabBarOPtions = ({
  label,
}: tabBarOPtionsProps): BottomTabNavigationOptions => {
  return {
    tabBarLabel: ({focused, color}) => (
      <Text style={[styles.tabBarText, {color}]}>{label}</Text>
    ),
  };
};

const MyOrdersStack = () => (
  <>
    <OrdersStack.Navigator
      initialRouteName={'MyPurchases'}
      screenOptions={{headerShown: false}}>
      <OrdersStack.Screen name="MyPurchases" component={MyOrders} />
      <OrdersStack.Screen name="OrderDetailes" component={OrderDetailes} />
    </OrdersStack.Navigator>
  </>
);
const SettingsStack = () => (
  <>
    <OrdersStack.Navigator
      initialRouteName={'MoreStack'}
      screenOptions={{headerShown: false}}>
      <OrdersStack.Screen name="MoreStack" component={More} />
      <OrdersStack.Screen name="ProfileInfo" component={ProfileInfo} />
      <OrdersStack.Screen name="ProfileSettings" component={ProfileSettings} />
      <OrdersStack.Screen name="RefereToFriends" component={RefereToFriends} />
    </OrdersStack.Navigator>
  </>
);
const Tabs = () => {
  const {t, i18n} = useTranslation();
  const {
    colors: {primary},
  } = useTheme();
  const {cartProducts} = useContext(cartContext);
  const {
    state: {userToken},
  } = useContext(AuthenticationContext);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="history"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        // activeTintColor: COLORS.TABBAR_ACTIVE_COLOR,
        // inactiveTintColor: COLORS.TABBAR_INACTIVE_COLOR,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, focused}) => <HomeIcon color={color} />,
          ...tabBarOPtions({label: t('tabs:home')}),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarIcon: ({color, focused}) => <CategoriesIcon color={color} />,
          ...tabBarOPtions({
            label: t('tabs:categories'),
          }),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={userToken ? MyOrdersStack : LoginComponent}
        options={{
          tabBarIcon: ({color, focused}) => <OrdersIcon color={color} />,
          ...tabBarOPtions({
            label: t('tabs:myOrders'),
          }),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({color, focused}) => <CartIcon color={color} />,
          ...tabBarOPtions({
            label: t('tabs:cart'),
          }),
          tabBarBadge: cartProducts?.products?.length || undefined,
          tabBarBadgeStyle: {
            backgroundColor: primary,
          },
        }}
      />
      <Tab.Screen
        name="More"
        component={SettingsStack}
        options={{
          tabBarIcon: ({color, focused}) => <MoreIcon color={color} />,
          ...tabBarOPtions({
            label: t('tabs:more'),
          }),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  tabBarText: {
    textTransform: 'capitalize',
    fontSize: calcFont(9),
    fontWeight: '500',
  },
});

export {Tabs};
