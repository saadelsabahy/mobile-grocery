import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/style';
import {
  calcFont,
  calcHeight,
  calcWidth,
  SCREEN_WIDTH,
} from '../../constants/style/sizes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  swiperContainer: {
    width: SCREEN_WIDTH,
    height: 'auto',
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    paddingVertical: calcFont(10),
  },
  productDetailesContainer: {
    width: calcWidth(341),
    height: calcHeight(130),
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: calcFont(15),
    //backgroundColor: 'red',
  },
  productName: {
    fontSize: calcFont(18),
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: -0.45,
    color: COLORS.HEADER_TEXT,
  },
  priceAndCounterContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: calcFont(20),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0.44,
  },
  priceBeforeDiscount: {
    fontSize: calcFont(15),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0.44,
    color: COLORS.PLACEHOLDER,
    textDecorationLine: 'line-through',
  },
  count: {color: COLORS.HEADER_TEXT, fontSize: calcFont(20)},
  descriptionImage: {
    width: SCREEN_WIDTH - 20,
    height: 200,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 0,
  },
});

export default styles;
