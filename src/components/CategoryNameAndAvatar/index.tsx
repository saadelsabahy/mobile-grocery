import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Avatar, Text, useTheme} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {calcFont, calcHeight, calcWidth} from '../../constants/style/sizes';
import {CustomText} from '../customText';
interface Props {
  name: string;
  avatar: string;
  item?: any;
  onItemPressed?: (item?: any) => void;
  size?: number;
  nameWidth?: number;
  circullar?: boolean;
}

const CategoryNameAndAvatar = ({
  name,
  avatar,
  item,
  size,
  onItemPressed,
  nameWidth,
  circullar,
}: Props) => {
  const theme = useTheme();
  return (
    <Pressable
      style={[
        styles.container,
        {backgroundColor: circullar ? 'transparent' : COLORS.WHITE},
      ]}
      onPress={() => onItemPressed && onItemPressed(item)}>
      {circullar ? (
        <Avatar.Image
          size={size || 65}
          theme={{colors: {primary: COLORS.WHITE}}}
          style={[styles.avatar, {borderColor: theme.colors.primary}]}
          source={{
            uri: avatar,
          }}
        />
      ) : (
        <View style={styles.nonCircularContainer}>
          <FastImage
            source={{uri: avatar}}
            resizeMode={FastImage.resizeMode.cover}
            style={{width: '100%', height: '100%'}}
          />
        </View>
      )}

      {name && (
        <Text numberOfLines={1} style={[styles.text]}>
          {name}
        </Text>
      )}
    </Pressable>
  );
};

export {CategoryNameAndAvatar};

const styles = StyleSheet.create({
  container: {
    width: calcWidth(106),
    marginVertical: calcFont(10),
    marginEnd: calcFont(13),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: calcFont(10),
    // paddingHorizontal: 6,
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,

    // elevation: 3,
  },
  text: {
    fontSize: calcFont(14),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.39,
    textAlign: 'center',
    color: COLORS.SECTION_TITLE,
    marginVertical: calcFont(9),
  },
  avatar: {
    borderStyle: 'solid',
    borderWidth: calcWidth(1),
    resizeMode: 'cover',
    overflow: 'hidden',
    //borderColor: COLORS.MAINCOLOR,
  },
  nonCircularContainer: {
    width: calcFont(106),
    height: calcFont(106),
    borderRadius: calcFont(8),
    overflow: 'hidden',
  },
});
