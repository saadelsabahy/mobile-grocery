import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, View} from 'react-native';
import {Button, List, Text} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {calcFont, calcHeight} from '../../constants/style/sizes';
import {CustomButton} from '../CustomButton';

interface Props {
  onSearchItemPressed: (item: string) => void;
  onClearPressed: () => void;
  data: string[];
}
const mockRecent = ['hello', 'hello', 'hello', 'hello'];
const RecentSearchesList = ({
  onSearchItemPressed,
  data,
  onClearPressed,
}: Props) => {
  const {t} = useTranslation();
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item, index}) => {
          return (
            <List.Item
              title={item}
              onPress={() => onSearchItemPressed(item)}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={'magnify'}
                  style={styles.leftIcon}
                  color={COLORS.PLACEHOLDER}
                />
              )}
              style={styles.listItem}
              titleStyle={styles.listItemTitle}
              titleNumberOfLines={2}
            />
          );
        }}
        ListHeaderComponent={
          !!data.length ? (
            <View style={styles.topHeaderRow}>
              <Text style={styles.recentSearch}>
                {t('homeScreen:recentSearches')}
              </Text>
              <Button
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 3,
                }}
                onPress={onClearPressed}
                compact
                labelStyle={[
                  styles.recentSearch,
                  {
                    color: COLORS.HEADER_TEXT,
                    fontSize: calcFont(12),
                    margin: 0,
                    marginVertical: 0,
                    marginHorizontal: 0,
                  },
                ]}>
                {t('general:clearAll')}
              </Button>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export {RecentSearchesList};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: calcFont(20),
  },
  leftIcon: {
    //backgroundColor: 'blue',
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginVertical: 0,
    height: 'auto',
  },
  listItem: {
    // backgroundColor: 'red',
    height: 'auto',
    paddingVertical: 0,
    overflow: 'hidden',
  },
  topHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: calcFont(20),
    //backgroundColor: 'red',
  },
  recentSearch: {
    fontSize: calcFont(16),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0.6,
    color: COLORS.PLACEHOLDER,
    textTransform: 'uppercase',
    textAlignVertical: 'center',
  },
  listItemTitle: {
    fontSize: calcFont(16),
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.28,
    color: COLORS.HEADER_TEXT,
  },
});
