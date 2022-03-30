import React, {useEffect, useState} from 'react';
import reactotron from 'reactotron-react-native';
import {OnOPtionPressedParameter} from '../../interfaces';
import {getPriceOption} from '../../utils';

interface Props {
  children: React.ReactNode;
}
interface OptionPriceInfoType {
  [key: string]: {
    price: string;
    type: string;
    id: string;
  };
}
type selectedOptionsType = {[key: string]: string[]};
type contextTypes = {
  selectedOptions: selectedOptionsType;
  onItemPressed: (params: OnOPtionPressedParameter) => void;
  resetSelectedOptions: () => void;
  optionPriceInfo: OptionPriceInfoType;
  setquantity: React.Dispatch<React.SetStateAction<number>>;
  quantity: number;
  setprice: React.Dispatch<React.SetStateAction<string>>;
  price: string;
  resetState: () => void;
  setSelectedOptions: React.Dispatch<React.SetStateAction<selectedOptionsType>>;
};

export const ProductContext = React.createContext<contextTypes>(
  {} as contextTypes,
);
const ProductProvider = ({children}: Props) => {
  const [
    selectedOptions,
    setSelectedOptions,
  ] = React.useState<selectedOptionsType>({} as selectedOptionsType);
  const [optionPriceInfo, setOptionPriceInfo] = useState<
    OptionPriceInfoType | {}
  >({} as OptionPriceInfoType);
  const [quantity, setquantity] = useState<number>(1);
  const [price, setprice] = useState<string>('');

  function removeItem<T>(arr: Array<T>, value: T): Array<T> {
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
  // useEffect(() => {
  //   setprice(prev=>prev*quantity)

  // }, [quantity])

  const onItemPressed = ({
    item,
    title,
    type,
    prefix,
    price: optionPrice,
  }: OnOPtionPressedParameter) => {
    setOptionPriceInfo(prev => {
      if (type !== 'checkbox') {
        let newCheck =
          String(optionPriceInfo[title]?.id) === item
            ? {...prev, [title]: undefined}
            : {
                ...prev,
                [title]: {id: item, price: optionPrice, type},
              };
        return newCheck;
      }
      return {...prev};
    });

    setSelectedOptions(prev => {
      let previous: string[] = prev[title]?.includes(item)
        ? removeItem([...prev[title]], item)
        : prev[title]?.length && type === 'checkbox'
        ? [...prev[title], item]
        : [item];
      return {
        ...prev,
        [title]: previous.filter(Boolean),
      };
    });
    setprice(prev => {
      const checkboxSelected = selectedOptions[title]?.includes(item);
      const radioSelected = optionPriceInfo[title]?.id === item;
      const preRadioSelectedPrice = optionPriceInfo[title]?.price;
      console.log({radioSelected});

      let newPrice =
        type === 'checkbox' && !checkboxSelected
          ? getPriceOption(prev, optionPrice, prefix)
          : type === 'checkbox' && checkboxSelected
          ? getPriceOption(`${+prev - +optionPrice}`, `${0}`, prefix)
          : type !== 'checkbox' && radioSelected
          ? getPriceOption(
              `${
                preRadioSelectedPrice ? +prev - +preRadioSelectedPrice : prev
              }`,
              `${0}`,
              prefix,
            )
          : getPriceOption(
              `${
                preRadioSelectedPrice ? +prev - +preRadioSelectedPrice : prev
              }`,
              optionPrice,
              prefix,
            );

      return newPrice;
    });
  };
  const resetState = () => {
    setOptionPriceInfo({});
    setSelectedOptions({});
    setprice('');
  };
  const resetSelectedOptions = () => setSelectedOptions({});
  return (
    <ProductContext.Provider
      value={{
        selectedOptions,
        onItemPressed,
        resetSelectedOptions,
        optionPriceInfo,
        quantity,
        setquantity,
        price,
        setprice,
        resetState,
        setSelectedOptions,
      }}>
      {children}
    </ProductContext.Provider>
  );
};

export {ProductProvider};

// let newPrice= type === 'checkbox' && !selectedOptions[title]?.includes(item)
// ? getPriceOption(prev, optionPrice, prefix, )
// : type === 'checkbox' && selectedOptions[title]?.includes(item)
// ? getPriceOption(+prev - +optionPrice, 0, prefix )
// : String(optionPriceInfo.[title]?.id) === item && type !== 'checkbox'
// ? getPriceOption(
//     +prev - +optionPriceInfo[title]?.price,
//     0,
//     prefix,

//   )
// : 0/* getPriceOption(
//     String(optionPriceInfo[title]?.id) === item
//       ? +prev - +optionPriceInfo[title]?.price || prev
//       : prev,
//     optionPrice,
//     prefix,
//   ) */;
