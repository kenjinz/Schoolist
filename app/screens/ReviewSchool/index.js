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
import Config from 'react-native-config';

export default function ReviewSchool({navigation, route}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [refreshing] = useState(false);
  const {universityId} = route.params;
  const criteria = useSelector((state) => state.criteria.criterions);
  const [reviewDetails, setReviewDetails] = useState([]);
  const token = useSelector((state) => state.auth.data.token);
  const [count, setCount] = useState(0);
  const handleReview = async (universityId) => {
    console.log(criteria.length);
    const dataPost = {
      universityId: universityId,
      review_details: reviewDetails,
    };
    const setting = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataPost),
    };
    try {
      const res = await fetch(`${Config.API_URL}/reviews`, setting);
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
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
      <Text body2 medium style={{alignSelf: 'center', color: 'red'}}>
        Remember Press the Button Review
      </Text>
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
          <ReviewSchoolComponent
            criteria={item}
            setReviewDetails={setReviewDetails}
            setCount={setCount}
          />
        )}
        ListFooterComponent={() => {
          return count === criteria.length ? (
            <Button
              style={{
                flex: 1,
                width: '100%',
                alignSelf: 'center',
                alignItems: 'center',
              }}
              onPress={() => handleReview(universityId)}>
              Submit
            </Button>
          ) : null;
        }}
      />
    </SafeAreaView>
  );
}
const ReviewSchoolComponent = ({criteria, setReviewDetails, setCount}) => {
  const [value, setValue] = useState(0);
  const {colors} = useTheme();
  const [review, setTextReview] = useState('');
  const [disabled, setDisabled] = useState(false);
  return (
    <View style={{marginBottom: 20}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}>
        <Text regular body1 numberOfLines={2}>
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
        onChangeText={(text) => setTextReview(text)}
        multiline
        placeholder="Bạn có cảm nghĩ thế nào "
        value={review}
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
          }}
          onPress={() => {
            setValue(0);
            setTextReview('');
            setReviewDetails((prev) => {
              return prev.filter((p) => p.criteriaId !== criteria.id);
            });
            setCount((c) => c - 1);
            setDisabled(false);
          }}
          disabled={!disabled}>
          <Text semibold style={{marginHorizontal: 20, marginVertical: 5}}>
            Hủy bỏ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: !disabled ? colors.primary : colors.primaryDark,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          }}
          onPress={() => {
            setReviewDetails((prev) => {
              if (prev.find((p) => p.criteriaId === criteria.id)) {
                return prev.map((p) => {
                  if (p.criteriaId === criteria.id) {
                    const data = {
                      criteriaId: criteria.id,
                      rating: value,
                      title:
                        criteria.name.length > 15
                          ? `${criteria.name} 
                (${value}/${criteria.max})`
                          : `${criteria.name} (${value}/${criteria.max})`,
                      content: review,
                    };
                    return data;
                  }
                });
              }
              return [
                ...prev,
                {
                  criteriaId: criteria.id,
                  rating: value,
                  title:
                    criteria.name.length > 15
                      ? `${criteria.name} 
                (${value}/${criteria.max})`
                      : `${criteria.name} (${value}/${criteria.max})`,
                  content: review,
                },
              ];
            });
            setCount((c) => c + 1);
            setDisabled(true);
          }}
          disabled={disabled}>
          <Text
            semibold
            whiteColor
            style={{marginHorizontal: 20, marginVertical: 5}}>
            {!disabled ? 'Đánh giá' : 'Đã đánh giá'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
