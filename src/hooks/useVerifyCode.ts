import {useNavigation} from '@react-navigation/core';
import {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {useMutation} from 'react-query';
import {endpoints} from '../constants/apiEndpoints.constants';
import {AuthenticationContext, SnackBarContext} from '../contexts';
import {VerifyCodeResponseType} from '../interfaces/Auth';
import useAxios from './useAxios';

type verifyCodeRequestBodyType = {
  code?: string;
  id?: string;
  identity?: string;
  verification_provider?: string;
};
interface Props {
  defaultValues: verifyCodeRequestBodyType;
  reset?: () => void;
  changeData?: boolean;
}

const useVerifyCode = ({defaultValues, reset, changeData = false}: Props) => {
  const {t} = useTranslation();
  const Axios = useAxios(true);
  const navigation = useNavigation();
  const {showSnackbar} = useContext(SnackBarContext);
  const {authContext} = useContext(AuthenticationContext);
  const {isLoading, mutate, data, isError} = useMutation(
    (userData: typeof defaultValues) =>
      Axios.post(endpoints.verifyCode, userData),
    {
      onSuccess: (data, variables: typeof defaultValues) => {
        !changeData && onAuthverfyCodeSuccess(data.data, variables);
      },
      onError: () => showSnackbar(t('messages:checkInfoAndRetry'), true),
    },
  );

  const onAuthverfyCodeSuccess = async (
    data: VerifyCodeResponseType,
    {id}: typeof defaultValues,
  ) => {
    const {success, message, customer, fields} = data;
    if (success) {
      fields?.length
        ? navigation.navigate('Auth', {
            screen: 'CompeleteProfile',
            params: {id, fields},
          })
        : await authContext.signIn({
            userToken: `${customer.telephone}${customer.email}`,
            userData: customer,
          });
      !fields?.length && navigation.navigate('Home');
      reset && reset();
      await authContext.restoreToken();
    } else {
      showSnackbar(message, true);
    }
  };
  /*  const verifyCodeForChangeData = (
    verifyRequestBody: verifyCodeRequestBodyType,
    dataTobeUpdated: CustomerType,hideVerficationModal:()=>void
  ) => {
    mutate(verifyRequestBody,{onSuccess:})
  }; */
  return {isLoading, mutate, isError, data};
};

export default useVerifyCode;
