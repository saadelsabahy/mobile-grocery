import {
  DefaultTheme as NavigatorTheme,
  NavigationContainer,
} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {
  configureFonts,
  DefaultTheme,
  Portal,
  Snackbar,
  ThemeProvider,
} from 'react-native-paper';
import {Theme} from 'react-native-paper/lib/typescript/types';
import {Loader, NoInternet} from '../components';
import {hasFirebase} from '../constants/config.constants';
import {COLORS, FONTS} from '../constants/style';
import {NetworkContext, SnackBarContext} from '../contexts';
import {AuthenticationContext} from '../contexts/AuthContext';
import {checkPermission} from '../utils/Notifications';
import MainNavigation from './MainNavigation';

interface Props {}

const AppNavigation = () => {
  const {
    authContext,
    state: {isLoading, settings},
  } = useContext(AuthenticationContext);
  const {snakbarMessage, hideSnackbar, snakbarType} = useContext(
    SnackBarContext,
  );
  const {isOnline} = useContext(NetworkContext);

  const theme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: settings?.MainColor || COLORS.MAINCOLOR,
    },
    fonts: configureFonts({
      ios: FONTS,
      android: FONTS,
      default: FONTS,
    }),
  };

  useEffect(() => {
    if (hasFirebase) {
      checkPermission();
    } else {
      return;
    }
  }, []);
  useEffect(() => {
    authContext.restoreToken(RNBootSplash.hide({fade: true}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <NavigationContainer
          theme={{
            ...NavigatorTheme,
            colors: {
              ...NavigatorTheme.colors,
              primary: settings?.MainColor || COLORS.MAINCOLOR,
              //text: COLORS.GRAY,
            },
          }}>
          {!isOnline && <NoInternet />}
          {isLoading ? <Loader /> : <MainNavigation />}
        </NavigationContainer>
        <Portal>
          <Snackbar
            duration={2500}
            visible={!!snakbarMessage}
            onDismiss={hideSnackbar}
            style={[
              styles.snackbar,
              {
                backgroundColor: snakbarType
                  ? COLORS.MOCK_BG_RED
                  : theme.colors.primary,
              },
            ]}>
            {snakbarMessage}
          </Snackbar>
        </Portal>
      </ThemeProvider>
    </>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({
  snackbar: {
    backgroundColor: COLORS.MOCK_BG_RED,
    margin: 0,
    borderRadius: 0,
  },
});
/*

*/
