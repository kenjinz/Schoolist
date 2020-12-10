import React, {useEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text, TextInput} from '@components';
import styles from './styles';
import Slider from '@react-native-community/slider';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {getListCriteria} from '../../redux/criteria/actions';
import Config from 'react-native-config';
import {ActivityIndicator} from 'react-native-paper';

export default function UpdateReviewSchool({navigation, route}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [refreshing] = useState(false);
  const criteria = useSelector((state) => state.criteria.criterions);
  const reviewData = route.params.data;
  // console.log(reviewData[0]);
  // const [reviewDetails, setReviewDetails] = useState([]);
  const token = useSelector((state) => state.auth.data.token);
  const handleReview = async ({title, id, criteriaId, rating, content}) => {
    const dataPost = {
      criteriaId,
      rating,
      content,
      title,
      // review_details,
    };
    const setting = {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataPost),
    };
    console.log(id);
    try {
      const res = await fetch(`${Config.API_URL}/reviews/${id}`, setting);
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
        // title={t('reviews')}
        title="Update Review"
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
        renderItem={({item}) => (
          <ReviewSchoolComponent
            criteria={item}
            review={reviewData.find((r) => r.criteriaId === item.id)}
            handleReview={handleReview}
          />
        )}
      />
    </SafeAreaView>
  );
}
const ReviewSchoolComponent = ({criteria, review, handleReview}) => {
  const [value, setValue] = useState(0);
  const {colors} = useTheme();
  const [textReview, setTextReview] = useState(review.reviewComment.content);
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [height, setHeight] = useState();
  return (
    <View>
      <View
        style={{marginBottom: 20}}
        onLayout={(event) => {
          let {x, y, width, height} = event.nativeEvent.layout;
          setHeight(height);
        }}>
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
          // value={review.reviewComment.content}
          value={textReview}
          textAlignVertical="top"
          style={{width: '100%', height: 80, borderRadius: 10}}
          // editable={false}
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
            }}>
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
            onPress={async () => {
              setIsLoading(true);
              setDisabled(true);
              await handleReview({
                id: review.reviewId,
                criteriaId: criteria.id,
                rating: parseInt(value, 10),
                content: textReview,
                title:
                  criteria.name.length > 15
                    ? `${criteria.name} 
                (${value}/${criteria.max})`
                    : `${criteria.name} (${value}/${criteria.max})`,
              });
              setIsLoading(false);
              setDisabled(false);
            }}
            disabled={disabled}>
            <Text
              semibold
              whiteColor
              style={{marginHorizontal: 20, marginVertical: 5}}>
              {!disabled ? 'Cập nhật' : 'Đã cập nhật'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {isLoading ? (
        <View
          style={{
            height: height,
            position: 'absolute',
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            transform: [{scale: 1.1}],
          }}>
          <ActivityIndicator
            style={{
              flex: 1,
              position: 'absolute',
              top: '50%',
              alignSelf: 'center',
              transform: [{translateY: -10}],
              zIndex: 10,
            }}
          />
        </View>
      ) : null}
    </View>
  );
};
