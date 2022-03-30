import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
interface Props {}

const useRecentSearch = () => {
  const [clearRecentLoading, setclearRecentLoading] = useState(false);
  const [recentSearch, setrecentSearch] = useState<string[]>([]);

  useEffect(() => {
    getRecentSearch();
    return () => {};
  }, [recentSearch.length]);
  const clearRecent = async () => {
    setclearRecentLoading(true);
    await AsyncStorage.removeItem('recentSearch');
    getRecentSearch();
    setclearRecentLoading(false);
  };
  const getRecentSearch = async () => {
    const search = await AsyncStorage.getItem('recentSearch');
    console.log({search});

    setrecentSearch(search ? await JSON.parse(search) : []);
  };

  const setRecentSearch = async (item: string) => {
    console.log('add recent', item);

    setrecentSearch((prev) => [...prev, item]);
    await AsyncStorage.setItem(
      'recentSearch',
      JSON.stringify([...recentSearch, item]),
    );
  };

  return {
    clearRecentLoading,
    clearRecent,
    setRecentSearch,
    recentSearch: recentSearch.filter(Boolean),
  };
};

export default useRecentSearch;
