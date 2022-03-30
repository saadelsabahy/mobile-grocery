/* eslint-disable react-hooks/exhaustive-deps */
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {useCallback, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform} from 'react-native';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {useMutation} from 'react-query';
import {endpoints} from '../constants/apiEndpoints.constants';
import {
  ANDROID_CLIENT_ID_FOR_APPLE_AUTH_ANDROID,
  IOS_CLIENT_ID,
  STORE_URL,
  WEB_CLIENT_ID,
} from '../constants/config.constants';
import {AuthenticationContext, SnackBarContext} from '../contexts';
import {
  AppleJwtDecodedResponse,
  LoginDefaultValuesType,
  SignInResponseType,
} from '../interfaces';
import {getRandomString} from '../utils';
import useAxios from './useAxios';

const useSendVerfication = (
  defaultValues: LoginDefaultValuesType,
  reset: () => void,
) => {
  const navigation = useNavigation();
  const Axios = useAxios(true);
  const {showSnackbar} = useContext(SnackBarContext);
  const {
    state: {identityType},
  } = useContext(AuthenticationContext);
  const {t} = useTranslation();
  const {isLoading, mutate, data, isError} = useMutation(
    (userData: typeof defaultValues) =>
      Axios.post(endpoints.sendVerificationCode, userData),
    {
      onSuccess: (data, variables: typeof defaultValues) =>
        onSignInSuccess(data.data, variables),
      onError: () => showSnackbar(t('messages:checkInfoAndRetry'), true),
    },
  );
  useFocusEffect(() => {
    GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    })
      .then(() => {
        // play services are available. can now configure library
        GoogleSignin.configure({
          webClientId: WEB_CLIENT_ID,
          iosClientId: IOS_CLIENT_ID,
        });
      })
      .catch(err => {
        console.log('Play services error', err.code, err.message);
      });

    return () => {};
  });
  const onSignInSuccess = async (
    signInResponse: SignInResponseType,
    {identity}: typeof defaultValues,
  ) => {
    const {success, message, data: id, verification_provider} = signInResponse;
    if (success) {
      navigation.navigate('Auth', {
        screen: 'VerificationCode',
        params: {id, verification_provider, identity},
      });
      reset();
    } else {
      showSnackbar(message || t('messages:checkInfoAndRetry'), true);
    }
  };
  const onFacebookLoginPressed = useCallback(async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        console.log('user cancel login');
      }

      console.log(
        `Login success with permissions: ${result.grantedPermissions.toString()}`,
      );

      const {userID, accessToken} = await AccessToken.getCurrentAccessToken();

      let req = await axios.get(
        `https://graph.facebook.com/v2.5/${userID}?fields=email&access_token=` +
          accessToken,
      );
      if (req.status === 200) {
        const {
          data: {email},
        } = req;
        mutate({
          ...defaultValues,
          identity: identityType === 'email' ? email : '+201032633647',
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onGoogleLoginPressed = useCallback(async () => {
    try {
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.user.email) {
        const {email} = userInfo.user;
        mutate({
          ...defaultValues,
          identity: identityType === 'email' ? email : '',
        });
      }
    } catch (error) {
      console.log('google login error', error);
    }
  }, []);

  const doAppleLoginForIos = async () => {
    try {
      // Start the sign-in request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // Ensure Apple returned a user identityToken
      if (!appleAuthRequestResponse.identityToken) {
        console.log('Apple Sign-In failed - no identify token returned');
      }
      //reactotron.log({appleAuthRequestResponse});
      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const {email, identityToken} = appleAuthRequestResponse;
      const {email: decodedEmail}: AppleJwtDecodedResponse = jwt_decode(
        identityToken!,
      );

      mutate({
        ...defaultValues,
        identity: (identityType === 'email' && email) || decodedEmail,
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );
      //reactotron.log('ser is authenticated', credentialState);
      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
        console.log('ser is authenticated', credentialState);
      }
    } catch (error) {
      console.log('apple error', error);
    }
  };
  const doAppleLoginForAndroid = async () => {
    // Generate secure, random values for state and nonce
    const rawNonce = getRandomString(20);
    const requestState = getRandomString(20);

    try {
      // Initialize the module
      appleAuthAndroid.configure({
        clientId: ANDROID_CLIENT_ID_FOR_APPLE_AUTH_ANDROID,
        redirectUri: `${STORE_URL}/auth/callback`,

        scope: appleAuthAndroid.Scope.EMAIL,

        responseType: appleAuthAndroid.ResponseType.ALL,
        nonce: rawNonce,
        state: requestState,
      });

      const {id_token} = await appleAuthAndroid.signIn();
      //reactotron.log(id_token);
      if (id_token) {
        const {email}: AppleJwtDecodedResponse = jwt_decode(id_token);
        mutate({
          ...defaultValues,
          identity: identityType === 'email' ? email : '',
        });
      }
    } catch (error) {
      if (error && error.message) {
        switch (error.message) {
          case appleAuthAndroid.Error.NOT_CONFIGURED:
            console.log('appleAuthAndroid not configured yet.');
            break;
          case appleAuthAndroid.Error.SIGNIN_FAILED:
            console.log('Apple signin failed.');
            break;
          case appleAuthAndroid.Error.SIGNIN_CANCELLED:
            console.log('User cancelled Apple signin.');
            break;
          default:
            break;
        }
      }
    }
  };
  return {
    data,
    isLoading,
    isError,
    mutate,
    onFacebookLoginPressed,
    onGoogleLoginPressed,
    onAppleLoginPressed:
      Platform.OS === 'android' ? doAppleLoginForAndroid : doAppleLoginForIos,
  };
};

export default useSendVerfication;
