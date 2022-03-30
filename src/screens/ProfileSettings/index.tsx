import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CustomHeader} from '../../components';
import {hasNewLogin} from '../../constants/config.constants';
import {COLORS} from '../../constants/style';
import OldPersonalInformation from './OldPersonalInformation';
import PersonalInformation from './PersonalInformation';

//import PersonalInformation from './PersonalInformation';

interface Props {}

const ProfileSettings = ({navigation}: Props) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <CustomHeader title={t('accountScreen:personalInformation')} />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        {hasNewLogin ? <PersonalInformation /> : <OldPersonalInformation />}
      </KeyboardAwareScrollView>
    </View>
  );
};

export {ProfileSettings};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  InfoContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.WHITE,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    justifyContent: 'center',
  },
});
