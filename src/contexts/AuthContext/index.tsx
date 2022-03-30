import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import React, {ReactNode, useCallback, useReducer} from 'react';
import {LoginManager} from 'react-native-fbsdk';
import {CountryCode} from '../../components/CustomCountryPicker/types';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {
  API_PATH,
  STORE_PASSWORD,
  STORE_URL,
  STORE_USERNAME,
} from '../../constants/config.constants';
import {CountryType} from '../../interfaces';
import {CustomerType} from '../../interfaces/Auth';
import i18next from '../../localization';
import {
  FIRST_INSTALL,
  RESTORE_TOKEN,
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  STORE_DATA,
  USER_DATA,
  USER_TOKEN,
} from './types';
type responseType = {
  city: string;
  country_name: string;
  country_code: CountryCode;
};

type userTokenType = string | null;
type storeDataTypes = {token: string; settings: settingsTypes; cookie: string};
interface settingsTypes {
  MainColor?: string | null;
  LogoURL?: string | null;
  StoreSlogan?: string | null;

  StoreName?: string | null;

  LanguageCode?: string | null;
  languages?: string[] | null;
  languages_full_info?: {
    [key: string]: {LanguageCode: string; LanguageName: string};
  } | null;

  countries?: CountryType[];
}
interface AuthContextInitialStateTypes {
  isLoading?: boolean;
  isSignout?: boolean;
  userToken?: userTokenType;
  storeToken?: userTokenType;
  settings?: settingsTypes;
  cookie?: string;
  userName: string;
  email: string;
  firstInstall?: boolean;
  userData: CustomerType;
  locationInfo: responseType | {};
  identityType?: string;
}
const initialState: AuthContextInitialStateTypes = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  storeToken: null,
  userName: '',
  email: '',
  userData: {},
  locationInfo: {},
  identityType: '',
};

type AuthReducerActionType =
  | {type: typeof SIGN_OUT; payload?: any}
  | {
      type: typeof SIGN_IN;
      payload: AuthContextInitialStateTypes;
    }
  | {
      type: typeof RESTORE_TOKEN;
      payload: {userToken: userTokenType; storeToken: userTokenType};
    };
interface AuthContextType {
  signIn: (data: any) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (data: any) => Promise<void>;
  restoreToken: (data?: any) => Promise<void>;
}
type contextType = {
  authContext: AuthContextType;
  state: AuthContextInitialStateTypes;
};
export const AuthenticationContext = React.createContext<contextType>(
  {} as contextType,
);
const reducer = (
  state: AuthContextInitialStateTypes = initialState,
  {type, payload}: AuthReducerActionType,
) => {
  switch (type) {
    case RESTORE_TOKEN:
      return {
        ...state,
        userToken: payload.userToken,
        isLoading: false,
        storeToken: payload.storeToken,
        settings: payload.settings,
        cookie: payload.cookie,
        userName: `${payload?.userData?.firstname} ${payload?.userData?.lastname}`,
        email: payload?.userData?.email,
        isSignout: !!payload.userToken,
        firstInstall: !!payload.firstInstall,
        userData: payload.userData,
        locationInfo: payload.locationInfo,
        identityType: payload.identityType,
      };
    case SIGN_IN:
      return {
        ...state,
        userToken: payload,
        isLoading: false,
        isSignout: false,
        userName: `${payload.userData.firstname} ${payload.userData.lastname}`,
        email: payload.userData.email,
      };
    case SIGN_OUT:
      return {...state, userToken: null, isSignout: true, userName: ''};
    case SIGN_UP:
      return {
        ...state,
        userToken: payload.userToken,
        userName: payload.userName,
      };
    default:
      return state;
  }
};
const AuthContext: React.FC = ({children}: {children?: ReactNode}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getCountryInfo = async () => {
    try {
      const {data}: {data: responseType} = await axios.get(
        'https://freegeoip.app/json/',
      );
      return data;
    } catch (error) {
      console.log('getCountryInfo', error);
    }
    //  reactotron.log(data);
  };

  const getIdentityType = async () => {
    try {
      const {
        data: {
          setting: {identityType},
        },
      }: {
        data: {
          setting: {
            identityType: string;
          };
        };
      } = await axios.post(STORE_URL + API_PATH + endpoints.identityType, {
        username: STORE_USERNAME,
        password: STORE_PASSWORD,
      });
      return identityType;
    } catch (error) {
      console.log('getIdentityType', error);
    }
    //  reactotron.log(data);
  };

  const onSignOutPressed = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(USER_TOKEN);
      await AsyncStorage.removeItem(USER_DATA);
      await LoginManager.logOut();
      GoogleSignin.configure({});
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.log('signout error', error);
    }
  }, []);
  const authContext: AuthContextType = React.useMemo(
    () => ({
      signIn: async ({userToken, userData}) => {
        await AsyncStorage.setItem(USER_TOKEN, userToken);
        await AsyncStorage.setItem(USER_DATA, JSON.stringify(userData));
        dispatch({type: SIGN_IN, payload: {userToken, userData}});
      },
      signOut: async () => {
        await onSignOutPressed();
        dispatch({type: SIGN_OUT});
      },
      signUp: async ({userName, token}) => {
        dispatch({
          type: SIGN_UP,
          payload: {userName, userToken: token},
        });
      },
      restoreToken: async data => {
        const userToken = await AsyncStorage.getItem(USER_TOKEN);
        const storeData = await AsyncStorage.getItem(STORE_DATA);
        const userData = await AsyncStorage.getItem(USER_DATA);
        const firstInstall = await AsyncStorage.getItem(FIRST_INSTALL);
        const parsedUserData = userData ? await JSON.parse(userData) : {};
        const locationInfo = await getCountryInfo();
        const identityType = await getIdentityType();
        try {
          if (storeData) {
            const parseStoreData: storeDataTypes = await JSON.parse(storeData);
            // console.log({parseStoreData});

            dispatch({
              type: RESTORE_TOKEN,
              payload: {
                userToken,
                storeToken: parseStoreData.token,
                ...parseStoreData,
                userData: parsedUserData,
                firstInstall: !!firstInstall,
                locationInfo,
                identityType,
              },
            });
          } else {
            const {
              data: {token, settings, cookie},
            }: {
              data: storeDataTypes;
            } = await axios.post(STORE_URL + API_PATH + endpoints.login, {
              username: STORE_USERNAME,
              password: STORE_PASSWORD,
            });
            await axios.post(STORE_URL + API_PATH + endpoints.switchLanguage, {
              language_code: settings.LanguageCode,
              token,
            });
            dispatch({
              type: RESTORE_TOKEN,
              payload: {
                userToken,
                storeToken: token,
                settings,
                cookie,
                firstInstall: !!firstInstall,
                userData: {},
                locationInfo,
                identityType,
              },
            });
            await AsyncStorage.setItem(
              STORE_DATA,
              JSON.stringify({token, settings, cookie}),
            );

            if (settings.LanguageCode && !storeData) {
              i18next.changeLanguage(settings.LanguageCode);
            }
          }
        } catch (error) {
          console.log('restore token error', error);
          dispatch({
            type: RESTORE_TOKEN,
            payload: {userToken, storeToken: null},
          });
        }

        data;
      },
    }),
    [onSignOutPressed],
  );
  return (
    <AuthenticationContext.Provider value={{authContext, state}}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export {AuthContext};
