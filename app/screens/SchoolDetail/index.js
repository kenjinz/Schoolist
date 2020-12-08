import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Animated,
  TouchableOpacity,
  RefreshControl,
  useWindowDimensions,
  ActivityIndicator,
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
import Modal from 'react-native-modal';
import {ReviewData} from '@data';
import {TabView, TabBar} from 'react-native-tab-view';
import {useTranslation} from 'react-i18next';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import * as Utils from '@utils';
import styles from './styles';
import HTML from 'react-native-render-html';
import {Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Config} from 'react-native-config';
export default function SchoolDetail({navigation, route}) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const deltaY = new Animated.Value(0);
  const heightImageBanner = Utils.scaleWithPixel(250, 1);
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [universityDetail, setUniversityDetail] = useState();
  const [criteria, setCriteria] = useState([]);

  const id = route.params.id;
  const getUniversities = async () => {
    try {
      const res = await fetch(`${Config.API_URL}/universities/${id}`, {
        method: 'GET',
      });
      const universities = await res.json();
      setUniversityDetail(universities);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const getCriteria = async () => {
    try {
      const res = await fetch(`${Config.API_URL}/universities/${id}/criteria`, {
        method: 'GET',
      });
      const json = await res.json();
      setCriteria(json.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUniversities();
    getCriteria();
  }, []);
  const [routes] = useState([
    {key: 'general', title: t('general')},
    {key: 'ratings', title: t('ratings')},
    {key: 'comment', title: t('comment')},
  ]);
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
      tabStyle={[styles.tab]}
      inactiveColor={BaseColor.grayColor}
      activeColor={colors.text}
      renderLabel={({route, focused, color}) => (
        <View style={{flex: 1, width: 100, alignItems: 'center'}}>
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
          <GeneralTab
            t={t}
            region={region}
            universityDetail={universityDetail}
            jumpTo={jumpTo}
            navigation={navigation}
          />
        );
      case 'ratings':
        return (
          <RatingTab
            auth={auth}
            universityId={id}
            criteria={criteria}
            jumpTo={jumpTo}
            navigation={navigation}
          />
        );
      case 'comment':
        return <CommentTab jumpTo={jumpTo} navigation={navigation} />;
    }
  };

  return loading ? (
    <ActivityIndicator />
  ) : (
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
        <Image
          source={{uri: universityDetail.mainImage.link.origin}}
          style={{flex: 1}}
        />
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
                {universityDetail.name}
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
          style={{flex: 1}}
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
              {universityDetail.name}
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
          <View>
            <TabView
              lazy
              navigationState={{
                region,
                universityDetail,
                index,
                routes,
              }}
              renderScene={renderScene}
              renderTabBar={renderTabBar}
              onIndexChange={handleIndexChange}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
function GeneralTab({t, region, universityDetail}) {
  const regex1 = /max-height: 400px;/gi;
  const regex2 = /--aspect-ratio:16\/9;/gi;
  return (
    <View
      style={{
        paddingHorizontal: 20,
        marginBottom: 20,
      }}>
      <Text title3 semibold grayColor style={{marginTop: 10, marginBottom: 10}}>
        {t('place')}
      </Text>
      <View
        style={{
          height: 200,
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
      <View>
        <Text body2 semibold style={{marginTop: 20, marginBottom: 10}}>
          {t('description')}
        </Text>
        <View>
          <HTML
            html={universityDetail.description
              .replace(regex1, '')
              .replace(regex2, '')}
            imagesMaxWidth={Dimensions.get('window').width}
          />
        </View>
      </View>
    </View>
  );
}
function RatingTab({universityId, criteria, navigation, auth}) {
  const {colors} = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const {t} = useTranslation();
  // Check SimpleView or GeneralView - True: Simple
  const [checkView, setCheckView] = useState(true);
  return checkView ? (
    <ScrollView>
      <View style={{paddingHorizontal: 30, marginTop: 20}}>
        <View
          style={{
            flex: 1,
            height: 35,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '40%',
              flexDirection: 'row',
            }}>
            <Tag primary style={{flex: 1}}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name={'filter'}
                  size={15}
                  color={BaseColor.whiteColor}
                  solid
                  style={{alignItems: 'flex-start'}}
                />
                <Text whiteColor semibold style={{marginLeft: 5}}>
                  {t('filteringRating')}
                </Text>
              </View>
            </Tag>
          </View>
          <View
            style={{
              width: '40%',
              flexDirection: 'row',
            }}>
            <Tag
              primary
              style={{flex: 1}}
              onPress={() => {
                if (auth) {
                  navigation.navigate('ReviewSchool', {universityId});
                } else {
                  setIsVisible(true);
                }
              }}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name={'star'}
                  size={15}
                  color={BaseColor.whiteColor}
                  solid
                  style={{alignItems: 'flex-start'}}
                />
                <Text whiteColor semibold style={{marginLeft: 5}}>
                  Review
                </Text>
              </View>
            </Tag>
            <Modal
              testID={'modal'}
              isVisible={isVisible}
              backdropOpacity={0.2}
              onBackdropPress={() => setIsVisible(false)}
              // swipeDirection={['up', 'left', 'right', 'down']}
              style={styles.view}>
              <View style={styles.majorModalWrapper}>
                <View style={styles.majorModal}>
                  <Text
                    title3
                    style={{
                      borderBottomWidth: 1,
                      paddingBottom: 10,
                      borderBottomColor: colors.border,
                    }}>
                    Should Login Before Review
                  </Text>
                </View>
              </View>
            </Modal>
          </View>
        </View>
        <View style={{marginTop: 20, alignItems: 'center'}}>
          <TouchableOpacity onPress={() => setCheckView(!checkView)}>
            <Text body1 semibold style={{textDecorationLine: 'underline'}}>
              Simple View
            </Text>
          </TouchableOpacity>
        </View>
        {criteria.length > 0
          ? criteria.map((cri) => {
              const rating = cri.average;
              // Bad (< 0.4) - Average (0.4 - 0.55) - Good (0.55 - 0.85) - Excellent(> 0.85)
              let ratingAttr = {
                backgroundColor: '',
                text: '',
              };
              if (rating < 0.4) {
                if (rating < 0.08) {
                  ratingAttr = {
                    backgroundColor: 'red',
                    text: '',
                  };
                } else {
                  ratingAttr = {
                    backgroundColor: 'red',
                    text: 'Bad',
                  };
                }
              } else if (rating < 0.55) {
                ratingAttr = {
                  backgroundColor: 'orange',
                  text: 'Average',
                };
              } else if (rating < 0.85) {
                ratingAttr = {
                  backgroundColor: 'green',
                  text: 'Good',
                };
              } else {
                ratingAttr = {
                  backgroundColor: 'blue',
                  text: 'Excellent',
                };
              }
              return (
                <View>
                  <Text headline semibold style={{marginTop: 20}}>
                    {cri.name}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('CriteriaComments', {
                        universityId,
                        criteria_id: cri.id,
                        name: cri.name,
                        maxPoint: cri.max,
                        point: cri.average * cri.max,
                      })
                    }>
                    <View style={styles.wrapRating}>
                      <View
                        style={[
                          styles.fillRating,
                          {
                            flex: rating,
                            backgroundColor: ratingAttr.backgroundColor,
                          },
                        ]}>
                        <Text
                          style={{
                            color: 'white',
                            textAlignVertical: 'center',
                            textAlign: 'center',
                            fontSize: 15,
                          }}>
                          {ratingAttr.text}
                        </Text>
                      </View>
                      <View
                        style={{
                          backgroundColor: 'transparent',
                          flex: 1 - rating,
                        }}
                      />
                    </View>
                  </TouchableOpacity>
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
            flex: 1,
            height: 35,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '40%',
              flexDirection: 'row',
            }}>
            <Tag primary style={{flex: 1}}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name={'filter'}
                  size={15}
                  color={BaseColor.whiteColor}
                  solid
                  style={{alignItems: 'flex-start'}}
                />
                <Text whiteColor semibold style={{marginLeft: 5}}>
                  {t('filteringRating')}
                </Text>
              </View>
            </Tag>
          </View>
          <View
            style={{
              width: '40%',
              flexDirection: 'row',
            }}>
            <Tag
              primary
              style={{flex: 1}}
              onPress={() => navigation.navigate('ReviewSchool')}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name={'star'}
                  size={15}
                  color={BaseColor.whiteColor}
                  solid
                  style={{alignItems: 'flex-start'}}
                />
                <Text whiteColor semibold style={{marginLeft: 5}}>
                  Review
                </Text>
              </View>
            </Tag>
          </View>
        </View>
        <View style={{marginTop: 20, alignItems: 'center'}}>
          <TouchableOpacity onPress={() => setCheckView(!checkView)}>
            <Text body1 semibold style={{textDecorationLine: 'underline'}}>
              GeneralView
            </Text>
          </TouchableOpacity>
        </View>
        {criteria.length > 0
          ? criteria.map((cri) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('CriteriaComments', {
                      universityId,
                      criteria_id: cri.id,
                      name: cri.name,
                      maxPoint: cri.max,
                      point: cri.average * cri.max,
                    })
                  }>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text headline semibold grayColor style={{marginTop: 20}}>
                      {cri.name}
                    </Text>
                    <Text headline semibold grayColor style={{marginTop: 20}}>
                      {Math.round(cri.average * cri.max * 100) / 100}/{cri.max}
                    </Text>
                  </View>
                </TouchableOpacity>
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
