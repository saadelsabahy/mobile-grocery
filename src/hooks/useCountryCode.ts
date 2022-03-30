import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import reactotron from 'reactotron-react-native';
import {CountryCode} from '../components/CustomCountryPicker/types';

interface Props {}
type responseType = {city: string; continent: string; countryCode: CountryCode};
const useCountryCode = () => {
  const [locationInfo, setlocationInfo] = useState<responseType>({});
  useEffect(() => {
    getCountryInfo();
    return () => {};
  }, []);

  const getCountryInfo = async () => {
    const {data}: {data: responseType} = await axios.get(
      'https://freegeoip.app/json/',
    );
    setlocationInfo(data);
    //  reactotron.log(data);
  };
  return {locationInfo};
};

export {useCountryCode};
