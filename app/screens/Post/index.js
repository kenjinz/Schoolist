import React, {useEffect, useState} from 'react';
import {RefreshControl, FlatList, ActivityIndicator} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, PostItem} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {getListPost} from '../../redux/posts/actions';

export default function Post({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [refreshing] = useState(false);
  const posts = useSelector((state) => state.post.posts);
  const loading = useSelector((state) => state.post.loading);
  const total = useSelector((state) => state.post.total);
  const [page, setPage] = useState(1);
  const [limit] = useState(4);
  const FooterView = () => {
    return posts.length < total ? (
      <ActivityIndicator size="large" color="red" />
    ) : null;
  };
  function handleLoadMore() {
    if (posts.length < total) {
      setPage((prevPage) => {
        const newPage = prevPage + 1;
        dispatch(getListPost({page: newPage, limit}));
        return newPage;
      });
    }
  }
  useEffect(() => {
    dispatch(getListPost({page, limit}));
  }, []);
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header title={t('post')} />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          data={posts}
          keyExtractor={(item, index) => item.id}
          renderItem={({item, index}) => (
            <PostItem
              image={{uri: item.mainImage.link.origin}}
              title={item.title}
              description={item.description}
              onPress={() => navigation.navigate('PostDetail', {id: item.id})}>
              {/* <ProfileAuthor
                image={item.authorImage}
                name={item.name}
                description={item.detail}
                style={{paddingHorizontal: 20}}
              /> */}
            </PostItem>
          )}
          onEndReachedThreshold={0.1}
          onEndReached={handleLoadMore}
          ListFooterComponent={FooterView}
        />
      )}
    </SafeAreaView>
  );
}
