import React from 'react';
import {I18nManager, StyleSheet, SwitchProps, View} from 'react-native';
import {List, Switch, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../constants/style';
import {calcFont, calcHeight} from '../../constants/style/sizes';

interface Props {
  title: string;
  description?: string;
  leftIcon: string | JSX.Element;
  onPress: () => void;
  wihSwitch?: boolean;
  switchProps?: SwitchProps;
}

const SettingsItem = ({
  title,
  description,
  leftIcon,
  switchProps,
  wihSwitch,
  onPress,
}: Props) => {
  const {
    colors: {primary},
  } = useTheme();
  return (
    <List.Item
      onPress={onPress}
      title={title}
      description={description}
      left={props => (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {typeof leftIcon === 'string' ? (
            <List.Icon
              {...props}
              icon={() => (
                <Icon
                  color={COLORS.SETTINGS_LIST_ITEM_LEFT}
                  name={leftIcon}
                  size={calcFont(22)}
                />
              )}
              style={styles.leftIcon}
            />
          ) : (
            React.cloneElement(leftIcon, {
              ...props,
              color: COLORS.SETTINGS_LIST_ITEM_LEFT,
              style: styles.leftIcon,
            })
          )}
        </View>
      )}
      right={props => (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginHorizontal: 0,
          }}>
          {wihSwitch ? (
            <Switch color={primary} {...switchProps} />
          ) : (
            <Icon
              {...props}
              style={{marginStart: 0}}
              name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'}
              size={calcFont(22)}
              color={COLORS.HEADER_TEXT}
            />
          )}
        </View>
      )}
      style={styles.container}
      titleStyle={[styles.title]}
      descriptionStyle={[styles.title, {opacity: 0.54, fontSize: calcFont(14)}]}
    />
  );
};

export {SettingsItem};

const styles = StyleSheet.create({
  container: {
    height: calcHeight(65),
    //backgroundColor: 'blue',
    /*  backgroundColor: 'red',
    marginVertical: 2, */
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 0,
    paddingEnd: 0,
  },
  title: {
    color: COLORS.HEADER_TEXT,
    textTransform: 'capitalize',
    fontSize: calcFont(16),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.28,
    //backgroundColor: '#547',
  },
  leftIcon: {
    marginHorizontal: 0,
    width: calcFont(24),
    height: calcFont(24),
    marginEnd: calcFont(20),
  },
});
