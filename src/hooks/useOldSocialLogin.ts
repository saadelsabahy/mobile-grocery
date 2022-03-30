/* eslint-disable react-hooks/exhaustive-deps */
import {
  appleAuth,
  appleAuthAndroid,
  AppleRequestResponse,
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
  OldLoginResponseType,
  oldSocialLoginBodyDataType,
} from '../interfaces';
import {getRandomString} from '../utils';
import useAxios from './useAxios';

const useOldSocialLogin = (
  defaultValues: LoginDefaultValuesType,
  reset: () => void,
) => {
  const Axios = useAxios();
  const {showSnackbar} = useContext(SnackBarContext);
  const {authContext} = useContext(AuthenticationContext);
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {isLoading, mutate, data, isError} = useMutation(
    (userData: oldSocialLoginBodyDataType) =>
      Axios.post(endpoints.socialLogin, userData),
    {
      onSuccess: socialLoginResponse =>
        onSignInSuccess(socialLoginResponse.data),
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
  const onSignInSuccess = async (data: OldLoginResponseType) => {
    const {customer, is_logged, error} = data;
    if (customer?.customer_id) {
      await authContext.signIn({
        userToken: `${customer.telephone}${customer.email}`,
        userData: customer,
      });
      navigation.navigate('Home');
      reset && reset();
      await authContext.restoreToken();
    } else {
      if (error) {
        if (
          typeof error !== 'object' &&
          (error.includes('Warning') || error.includes('تحذير'))
        ) {
          showSnackbar(`${error}`, true);
        } else {
          showSnackbar(
            `${Object.keys(error)[0]} ${Object.values(error)[0]}`,
            true,
          );
        }
      }
    }
  };
  /*  const onSignInSuccess = async (
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
  }; */
  const onFacebookLogin = useCallback(async () => {
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
        `https://graph.facebook.com/v2.5/${userID}?fields=email,first_name,last_name,gender,hometown,address,birthday,link,picture,friends&access_token=` +
          accessToken,
      );
      if (req.status === 200) {
        const {
          data: {
            last_name: firstName,
            first_name: lastName,
            email,
            id: identifier,
            picture: {
              data: {url: photoURL},
            },
          },
        } = req;
        mutate({
          provider: 'facebook',
          profile: {
            email,
            identifier,
            lastName,
            firstName,
            photoURL,
            displayName: `${firstName} ${lastName}`,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onGoogleLogin = useCallback(async () => {
    try {
      const userInfo = await GoogleSignin.signIn();

      if (userInfo?.user?.email) {
        const {
          email,
          id: identifier,
          familyName: lastName,
          givenName: firstName,
          photo: photoURL,
          name: displayName,
        } = userInfo.user;
        mutate({
          provider: 'google',
          profile: {
            email,
            identifier,
            lastName,
            firstName,
            photoURL,
            displayName,
          },
        });
      }
    } catch (error) {
      console.log('google login error', error);
    }
  }, []);

  const AppleLoginForIos = async () => {
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
      const {
        email,
        user: identifier,
        identityToken,
      }: AppleRequestResponse = appleAuthRequestResponse;
      const {email: decodedEmail, sub}: AppleJwtDecodedResponse = jwt_decode(
        identityToken!,
      );

      mutate({
        provider: 'apple',
        profile: {
          email: email || decodedEmail,
          identifier: identifier || sub,
        },
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
  const AppleLoginForAndroid = async () => {
    // Generate secure, random values for state and nonce
    const rawNonce = getRandomString(20);
    const requestState = getRandomString(20);

    try {
      // Initialize the module
      appleAuthAndroid.configure({
        clientId: ANDROID_CLIENT_ID_FOR_APPLE_AUTH_ANDROID,
        redirectUri: `${STORE_URL}/auth/callback`,

        scope: appleAuthAndroid.Scope.ALL,

        responseType: appleAuthAndroid.ResponseType.ALL,
        nonce: rawNonce,
        state: requestState,
      });

      const {id_token} = await appleAuthAndroid.signIn();
      if (id_token) {
        const {email, sub: identifier}: AppleJwtDecodedResponse = jwt_decode(
          id_token,
        );

        mutate({
          provider: 'apple',
          profile: {
            email,
            identifier,
          },
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
    onFacebookLogin,
    onGoogleLogin,
    onAppleLoginPressed:
      Platform.OS === 'android' ? AppleLoginForAndroid : AppleLoginForIos,
    onSignInSuccess,
  };
};

export default useOldSocialLogin;
