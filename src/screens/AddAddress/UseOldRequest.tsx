/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import {useCallback} from 'react';
import {useMutation} from 'react-query';
import {endpoints} from '../../constants/apiEndpoints.constants';
import {API_PATH, STORE_URL} from '../../constants/config.constants';
import useAxios from '../../hooks/useAxios';
import {CountryType} from '../../interfaces';

interface AreaType {
  area_id: '1';
  country_id: string;
  zone_id: string;
  name: string;
  status: string;
  code: string;
  locale_name: string;
}

const useOldRequests = () => {
  const Axios = useAxios();

  const getCountries = useCallback(async () => {
    const {
      data: {data},
    }: {data: {data: CountryType[]}} = await axios.get(
      STORE_URL + API_PATH + endpoints.countries,
    );

    return data;
  }, []);

  const getRegions = useCallback(async (country_id: number) => {
    const {
      data: {data},
    }: {
      data: {data: {name: string; zone_id: number}[]};
    } = await Axios.post(`${STORE_URL + API_PATH + endpoints.zones}`, {
      country_id,
    });
    return data;
  }, []);
  const getCities = useCallback(async (zone_id: number) => {
    const {
      data: {areas},
    }: {
      data: {areas: AreaType[]};
    } = await Axios.post(`${STORE_URL + API_PATH + endpoints.areaByZone}`, {
      zone_id,
    });
    return areas;
  }, []);
  const addAddress = useCallback(async (body: any) => {
    const {data} = await Axios.post(endpoints.insertAddress, {...body});
    return data;
  }, []);
  const editAddress = useCallback(async (body: any) => {
    const {data} = await Axios.post(endpoints.editAddress, {...body});
    return data;
  }, []);
  const {data: regionsList, mutate: getRegionsMutate} = useMutation(
    'getRegionsList',
    getRegions,
  );
  const {data: citiesList, mutate: getCitiesMutate} = useMutation(
    'getCitiesList',
    getCities,
  );
  return {
    getCountries,
    regionsList,
    getRegionsMutate,
    citiesList,
    getCitiesMutate,
    addAddress,
    editAddress,
  };
};

export default useOldRequests;
