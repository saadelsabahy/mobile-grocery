import {StyleSheet} from 'react-native';
import COLORS from './colors';
import {calcFont, SCREEN_HEIGHT, SCREEN_WIDTH} from './sizes';
const styles = StyleSheet.create({
  screensContainer: {
    flex: 1,
    //alignSelf: 'center',
    //width: SCREEN_WIDTH - calcFont(20),
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
  },
  helperText: {
    marginStart: 0,
    paddingStart: 0,
    fontSize: calcFont(14),
    marginTop: 0,
    marginBottom: 0,
    textTransform: 'capitalize',
  },
  deleteBorderRadius: {
    borderRadius: 0,
    backgroundColor: COLORS.MAINCOLOR,
  },
  whiteText: {
    color: COLORS.WHITE,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.GRAY_LIGHT,
  },
  paginationLoaderStyle: {
    paddingVertical: calcFont(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterAccordionHeader: {
    /*    width: SCREEN_WIDTH / 3,
    height: SCREEN_HEIGHT / 15,
    paddingVertical: 0,
    backgroundColor: COLORS.WHITE, */
  },
  authButtonWithArrow: {
    width: SCREEN_WIDTH / 4,
    height: SCREEN_HEIGHT / 11,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.MAINCOLOR,
  },
  counterInput: {
    textTransform: 'capitalize',
    paddingHorizontal: 0,
    fontFamily: 'Cairo-Regular',
    flex: 1,
    textAlign: 'center',
    height: '100%',
    justifyContent: 'center',
    paddingBottom: 0,
    paddingTop: 0,
  },
  increaseDecreaseContainerNonCircular: {
    borderWidth: 0.4,
    borderColor: COLORS.MOCK_BG_GRAY,
    backgroundColor: COLORS.WHITE,
  },
  twoCoulmsProductCard: {
    marginHorizontal: calcFont(10),
    marginVertical: calcFont(7),
    //width: SCREEN_WIDTH / 2 - 8,
  },
  emptyStatusContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
