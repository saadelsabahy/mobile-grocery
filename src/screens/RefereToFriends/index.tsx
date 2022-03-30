import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View, Linking} from 'react-native';
import {Text} from 'react-native-paper';
import {
  CustomButton,
  CustomHeader,
  CustomInput,
  RefareLink,
} from '../../components';
import {COLORS} from '../../constants/style';
import {calcFont} from '../../constants/style/sizes';
import {RefareScreenIcon} from '../../svgs';
import Share from 'react-native-share';
interface Props {}
const link = `https://ui8.net/76738b`;
const RefereToFriends = (props: Props) => {
  const {t} = useTranslation();

  const onSharePressed = () => {
    const shareOptions = {
      title: 'Check Out this App',
      failOnCancel: false,
      url: link,
      message: 'Check Out this App',
    };
    Share.open(shareOptions)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <CustomHeader title={t('moreScreen:referToFriends')} />
      <View
        style={[
          styles.container,
          {paddingHorizontal: calcFont(20), justifyContent: 'space-between'},
        ]}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            //backgroundColor: 'red',
          }}>
          <RefareScreenIcon style={{alignSelf: 'center'}} />
          <Text style={styles.text}>Refer a friend, Get $10</Text>
          <Text style={[styles.text, {opacity: 0.64, fontSize: calcFont(16)}]}>
            Get $10 in credits when someone sign up using your refer link
          </Text>
          <RefareLink icon={'share'} text={link} />
        </View>
        <View>
          <CustomButton
            style={styles.button}
            mode="contained"
            onPress={() =>
              Linking.openURL(
                `mailto:support@example.com?subject=SendMail&body=${link}`,
              )
            }>
            {t('inputs:email')}
          </CustomButton>
          <CustomButton
            style={styles.button}
            mode="outlined"
            onPress={onSharePressed}>
            {t('general:other')}
          </CustomButton>
        </View>
      </View>
    </View>
  );
};

export {RefereToFriends};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  button: {
    marginBottom: calcFont(16),
  },
  text: {
    //opacity: 0.64,
    fontSize: calcFont(24),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.4,
    textAlign: 'center',
    color: COLORS.HEADER_TEXT,
    // marginVertical: calcFont(16),
  },
});
