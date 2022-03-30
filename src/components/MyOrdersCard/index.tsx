import React from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {calcFont, calcHeight, SCREEN_WIDTH} from '../../constants/style/sizes';
import {OrderBag} from '../../svgs';
import {CustomButton} from '../CustomButton';

enum ORDER_STATUS {
  DELIVERED,
  SHIPPED,
  CANCELLED,
  INPROGRESS,
}
interface Props {
  onMyordersCardPressed?: () => void;
  orderStatus?: ORDER_STATUS;
  name: string;
  status?: string;
  orderDate: string;
  onReorderPressed: () => void;
}

const MyordersCard = ({
  onMyordersCardPressed,
  orderStatus = ORDER_STATUS.SHIPPED,
  name,
  status,
  orderDate,
  onReorderPressed,
}: Props) => {
  const {t} = useTranslation();

  return (
    <Pressable style={styles.container} onPress={onMyordersCardPressed}>
      <View style={[styles.imageContainer]}>
        <OrderBag />
      </View>
      <View style={styles.orderDetailesContainer}>
        {/* id */}
        <View style={styles.nameContainer}>
          <Text style={styles.productName} numberOfLines={1}>
            {`${t('myPurchases:orderNumber')} ${name}`}
          </Text>
          <CustomButton
            labelStyle={styles.reorderLabel}
            style={{width: 'auto', borderRadius: 0}}
            icon={'backup-restore'}
            onPress={onReorderPressed}>
            {t('myPurchases:reorder')}
          </CustomButton>
        </View>
        {/* status */}
        {!!status && (
          <View style={styles.statusTextContainer}>
            <Text
              children={status}
              style={{
                color:
                  orderStatus == ORDER_STATUS.CANCELLED
                    ? COLORS.MOCK_BG_RED
                    : orderStatus == ORDER_STATUS.DELIVERED
                    ? COLORS.MAINCOLOR
                    : COLORS.MOCK_BG_YELLOW,
              }}
            />
          </View>
        )}
        {/* date */}
        <Text
          children={orderDate}
          // textStyle={styles.productName}
          numberOfLines={1}
        />
      </View>
    </Pressable>
  );
};

export {MyordersCard};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SCREEN_WIDTH - 20,
    height: calcHeight(140),
    //backgroundColor: COLORS.MOCK_BG_RED,
    marginBottom: calcFont(5),
  },
  imageContainer: {
    width: 'auto',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#048',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //backgroundColor: '#444',
  },
  reorderLabel: {
    // marginHorizontal: calcFont(5),
    // marginVertical: calcFont(2),
    textTransform: 'capitalize',
  },
  orderDetailesContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingStart: calcFont(24),
    //alignItems: 'center',
    //backgroundColor: 'blue',
  },
  statusTextContainer: {
    width: '100%',
    padding: calcFont(3),
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    textTransform: 'capitalize',
  },
});
