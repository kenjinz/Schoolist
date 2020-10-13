import React, {useState} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Animated,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {BaseColor, Images, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  ProfileGroup,
  Tag,
  Card,
  Image,
  CommentItem,
} from '@components';
import {ReviewData} from '@data';
import {TabView, TabBar} from 'react-native-tab-view';
import {useTranslation} from 'react-i18next';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import * as Utils from '@utils';
import styles from './styles';

export default function EventDetail({navigation}) {
  const deltaY = new Animated.Value(0);
  const heightImageBanner = Utils.scaleWithPixel(250, 1);
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'general', title: t('general')},
    {key: 'ratings', title: t('ratings')},
    {key: 'comment', title: t('comment')},
  ]);
  const [ratings] = useState([
    {key: '1', title: 'Thông số 1', point: 1, textRating: 'Bad'},
    {key: '2', title: 'Thông số 2', point: 2, textRating: 'Bad'},
    {key: '3', title: 'Thông số 3', point: 3, textRating: 'Bad'},
    {key: '4', title: 'Thông số 4', point: 4, textRating: 'Bad'},
    {key: '5', title: 'Thông số 5', point: 5, textRating: 'Average'},
    {key: '6', title: 'Thông số 6', point: 6, textRating: 'Average'},
    {key: '7', title: 'Thông số 7', point: 7, textRating: 'Good'},
    {key: '8', title: 'Thông số 8', point: 8, textRating: 'Good'},
    {key: '9', title: 'Thông số 9', point: 9, textRating: 'Excellent'},
  ]);
  //const [userData] = useState(UserData[0]);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const [region] = useState({
    latitude: 1.352083,
    longitude: 103.819839,
    latitudeDelta: 0.009,
    longitudeDelta: 0.004,
  });
  const handleIndexChange = (index) => setIndex(index);

  // Customize UI tab bar
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={[styles.indicator, {backgroundColor: colors.primary}]}
      style={[styles.tabbar, {backgroundColor: colors.background}]}
      tabStyle={styles.tab}
      inactiveColor={BaseColor.grayColor}
      activeColor={colors.text}
      renderLabel={({route, focused, color}) => (
        <View style={{flex: 1, width: 130, alignItems: 'center'}}>
          <Text headline semibold={focused} style={{color}}>
            {route.title}
          </Text>
        </View>
      )}
    />
  );

  // Render correct screen container when tab is activated
  const renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'general':
        return (
          <View
            style={{
              paddingHorizontal: 20,
              marginBottom: 20,
            }}>
            <Text
              title3
              semibold
              grayColor
              style={{marginTop: 10, marginBottom: 10}}>
              {t('place')}
            </Text>
            <View
              style={{
                height: 180,
              }}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={region}
                onRegionChange={() => {}}>
                <Marker
                  coordinate={{
                    latitude: 1.352083,
                    longitude: 103.819839,
                  }}
                />
              </MapView>
            </View>
            <Text body2 semibold style={{marginTop: 20, marginBottom: 10}}>
              {t('description')}
            </Text>
            <Text body2 grayColor lineHeight={20}>
              Desertscene, in association with X-Ray Touring, proudly presents:
              The return of TRUCKFIGHETERS Playing 'Gravity X' from finish to
              start. Plus special guests Swan Valley Heights Desertscene, in
              association with X-Ray Touring, proudly presents: The return of
              TRUCKFIGHETERS Playing 'Gravity X' from finish to start. Plus
              special guests Swan Valley Heights Desertscene, in association
              with X-Ray Touring, proudly presents: The return of TRUCKFIGHETERS
              Playing 'Gravity X' from finish to start. Plus special guests Swan
              Valley Heights Desertscene, in association with X-Ray Touring,
              proudly presents: The return of TRUCKFIGHETERS Playing 'Gravity X'
              from finish to start. Plus special guests Swan Valley Heights
              Desertscene, in association with X-Ray Touring, proudly presents:
              The return of TRUCKFIGHETERS Playing 'Gravity X' from finish to
              start. Plus spudly presents: The return of TRUCKFIGHETERS Playing
              'Gravity X' from finish to start. Plus special guests Swan Valley
              Heights Desertscene, in association with X-Ray Touring, proudly
              presents: The return of TRUCKFIGHETERS Playing 'Gravity X' from
              finish to start. Plus special guests Swan Valley Heights
              Desertscene, in association with X-Ray Touring, proudly presents:
              The return of TRUCKFIGHETERS Playing 'Gravity X' from finish to
              start. Plus special guests Swan Valley Heights
            </Text>
          </View>
        );
      case 'ratings':
        return (
          <RatingTab
            ratings={ratings}
            jumpTo={jumpTo}
            navigation={navigation}
          />
        );
      case 'comment':
        return <CommentTab jumpTo={jumpTo} navigation={navigation} />;
    }
  };

  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={[
          styles.imgBanner,
          {
            height: deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(140),
                Utils.scaleWithPixel(140),
              ],
              outputRange: [heightImageBanner, heightHeader, heightHeader],
            }),
          },
        ]}>
        <Image source={Images.event1} style={{flex: 1}} />
        <Animated.View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            paddingHorizontal: 20,
            width: '100%',
            bottom: 15,
            opacity: deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(140),
                Utils.scaleWithPixel(140),
              ],
              outputRange: [1, 0, 0],
            }),
          }}>
          <View style={styles.rowBanner}>
            <View style={{alignItems: 'flex-start'}}>
              <Text headline semibold whiteColor>
                Trường đại học bách khoa
              </Text>
              <Text footnote whiteColor>
                {`123 ${t('people_like_this')}`}
              </Text>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
      <SafeAreaView style={{flex: 1}} forceInset={{top: 'always'}}>
        {/* Header */}
        <Header
          title=""
          renderLeft={() => {
            return (
              <Icon
                name="arrow-left"
                size={20}
                color={BaseColor.whiteColor}
                enableRTL={true}
              />
            );
          }}
          renderRight={() => {
            return <Icon name="images" size={20} whiteColor />;
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          onPressRight={() => {
            navigation.navigate('PreviewImage');
          }}
        />
        <ScrollView
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {y: deltaY},
              },
            },
          ])}
          onContentSizeChange={() => {
            setHeightHeader(Utils.heightHeader());
          }}
          scrollEventThrottle={8}>
          <View style={{height: 255 - heightHeader}} />
          <View
            style={{
              paddingHorizontal: 20,
            }}>
            <Text title1 semibold numberOfLines={2} style={{marginBottom: 10}}>
              Trường Đại học bách khoa Đà Nẵng
            </Text>
            <ProfileGroup
              name={`123 ${t('people_like_this')}`}
              users={[
                {image: Images.profile1},
                {image: Images.profile3},
                {image: Images.profile4},
              ]}
            />
          </View>
          <View style={{flex: 1}}>
            <TabView
              lazy
              navigationState={{ratings, index, routes}}
              renderScene={renderScene}
              renderTabBar={renderTabBar}
              onIndexChange={handleIndexChange}
            />
          </View>
        </ScrollView>
        {/* Pricing & Booking Process */}
      </SafeAreaView>
    </View>
  );
}
function RatingTab({ratings}) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  // Check SimpleView or GeneralView - True: Simple
  const [checkView, setCheckView] = useState(true);
  return checkView ? (
    <ScrollView>
      <View style={{paddingHorizontal: 30, marginTop: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Tag primary style={{width: 110}}>
            <Icon
              name={'filter'}
              size={15}
              color={BaseColor.whiteColor}
              solid
            />
            {t('filteringRating')}
          </Tag>
          <TouchableOpacity onPress={() => setCheckView(!checkView)}>
            <Text footnote grayColor style={{textDecorationLine: 'underline'}}>
              Simple View
            </Text>
          </TouchableOpacity>
        </View>
        {ratings.length > 0
          ? ratings.map((rating) => {
              return (
                <View>
                  <Text headline semibold style={{marginTop: 20}}>
                    {rating.title}
                  </Text>
                  <View style={styles.wrapRating}>
                    <View
                      style={[
                        styles.fillRating,
                        {flex: rating.point, backgroundColor: colors.primary},
                      ]}>
                      <Text
                        style={{
                          color: 'white',
                          textAlignVertical: 'center',
                          textAlign: 'center',
                          fontSize: 15,
                        }}>
                        {rating.textRating}
                      </Text>
                    </View>
                    <View style={{backgroundColor: 'transparent', flex: 1}} />
                  </View>
                </View>
              );
            })
          : null}
      </View>
      <View />
    </ScrollView>
  ) : (
    <ScrollView>
      <View style={{paddingHorizontal: 30, marginTop: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Tag primary style={{width: 110}}>
            <Icon
              name={'filter'}
              size={15}
              color={BaseColor.whiteColor}
              solid
            />
            {t('filteringRating')}
          </Tag>
          <TouchableOpacity onPress={() => setCheckView(!checkView)}>
            <Text footnote grayColor style={{textDecorationLine: 'underline'}}>
              General View
            </Text>
          </TouchableOpacity>
        </View>
        {ratings.length > 0
          ? ratings.map((rating) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text headline semibold grayColor style={{marginTop: 20}}>
                    {rating.title}
                  </Text>
                  <Text headline semibold grayColor style={{marginTop: 20}}>
                    {rating.point}/10
                  </Text>
                </View>
              );
            })
          : null}
      </View>
    </ScrollView>
  );
}
function CommentTab({navigation}) {
  const [refreshing] = useState(false);
  const [rateDetail] = useState({
    point: 4.7,
    maxPoint: 5,
    totalRating: 25,
    data: ['80%', '10%', '10%', '0%', '0%'],
  });
  const [reviewList] = useState(ReviewData);
  const {colors} = useTheme();

  return (
    <FlatList
      contentContainerStyle={{padding: 20}}
      refreshControl={
        <RefreshControl
          colors={[colors.primary]}
          tintColor={colors.primary}
          refreshing={refreshing}
          onRefresh={() => {}}
        />
      }
      data={reviewList}
      keyExtractor={(item, index) => item.id}
      renderItem={({item}) => (
        <CommentItem
          style={{marginTop: 10}}
          image={item.source}
          name={item.name}
          title={item.title}
          comment={item.comment}
        />
      )}
    />
  );
}
