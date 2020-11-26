import React, {useEffect, useState}from 'react';
import {View, ScrollView, Animated, TouchableOpacity} from 'react-native';
import {BaseColor, Images} from '@config';
import Config from "react-native-config";
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  ProfileAuthor,
  ProfileGroup,
  Card,
  PostListItem,
} from '@components';
import * as Utils from '@utils';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import moment from 'moment';

export default function PostDetail({navigation, route}) {
  const id = route.params.id;
  const {t} = useTranslation();
  const [loading, setLoading] = useState(true);
  const deltaY = new Animated.Value(0);
  const heightHeader = Utils.heightHeader();
  const heightImageBanner = Utils.scaleWithPixel(250);
  const marginTopBanner = heightImageBanner - heightHeader - 30;
  const [universityDetail, setUniversityDetail] = useState();
  useEffect(() => {
    const URL = Config.API_URL;
    const query = `${URL}posts/${id}`;
    console.log('[query]', query);
    fetch(`${URL}posts/${id}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('HERE: ', json);
        setUniversityDetail(json);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
    // console.log('[HERE]', response);
    // console.log('[URL]', URL);
    // console.log('[id]', id);
  }, []);
  return (
    <View style={{flex: 1}}>
      <Animated.Image
        source={{uri: universityDetail?.mainImage.link.medium}}
        // source={Images.room6}
        style={[
          styles.imgBanner,
          {
            height: deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(195),
                Utils.scaleWithPixel(195),
              ],
              outputRange: [heightImageBanner, heightHeader, heightHeader],
            }),
          },
        ]}
      />
      <SafeAreaView style={{flex: 1}} forceInset={{top: 'always'}}>
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
            return (
              <Icon
                name="bookmark"
                solid
                size={20}
                color={BaseColor.whiteColor}
              />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          onPressRight={() => {}}
        />
        <ScrollView
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {y: deltaY},
              },
            },
          ])}
          scrollEventThrottle={8}>
          <View
            style={{
              paddingHorizontal: 20,
              marginBottom: 20,
              marginTop: marginTopBanner,
            }}>
            <Text headline semibold whiteColor numberOfLines={1}>
              {t('post_title')}
            </Text>
            <ProfileAuthor
              // image={Images.profile2}
              name={universityDetail?.title}
              description={moment(universityDetail?.updatedAt).fromNow()}
              textRight={`Lượt Xem: ${universityDetail.viewCount}`}
              style={{
                marginLeft: -50,
                marginTop: 20,
              }}
            />
            <Text body2>
              {universityDetail?.content}
            </Text>
            <Text
              headline
              semibold
              style={{
                marginTop: 20,
              }}>
              {t('user_following')}
            </Text>
            <ProfileGroup
              name="Steve, Lincoln, Harry"
              detail="and 15 people like this"
              users={[
                {image: Images.profile1},
                {image: Images.profile3},
                {image: Images.profile4},
              ]}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <Text headline semibold>
                {t('top_experiences')}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Post')}>
                <Text footnote grayColor>
                  {t('show_more')}
                </Text>
              </TouchableOpacity>
            </View>
            {/* Image gallery */}
            <View style={styles.contentImageFollowing}>
              <View style={{flex: 4, marginRight: 10}}>
                <Card image={Images.trip7}>
                  <Text headline semibold whiteColor>
                    Dallas
                  </Text>
                </Card>
              </View>
              <View style={{flex: 6}}>
                <View style={{flex: 1}}>
                  <Card image={Images.trip3}>
                    <Text headline semibold whiteColor>
                      Warsaw
                    </Text>
                  </Card>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginTop: 10,
                  }}>
                  <View style={{flex: 6, marginRight: 10}}>
                    <Card image={Images.trip4}>
                      <Text headline semibold whiteColor>
                        Yokohama
                      </Text>
                    </Card>
                  </View>
                  <View style={{flex: 4}}>
                    <Card image={Images.trip6}>
                      <Text headline semibold whiteColor>
                        10+
                      </Text>
                    </Card>
                  </View>
                </View>
              </View>
            </View>
            {/* Featured Posts */}
            <Text
              headline
              semibold
              style={{
                marginTop: 20,
              }}>
              {t('feature_post')}
            </Text>
            <PostListItem
              title="See The Unmatched"
              description="Diffie on Friday announced he had contracted the coronavirus, becoming the first country star to go public with such a diagnosis."
              style={{marginTop: 10, width: '100%'}}
              image={Images.trip9}
              onPress={() => {
                navigation.navigate('Post');
              }}
            />
            <PostListItem
              description="Diffie on Friday announced he had contracted the coronavirus, becoming the first country star to go public with such a diagnosis."
              title="Top 15 Things Must To Do"
              style={{marginTop: 10, width: '100%'}}
              image={Images.trip8}
              onPress={() => {
                navigation.navigate('Post');
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
