import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  Image,
  Text,
  Icon,
  SchoolItem,
  Card,
  Button,
  SafeAreaView,
  EventCard,
} from '@components';
import {BaseStyle, Images, useTheme} from '@config';
import * as Utils from '@utils';
import styles from './styles';
import {TopSchoolData, SchoolData} from '@data';
import {useTranslation} from 'react-i18next';

//Using for check AsyncStorage
import AsyncStorage from '@react-native-community/async-storage';

export default function Home({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const [icons] = useState([
    {
      icon: 'graduation-cap',
      name: 'top_school',
      route: 'TopSchool',
    },
    {
      icon: 'bookmark',
      name: 'top_faculty',
      route: 'topFacultySearch', // Define Screen later
    },
    {
      icon: 'ellipsis-h',
      name: 'more',
      route: 'More',
    },
  ]);
  const [topSchool] = useState(TopSchoolData);

  const [schools] = useState(SchoolData);
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const deltaY = new Animated.Value(0);

  const renderIconService = () => {
    return (
      <FlatList
        data={icons}
        numColumns={4}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.itemService}
              activeOpacity={0.9}
              onPress={() => {
                navigation.navigate(item.route);
              }}>
              <View
                style={[styles.iconContent, {backgroundColor: colors.card}]}>
                <Icon name={item.icon} size={18} color={colors.primary} solid />
              </View>
              <Text footnote grayColor numberOfLines={1}>
                {t(item.name)}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };
  const heightImageBanner = Utils.scaleWithPixel(140);
  const marginTopBanner = heightImageBanner - heightHeader;

  return (
    <View style={{flex: 1}}>
      <Animated.Image
        source={Images.trip3}
        style={[
          styles.imageBackground,
          {
            height: deltaY.interpolate({
              inputRange: [
                0,
                Utils.scaleWithPixel(100),
                Utils.scaleWithPixel(100),
              ],
              outputRange: [heightImageBanner, heightHeader, 0],
            }),
          },
        ]}
      />
      <SafeAreaView style={{flex: 1}} forceInset={{top: 'always'}}>
        <ScrollView
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {y: deltaY},
              },
            },
          ])}
          onContentSizeChange={() => setHeightHeader(Utils.heightHeader())}
          scrollEventThrottle={8}>
          <View style={{paddingHorizontal: 20}}>
            <View
              style={[
                styles.searchForm,
                {
                  marginTop: marginTopBanner,
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  shadowColor: colors.border,
                },
              ]}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Search')}
                activeOpacity={0.9}>
                <View
                  style={[BaseStyle.textInput, {backgroundColor: colors.card}]}>
                  <Text body1 grayColor>
                    {t('')}
                  </Text>
                </View>
              </TouchableOpacity>
              {renderIconService()}
            </View>
          </View>
          {/**
           * Component Top School :
           * Include Slide, Picture and Book Now
           * Data from folder Data
           * OnPress will navigate to some Details
           */}
          <View>
            <Text title3 semibold style={styles.titleView}>
              {t('top_school_in_ur_city')}
            </Text>
            <FlatList
              contentContainerStyle={{paddingLeft: 5, paddingRight: 20}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={topSchool}
              keyExtractor={(item, index) => item.id}
              renderItem={({item, index}) => (
                <Card
                  style={[styles.promotionItem, {marginLeft: 15}]}
                  image={item.image}
                  onPress={() => navigation.navigate('EventDetail')}>
                  <Text subhead whiteColor>
                    {t(item.title1)}
                  </Text>
                  <Text title2 whiteColor semibold>
                    {t(item.title2)}
                  </Text>
                  <View style={styles.contentCartPromotion}>
                    <Button
                      style={styles.btnPromotion}
                      onPress={() => {
                        navigation.navigate('TourDetail');
                      }}>
                      <Text body2 semibold whiteColor>
                        {t('see_school')}
                      </Text>
                    </Button>
                  </View>
                </Card>
              )}
            />
          </View>
          {/* Breaking News */}
          <View style={styles.titleView}>
            <Text title3 semibold style={{textAlign: 'center'}}>
              {t('breaking_news')}
            </Text>
            <Image source={Images.banner1} style={styles.promotionBanner} />
            <View style={[styles.line, {backgroundColor: colors.border}]} />
          </View>
          <FlatList
            columnWrapperStyle={{paddingLeft: 5, paddingRight: 20}}
            numColumns={2}
            data={schools}
            maxToRenderPerBatch={5}
            keyExtractor={(item, index) => item.id}
            renderItem={({item, index}) => (
              <SchoolItem
                grid
                image={item.image}
                name={t(item.name)}
                location={t(item.location)}
                // available={item.available}
                rate={item.rate}
                rateStatus={item.rateStatus}
                numReviews={item.numReviews}
                services={item.services}
                style={{marginLeft: 15, marginBottom: 15}}
                onPress={() => navigation.navigate('HotelDetail')}
              />
            )}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
