import {useNavigation} from '@react-navigation/core';
import {useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import InAppReview from 'react-native-in-app-review';
import {useMutation} from 'react-query';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {AuthenticationContext, SnackBarContext} from '../../contexts';
import useAxios from '../../hooks/useAxios';
import {logoutResponseType} from '../../interfaces';
interface Props {}

const useLogic = () => {
  const [showLanguageModal, setshowLanguageModal] = useState<boolean>(false);
  const {t} = useTranslation();
  const {showSnackbar} = useContext(SnackBarContext);
  const navigation = useNavigation();
  const Axios = useAxios();
  const {mutate} = useMutation(
    'logoutRequest',
    async () => await Axios.post(endpoints.logout),
    {
      onSuccess: async ({
        data: {message, warning},
      }: {
        data: logoutResponseType;
      }) => {
        console.log({message});

        if (message) {
          await signOut();
          showSnackbar(t('messages:signoutSuccessfuly'));
        } else {
          showSnackbar(warning!, true);
        }
      },
      onError: () => console.log('logout error'),
    },
  );
  const {
    authContext: {signOut},
  } = useContext(AuthenticationContext);
  const goToWishlist = () => {
    navigation.navigate('Favourites');
  };

  const goToRefereToFriends = () => {
    navigation.navigate('RefereToFriends');
  };
  const goToProfileInfo = (id: number) => {
    navigation.navigate('ProfileInfo', {id});
  };
  const onSignOutPressed = async () => {
    mutate();
  };
  const onSignInPressed = () => {
    navigation.navigate('Auth');
  };
  const changeLanguage = () => {
    setshowLanguageModal(true);
  };
  const hideLanguageModal = () => {
    setshowLanguageModal(false);
  };
  const onAppReviewPressed = () => {
    if (InAppReview.isAvailable()) {
      // trigger UI InAppreview
      InAppReview.RequestInAppReview()
        .then(hasFlowFinishedSuccessfully => {
          // when return true in android it means user finished or close review flow
          console.log('InAppReview in android', hasFlowFinishedSuccessfully);

          // when return true in ios it means review flow lanuched to user.
          console.log(
            'InAppReview in ios has lanuched successfully',
            hasFlowFinishedSuccessfully,
          );

          // 1- you have option to do something ex: (navigate Home page) (in android).
          // 2- you have option to do something,
          // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

          // 3- another option:
          if (hasFlowFinishedSuccessfully) {
            // do something for ios
            // do something for android
          }

          // for android:
          // The flow has finished. The API does not indicate whether the user
          // reviewed or not, or even whether the review dialog was shown. Thus, no
          // matter the result, we continue our app flow.

          // for ios
          // the flow lanuched successfully, The API does not indicate whether the user
          // reviewed or not, or he/she closed flow yet as android, Thus, no
          // matter the result, we continue our app flow.
        })
        .catch(error => {
          //we continue our app flow.
          // we have some error could happen while lanuching InAppReview,
          // Check table for errors and code number that can return in catch.
          console.log({error});
        });
    } else {
      console.log('InAppReview not available');
    }
  };
  return {
    showLanguageModal,
    goToWishlist,
    goToRefereToFriends,
    onSignOutPressed,
    onSignInPressed,
    changeLanguage,
    goToProfileInfo,
    hideLanguageModal,
    onAppReviewPressed,
  };
};

export default useLogic;
