import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));

import React, {useEffect} from 'react';
import {I18nextProvider} from 'react-i18next';
import {LogBox, StatusBar, StyleSheet} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from 'react-query';
import {COLORS} from './src/constants/style';
import {
  AuthContext,
  CartProvider,
  FavouritesProvider,
  FilterProvider,
  NetworkProvider,
  ProductProvider,
  SnackBarProvider,
} from './src/contexts';
import i18next from './src/localization';
import AppNavigation from './src/navigation';
LogBox.ignoreLogs(['Setting a timer']);
LogBox.ignoreAllLogs();
const queryClient = new QueryClient();
const App = () => {
  return (
    <PaperProvider>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.WHITE} />
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18next}>
          <NetworkProvider>
            <AuthContext>
              <SafeAreaProvider style={styles.container}>
                <SnackBarProvider>
                  <FavouritesProvider>
                    <CartProvider>
                      <FilterProvider>
                        <ProductProvider>
                          <AppNavigation />
                        </ProductProvider>
                      </FilterProvider>
                    </CartProvider>
                  </FavouritesProvider>
                </SnackBarProvider>
              </SafeAreaProvider>
            </AuthContext>
          </NetworkProvider>
        </I18nextProvider>
      </QueryClientProvider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});

export default App;
