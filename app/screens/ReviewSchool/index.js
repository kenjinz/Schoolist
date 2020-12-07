import React, {useEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  TextInput,
  RateDetail,
  CommentItem,
  Button,
} from '@components';
import styles from './styles';
import Slider from '@react-native-community/slider';
import {ReviewData} from '@data';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {getListCriteria} from '../../redux/criteria/actions';

export default function ReviewSchool({navigation, route}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [refreshing] = useState(false);
  const {universityId} = route.params;
  const criteria = useSelector((state) => state.criteria.criterions);
  useEffect(() => {
    dispatch(getListCriteria());
  }, [dispatch]);
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header
        title={t('reviews')}
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
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.navigate('Feedback');
        }}
      />
      {/* Sample User Review List */}
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
        data={criteria}
        keyExtractor={(item, index) => item.id}
        // ListHeaderComponent={() => (
        //   <RateDetail
        //     point={rateDetail.point}
        //     maxPoint={rateDetail.maxPoint}
        //     totalRating={rateDetail.totalRating}
        //     data={rateDetail.data}
        //   />
        // )}
        renderItem={({item}) => (
          <ReviewSchoolComponent criteria={item} />
          // <CommentItem
          //   style={{marginTop: 10}}
          //   image={item.source}
          //   name={item.name}
          //   rate={item.rate}
          //   date={item.date}
          //   title={item.title}
          //   comment={item.comment}
          // />
        )}
      />
    </SafeAreaView>
  );
}
const ReviewSchoolComponent = ({criteria}) => {
  const [value, setValue] = useState(0);
  const {colors} = useTheme();
  const [reviewWifi, setTextReviewWifi] = useState('');
  return (
    <View style={{marginBottom: 20}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}>
        <Text regular body1 numberOfLines={2}>
          {/* {`${
            criteria.name.length > 15
              ? `${criteria.name.slice(0, 15)}...`
              : criteria.name
          } (${value}/${criteria.max})`} */}
          {criteria.name.length > 15
            ? `${criteria.name} 
          (${value}/${criteria.max})`
            : `${criteria.name} (${value}/${criteria.max})`}
        </Text>
        <Slider
          style={{width: '50%'}}
          value={value}
          minimumValue={0}
          maximumValue={criteria.max}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor="#000000"
          thumbTintColor={colors.primary}
          onSlidingComplete={(value) => setValue(value)}
          step={0.5}
        />
      </View>
      <TextInput
        onChangeText={(text) => setTextReviewWifi(text)}
        multiline
        placeholder="Bạn có cảm nghĩ thế nào "
        value={reviewWifi}
        textAlignVertical="top"
        style={{width: '100%', height: 80, borderRadius: 10}}
      />
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          style={{
            overflow: 'hidden',
            backgroundColor: '#9B9B9B',
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
          }}>
          <Text semibold style={{marginHorizontal: 20, marginVertical: 5}}>
            Hủy bỏ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <Text
            semibold
            whiteColor
            style={{marginHorizontal: 20, marginVertical: 5}}>
            Đánh giá
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
