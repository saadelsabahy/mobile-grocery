import React from 'react';
import reactotron from 'reactotron-react-native';

interface Props {
  children: React.ReactNode;
}
type selectedFiltersType = {[title: string]: string};
type contextTypes = {
  selectedFilters: selectedFiltersType;
  onItemPressed: (item: string, title: string) => void;
  resetFilterSection: (id: string) => void;
  resetSelectedFilters: () => void;
};

export const FilterContext = React.createContext<contextTypes>(
  {} as contextTypes,
);
const FilterProvider = ({children}: Props) => {
  const [
    selectedFilters,
    setSelectedFilters,
  ] = React.useState<selectedFiltersType>({} as selectedFiltersType);

  const onItemPressed = (item: string, title: string) => {
    if (selectedFilters[`${title}`] == item) {
      let newState = Object.assign({}, selectedFilters);
      delete newState[`${title}`];

      setSelectedFilters(newState);
    } else {
      setSelectedFilters(prev => ({
        ...prev,
        [`${title}`]: item,
      }));
    }
  };

  const resetSelectedFilters = () => setSelectedFilters({});
  const resetFilterSection = (id: string) => {
    let newState = Object.assign({}, selectedFilters);
    delete newState[id];

    setSelectedFilters(newState);
  };
  return (
    <FilterContext.Provider
      value={{
        selectedFilters,
        onItemPressed,
        resetSelectedFilters,
        resetFilterSection,
      }}>
      {children}
    </FilterContext.Provider>
  );
};

export {FilterProvider};
