import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {I18nManager, StyleSheet, Text, View} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../constants/style';
import {SCREEN_WIDTH} from '../../../constants/style/sizes';
import {AuthenticationContext, FavouritesContext} from '../../../contexts';

interface Props {
  onSharePressed: () => void;
  id: string;
}

const ProductHeader = ({onSharePressed, id}: Props) => {
  const navigation = useNavigation();
  const {
    colors: {primary},
  } = useTheme();
  const {favourites, addToFavourites, removeFromFavourites} = useContext(
    FavouritesContext,
  );
  const {
    state: {userToken},
  } = useContext(AuthenticationContext);
  const favouritesProductsIds = [
    ...new Set(favourites?.map(item => item.product_id)),
  ];
  const liked = favouritesProductsIds.includes(id);

  const goBack = () => navigation.goBack();

  const onAddToFavouritePressed = () => {
    if (userToken) {
      liked ? removeFromFavourites(id) : addToFavourites(id);
    } else {
      navigation.navigate('Auth', {screen: 'Login'});
    }
  };
  return (
    <View style={[styles.topIconsContainer]}>
      <IconButton
        icon={I18nManager.isRTL ? 'chevron-right' : 'chevron-left'}
        size={30}
        color={COLORS.WHITE}
        style={styles.iconButton}
        onPress={goBack}
      />
      <View>
        <IconButton
          icon={props => <Ionicons name={'ios-share-outline'} {...props} />}
          size={25}
          color={COLORS.WHITE}
          onPress={onSharePressed}
          //style={{backgroundColor: COLORS.GRAY_LIGHT}}
        />
        <IconButton
          //style={{backgroundColor: COLORS.GRAY_LIGHT}}
          icon={'heart'}
          size={25}
          color={liked ? primary : COLORS.WHITE}
          onPress={onAddToFavouritePressed}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topIconsContainer: {
    width: SCREEN_WIDTH,
    position: 'absolute',
    top: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    marginStart: 4,
    paddingHorizontal: 0,
    paddingStart: 0,
    marginHorizontal: 0,
    // backgroundColor: COLORS.GRAY_LIGHT,
  },
});

export {ProductHeader};
