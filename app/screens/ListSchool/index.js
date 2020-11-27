import React, {useEffect, useRef, useState} from 'react';
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
import {Text, Button} from '@components';
import {useDispatch, useSelector} from 'react-redux';
import {getListUniversity} from '../../redux/university/actions';
import Modal from 'react-native-modal';
export default function ListSchool({navigation, route}) {
  const [loading, setLoading] = useState(true);
  //console.log('TopSchoolData: ', route.params.topSchoolsData);
  //const searchString = route.params.keyword || '';

  const s = route.params ? {name: {$contL: route.params.keyword}} : {};

  console.log('PARAMS', route.params);
  const dispatch = useDispatch();
  const universities = useSelector((state) => state.university.universities);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  console.log('S: ', s);
  useEffect(() => {
    dispatch(getListUniversity({page, limit, s}));
  }, [dispatch]);
  const {t} = useTranslation();

  const scrollAnim = new Animated.Value(0);
  const offsetAnim = new Animated.Value(0);

  const {colors} = useTheme();
  const [visible, setVisible] = useState(false);
  const [refreshing] = useState(false);
  const onChangeSort = () => {
    setVisible(true);
  };
  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
      }),
      offsetAnim,
    ),
    0,
    40,
  );
  const navbarTranslate = clampedScroll.interpolate({
    inputRange: [0, 40],
    outputRange: [0, -40],
    extrapolate: 'clamp',
  });
  const renderContent = () => {
    return (
      <View style={{flex: 1}}>
        <Button
            full
            style={{marginTop: 40, marginBottom: 20}}
            onPress={() =>
              navigation.navigate('Map')
            }>
            MAP
          </Button>
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
        <Animated.View
          style={[
            styles.navbar,
            {
              transform: [{translateY: navbarTranslate}],
            },
          ]}>
          <FilterSort
          // modeView={modeView}
          // onChangeSort={onChangeSort}
          // onChangeView={onChangeView}
          // onFilter={onFilter}
          />
        </Animated.View>
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
              onRefresh={() => {
                dispatch(getListUniversity({page, limit, s}));
              }}
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
          data={universities}
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
                navigation.navigate('SchoolDetail', {id: item.id});
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
        title="School in your city"
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
      {/* {loading ? <ActivityIndicator /> : renderContent()} */}
      {renderContent()}
      <Modal backdropOpacity={0} isVisible={visible}>
        <View style={{borderWidth: 1}}>
          <Button
            style={styles.searchButton}
            onPress={() => setVisible(false)}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}
