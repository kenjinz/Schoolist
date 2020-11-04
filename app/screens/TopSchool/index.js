import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  Animated,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Icon, TourItem, FilterSort} from '@components';
import styles from './styles';
import * as Utils from '@utils';
import {useTranslation} from 'react-i18next';
import {TopSchoolData} from '@data';
import {Text} from '@components';

const URL = 'https://api.schoolist.org/universities/top';
export default function TopSchool({navigation}) {
  const [loading, setLoading] = useState(true);
  const [topSchoolsData, setTopSchoolsData] = useState([]);
  useEffect(() => {
    fetch(URL, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        setTopSchoolsData(json.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const {t} = useTranslation();

  const scrollAnim = new Animated.Value(0);
  const offsetAnim = new Animated.Value(0);
  // const clampedScroll = Animated.diffClamp(
  //   Animated.add(
  //     scrollAnim.interpolate({
  //       inputRange: [0, 1],
  //       outputRange: [0, 1],
  //       extrapolateLeft: 'clamp',
  //     }),
  //     offsetAnim,
  //   ),
  //   0,
  //   40,
  // );
  const {colors} = useTheme();

  const [refreshing] = useState(false);
  const [topSchools] = useState(TopSchoolData);
  const onChangeSort = () => {};
  const image = {uri: 'https://picsum.photos/200/300'};
  /**
   * @description Render container view
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @returns
   */
  const renderContent = () => {
    // const navbarTranslate = clampedScroll.interpolate({
    //   inputRange: [0, 40],
    //   outputRange: [0, -40],
    //   extrapolate: 'clamp',
    // });
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            marginTop: 10,
            marginLeft: 40,
            marginRight: 40,
          }}>
          <Text regular caption1 grayColor style={{textAlign: 'center'}}>
            Danh sách dựa trên điểm số đánh giá và số lượng người đánh giá
          </Text>
        </View>
        <Animated.FlatList
          contentContainerStyle={{
            paddingTop: 10,
            paddingHorizontal: 20,
          }}
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollAnim,
                  },
                },
              },
            ],
            {useNativeDriver: true},
          )}
          data={topSchoolsData}
          key={'list'}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({item, index}) => (
            <TourItem
              list
              image={{
                uri: item.mainImage.link.thumbnail,
              }}
              name={t(item.name)}
              //location={item.locations.address}
              location={
                item.locations.length > 1
                  ? item.locations.map((add) => add.address)
                  : item.locations[0].address
              }
              price={item.price}
              //rate={item.rate}
              //durationrateCount={item.rateCount}
              //durationnumReviews={item.numReviews}
              //durationauthor={item.author}
              //services={item.services}
              style={{
                marginBottom: 20,
              }}
              onPress={() => {
                navigation.navigate('TourDetail');
              }}
              onPressBookNow={() => {
                navigation.navigate('PreviewBooking');
              }}
            />
          )}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header
        title={t('top_school_in_ur_city')}
        subTitle={`10 ${t('school')}`}
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={colors.primary}
              enableRTL={true}
            />
          );
        }}
        renderRight={() => {
          return <Icon name="search" size={20} color={colors.primary} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.navigate('SearchHistory');
        }}
      />
      {loading ? <ActivityIndicator /> : renderContent()}
    </SafeAreaView>
  );
}
