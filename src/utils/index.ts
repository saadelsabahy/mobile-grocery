import {InfiniteData} from 'react-query';
import reactotron from 'reactotron-react-native';
import {CartItem, categoriesInterface, Product} from '../interfaces';

export const createCategoriesGridArray = <T extends object[]>(oldarr: T) => {
  const newArr = [];

  for (let i = 0; i <= oldarr.length; i = i % 2 != 0 ? i + 3 : i + 1) {
    if (i == 0 || i % 2 == 0) {
      newArr.push(oldarr[i]);
    } else {
      if (i !== oldarr.length - 1) {
        newArr.push([oldarr[i], oldarr[i + 1], oldarr[i + 2]]);
      } else {
        newArr.push([oldarr[i]]);
      }
    }
  }
  return newArr.filter(x => x);
};

export const removeDublicates = (data: Product[]) => {
  const Ids = [...new Set(data?.map(item => item.product_id))];
  const notRedundency = Ids.map(id =>
    data?.find(order => order.product_id == id),
  );

  return notRedundency;
};
export const removeCategoriesDublicates = (data: categoriesInterface[]) => {
  const Ids = [...new Set(data?.map(item => item.category_id))];
  const notRedundency = Ids.map(id =>
    data?.find(order => order.category_id == id),
  );

  return notRedundency;
};
export const formatNumbers = (num: number) =>
  Math.abs(num) > 999
    ? (Math.sign(num) * Math.round(Math.abs(num) / 100)) / 10 + 'k'
    : Math.sign(num) * Math.abs(num);

export const formatDate = (selectedDate: Date) => {
  reactotron.log(selectedDate);

  return new Date(selectedDate).toJSON().slice(0, 10).replace(/-/g, '-');
};

export const itemQuentityInCart = (
  addedToCart: boolean,
  products: CartItem[],
  id: string,
) =>
  Number(addedToCart) &&
  Number(products?.find((item: CartItem) => item.product_id === id)?.quantity);

export const defaultValuesForDynamicFields = (fields: {name: string}[] = []) =>
  fields.reduce(
    (accumulator, {name}) => ((accumulator[name] = ''), accumulator),
    {},
  );

export function getRegionForCoordinates(points: {
  latitude: number;
  longitude: number;
}) {
  // points should be an array of { latitude: X, longitude: Y }
  console.log('...', {points});

  let minX, maxX, minY, maxY;

  // init first point
  (point => {
    minX = point.latitude;
    maxX = point.latitude;
    minY = point.longitude;
    maxY = point.longitude;
  })(points[0]);

  // calculate rect
  points.map(point => {
    minX = Math.min(minX, point.latitude);
    maxX = Math.max(maxX, point.latitude);
    minY = Math.min(minY, point.longitude);
    maxY = Math.max(maxY, point.longitude);
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const deltaX = maxX - minX;
  const deltaY = maxY - minY;

  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX,
    longitudeDelta: deltaY,
  };
}

export const getRandomString = (length: number) => {
  let randomChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length),
    );
  }
  return result;
};

export const yesterDay = new Date(new Date().setDate(new Date().getDate() - 1));

export const calcDiscount = (priceAfterDiscount: any, price: any) => {
  const afterDiscount = +String(priceAfterDiscount).replace(/[^\w\s]/gi, '');
  const beforeDiscount = +String(price).replace(/[^\w\s]/gi, '');
  return parseInt(`${100 - (afterDiscount / beforeDiscount) * 100}`, 10);
};

export const getPriceOption = (
  price: string,
  optionPrice: string,
  prefix: string,
  //quantity?: number,
): number => {
  let _price: number;
  //console.log({prefix, price, quantity, optionPrice});

  switch (prefix) {
    case '+':
      return +price + +optionPrice;
    case '-':
      return +price - +optionPrice;
    default:
      return +price;
  }
};
