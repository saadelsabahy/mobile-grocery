/* eslint-disable react-hooks/exhaustive-deps */
import {useCallback} from 'react';
import {useMutation} from 'react-query';
import {endpoints} from '../../constants/apiEndpoints.constants';
import useAxios from '../../hooks/useAxios';
import {AddressFieldType} from '../../interfaces';

interface Props {}

const useRequests = () => {
  const Axios = useAxios(true);

  const getAddressFields = useCallback(async () => {
    const {
      data: {fields},
    }: {data: {fields: AddressFieldType[]}} = await Axios.post(
      endpoints.getAddressFields,
    );
    return fields;
  }, []);

  const getRegions = useCallback(async (country_id: number) => {
    const {
      data: {
        data: {zone},
      },
    }: {
      data: {data: {zone: {name: string; zone_id: number}[]}};
    } = await Axios.post(endpoints.getRegionList, {country_id});
    return zone;
  }, []);
  const getCities = useCallback(async (zone_id: number) => {
    const {
      data: {
        data: {area},
      },
    }: {
      data: {data: {area: {name: string; area_id: number}[]}};
    } = await Axios.post(endpoints.getCitiesList, {zone_id});
    return area;
  }, []);
  const addAddress = useCallback(async (body: any) => {
    const {data} = await Axios.post(endpoints.addAddress, {...body});
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
    getAddressFields,
    regionsList,
    getRegionsMutate,
    citiesList,
    getCitiesMutate,
    addAddress,
  };
};

export default useRequests;
