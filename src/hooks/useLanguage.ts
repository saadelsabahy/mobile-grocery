import React, {useCallback, useContext, useEffect, useState} from 'react';
import {endpoints} from '../constants/apiEndpoints.constants';
import {AuthenticationContext} from '../contexts';
import useAxios from './useAxios';
import {useTranslation} from 'react-i18next';
import reactotron from 'reactotron-react-native';

interface Props {}

const useLanguage = () => {
  const Axios = useAxios();
  const {i18n} = useTranslation();
  const {
    state: {storeToken},
  } = useContext(AuthenticationContext);
  const [selectedLanguage, setselectedLanguage] = useState('');

  useEffect(() => {
    getCurrentLanguage();
    return () => {};
  }, []);
  const getCurrentLanguage = async () => {
    setselectedLanguage(i18n.language);
  };
  const onChageLanguage = useCallback(
    async (language: string) => {
      // const language_code = I18nManager.isRTL ? 'en' : 'ar';
      setselectedLanguage(language);
      try {
        await Axios.post(endpoints.switchLanguage, {
          language_code: language,
          token: storeToken,
        });
        //await AsyncStorage.setItem(FIRST_INSTALL, language);
        await i18n.changeLanguage(language);
      } catch (e) {
        console.log('switch lang error', e);
      }
    },
    [i18n],
  );

  return {onChageLanguage, selectedLanguage};
};

export {useLanguage};
