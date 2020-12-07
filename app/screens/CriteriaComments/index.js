import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  RateDetail,
  CommentItem,
} from '@components';
import styles from './styles';
import {ReviewData} from '@data';
import {useTranslation} from 'react-i18next';
import {Config} from 'react-native-config';
import {ActivityIndicator} from 'react-native-paper';
export default function CriteriaComments({navigation, route}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const {universityId, criteria_id, name, maxPoint, point} = route.params;
  const [refreshing] = useState(false);
  const [rateDetail] = useState({
    point: 4.7,
    maxPoint: 5,
    totalRating: 25,
    data: ['5%', '5%', '35%', '40%', '10%'],
  });
  const [loading, setLoading] = useState(true);
  const [reviewList] = useState(ReviewData);
  const [comments, setComments] = useState([]);
  const getCommentCriteria = async () => {
    try {
      const res = await fetch(
        `${Config.API_URL}/universities/${universityId}/criteria/${criteria_id}`,
        {
          method: 'GET',
        },
      );
      const json = await res.json();
      setComments(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCommentCriteria();
  }, []);
  return !loading ? (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header
        title={name}
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
          return (
            <Text headline primaryColor numberOfLines={1}>
              {t('replay')}
            </Text>
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
        data={comments}
        keyExtractor={(item, index) => item.id}
        ListHeaderComponent={() => (
          <RateDetail
            point={Math.round(point * 100) / 100}
            maxPoint={maxPoint}
          />
        )}
        renderItem={({item}) => (
          <CommentItem
            style={{marginTop: 10}}
            // image={item.source}
            name={item.reviewDetail.review.user.fullName}
            // rate={item.rate}
            date={item.reviewDetail.rating}
            title={
              item.title.length > 10
                ? `${item.title.slice(0, 10)} ...`
                : item.title
            }
            comment={item.content}
          />
        )}
      />
    </SafeAreaView>
  ) : (
    <ActivityIndicator />
  );
}
