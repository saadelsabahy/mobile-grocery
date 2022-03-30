import {useNavigation} from '@react-navigation/core';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {
  I18nManager,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {Text} from 'react-native-paper';
import {CustomButton} from '../../../components';
import {calcFont} from '../../../constants/style/sizes';

interface SectionStyle {
  container?: ViewStyle;
  titleContainer?: ViewStyle;
  titleStyle?: TextStyle;
  showAllButton?: ViewStyle;
}
interface SectionProps extends SectionStyle {
  children?: React.ReactElement;
  title?: string;
  contentContainer?: ViewStyle;
  showViewAll?: boolean;
  onViewAllPressed?: () => void;
}

const styles = StyleSheet.create<SectionStyle>({
  container: {
    marginBottom: calcFont(19),
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  titleContainer: {
    paddingVertical: calcFont(7),
    //backgroundColor: COLORS.RATING_GOLD,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingStart: calcFont(16),
    //marginStart: calcFont(16),
  },
  showAllButton: {
    alignSelf: 'flex-end',
    //marginTop: calcFont(12),
    width: 'auto',
    borderRadius: 0,
  },
  titleStyle: {
    fontSize: calcFont(19),
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: -0.52,
    //color: COLORS.SECTION_TITLE,
    // textAlign: I18nManager.isRTL ? 'right' : 'left',
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
  },
});

const Section: React.FC<SectionProps> = ({
  children,
  title,
  container,
  titleContainer,
  titleStyle,
  contentContainer,
  showViewAll,
}): JSX.Element => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const onSeeAllPressed = () => {
    navigation.navigate('Categories');
  };
  return (
    <View style={StyleSheet.compose(styles.container, container)}>
      {!!title && title !== '' && (
        <View style={StyleSheet.compose(styles.titleContainer, titleContainer)}>
          <Text style={StyleSheet.compose(styles.titleStyle, titleStyle)}>
            {title}
          </Text>
          {showViewAll && (
            <CustomButton
              onPress={onSeeAllPressed}
              style={styles.showAllButton}>
              {t('general:viewAll')}
            </CustomButton>
          )}
        </View>
      )}
      {/* {showViewAll && (

    )} */}
      <View style={[contentContainer, {alignItems: 'center'}]}>{children}</View>
    </View>
  );
};

export {Section};
