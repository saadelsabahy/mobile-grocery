import React from 'react';
import {
  Animated,
  FlatList,
  FlatListProps,
  Platform,
  RefreshControl,
  ScrollViewProps,
  StyleSheet,
  View,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {COLORS} from '../../constants/style';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/style/sizes';
// import Animated,{interpolate,multiply} from 'react-native-reanimated';
interface Props extends FlatListProps<any>, ScrollViewProps {
  refresh?: boolean;
  onPullToRefresh: () => void;
}
const viewabilityConfig = {
  minimumViewTime: 3000,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
};
const FlatlistWithCustomScrollIndicator = ({
  onPullToRefresh,
  refresh,
  ...props
}: Props) => {
  const {
    colors: {primary},
  } = useTheme();

  return (
    <View style={[styles.container]}>
      <FlatList
        // showsVerticalScrollIndicator={true}
        contentContainerStyle={{flexGrow: 1}}
        refreshControl={
          <RefreshControl
            refreshing={!!refresh}
            onRefresh={onPullToRefresh}
            tintColor={primary}
            titleColor={primary}
            colors={[primary, primary]}
            enabled
          />
        }
        scrollEventThrottle={100}
        updateCellsBatchingPeriod={1000}
        initialNumToRender={10}
        maxToRenderPerBatch={80}
        //bounces={false}
        onEndReachedThreshold={0.4}
        //overScrollMode="never"
        removeClippedSubviews={true}
        //shouldItemUpdate={shouldItemUpdate}
        //viewabilityConfig={viewabilityConfig}
        //getItemLayout={getItemLayout}
        key={'List'}
        columnWrapperStyle={
          props.numColumns != 2
            ? undefined
            : {
                flex: 1,
                justifyContent: 'space-between',
              }
        }
        //scrollEventThrottle={16}
        // onScroll={Animated.event(
        //   [
        //     {
        //       nativeEvent: {
        //         contentOffset: {y: contentOffset},
        //       },
        //     },
        //   ],
        //   {useNativeDriver: false},
        // )}
        // onContentSizeChange={(_, height) => {
        //   setWholeHeight(height);
        // }}
        // onLayout={(e) => {
        //   setvisibleHeight(e.nativeEvent.layout.height);
        // }}
        getItemLayout={(data, index) => ({
          length: 80,
          offset: 80 * index,
          index,
        })}
        automaticallyAdjustContentInsets={false}
        {...props}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  indicatorContainer: {
    height: '99%',
    width: SCREEN_WIDTH / 30,
    borderRadius: Math.round(SCREEN_WIDTH / 2 + SCREEN_HEIGHT / 2),
    overflow: 'hidden',
    backgroundColor: COLORS.GRAY_LIGHT,
    alignItems: 'center',
    alignSelf: 'center',
    marginStart: 10,
    marginEnd: 5,
  },
});

export {FlatlistWithCustomScrollIndicator};
