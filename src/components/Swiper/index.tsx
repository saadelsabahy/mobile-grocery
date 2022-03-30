import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useTheme} from 'react-native-paper';
import Swiper from 'react-native-swiper';
import {COLORS} from '../../constants/style';
import {calcFont, calcWidth} from '../../constants/style/sizes';

interface swiperImage {
  imagelinkType?: string;
  imagelinkId?: string;
  slideimage: string;
}

interface props {
  height?: string;
  showButtons?: boolean;
  showsPagination?: boolean;
  onImagePressed: (image: swiperImage) => void;
  images: swiperImage[];
  product?: boolean;
}
const CustomSwiper = ({
  showButtons,
  showsPagination,
  onImagePressed,
  images = [],
  product,
}: props) => {
  const {
    colors: {primary},
  } = useTheme();
  return (
    <Swiper
      autoplay
      loop
      autoplayTimeout={4}
      removeClippedSubviews={false}
      showsPagination={showsPagination}
      dot={
        <View
          style={[
            styles.dot,
            {backgroundColor: primary},
            // {width: images.length > 3 ? 5 : 50, borderRadius: 5 / 2, height: 5},
            ,
          ]}
        />
      }
      activeDot={
        <View
          style={[
            styles.activeDot,
            {backgroundColor: primary},
            // {width: images.length > 3 ? 5 : 50, borderRadius: 5 / 2, height: 5},
            ,
          ]}
        />
      }
      //loadMinimal={true}
      showsButtons={showButtons}
      containerStyle={
        showsPagination
          ? styles.containerWithpagination
          : styles.containerWithoutPagination
      }
      contentContainerStyle={{backgroundColor: 'red'}}
      paginationStyle={{
        bottom: -0.15,
        //flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        //position: 'absolute',
      }}>
      {images.map((image, index) => {
        return (
          <Pressable
            onPress={() => onImagePressed(image)}
            style={[
              styles.slide,
              {
                height: showsPagination ? '85%' : '100%',
                borderRadius: showsPagination ? calcFont(8) : 0,
                overflow: 'hidden',
                backgroundColor: product ? COLORS.WHITE : 'transparent',
              },
            ]}
            key={image.imagelinkId || `${image}${index}`}>
            <FastImage
              style={styles.image}
              source={{
                uri: image.slideimage,
              }}
              resizeMode={
                /* product
                  ? FastImage.resizeMode.contain
                  :  */ FastImage
                  .resizeMode.contain
              }
            />
          </Pressable>
        );
      })}
    </Swiper>
  );
};
const styles = StyleSheet.create({
  containerWithpagination: {
    width: calcWidth(344),
    height: calcFont(200),
    borderRadius: calcFont(8),
    overflow: 'hidden',
  },
  containerWithoutPagination: {
    width: calcWidth(335),
    height: calcFont(156),
    borderRadius: calcFont(0),
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  slide: {
    width: '100%',
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',

    //backgroundColor: COLORS.MAINCOLOR,
  },
  activeDot: {
    width: calcWidth(20),
    height: calcFont(4),
    borderRadius: calcFont(40),
    marginEnd: calcFont(23),
  },
  dot: {
    width: calcWidth(20),
    height: calcFont(4),
    opacity: 0.2,
    borderRadius: calcFont(40),
    marginEnd: calcFont(23),
  },
});

export {CustomSwiper};
