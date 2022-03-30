import * as React from 'react';
import {FlatList, FlatListProps, Platform} from 'react-native';
import {calcFont} from '../../../constants/style/sizes';

interface HomeListProps extends FlatListProps<any> {}

const HorizontalList: React.FC<HomeListProps> = (props): JSX.Element => (
  <FlatList
    // style={{width: SCREEN_WIDTH}}
    horizontal
    showsHorizontalScrollIndicator={false}
    initialNumToRender={5}
    maxToRenderPerBatch={5}
    removeClippedSubviews={true}
    // inverted
    {...props}
    contentContainerStyle={[
      props.contentContainerStyle,
      {paddingStart: calcFont(16)},
    ]}
    data={
      props.data && props?.data?.length > 20
        ? props?.data.slice(0, 20)
        : props.data
    }
  />
);

export {HorizontalList};
