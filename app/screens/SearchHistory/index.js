import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {BaseStyle, BaseColor, Images, useTheme} from '@config';
import {Header, SafeAreaView, TextInput, Icon, Text, Card} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {addSearchHistoryUniversity} from '../../redux/university/actions';

export default function SearchHistory({navigation}) {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [hints, setHints] = useState([
    {id: '1', keyword: 'Trường Đại Học Kiến Trúc Đà Nẵng'},
    {id: '2', keyword: 'Đại học Mỹ tại Việt Nam'},
    {id: '3', keyword: 'Trường Cao Đẳng Lạc Việt - Đà Nẵng'},
    {id: '4', keyword: 'Trường Đại học Sư phạm - Đại học Đà Nẵng'},
    {id: '5', keyword: 'Trường Đại Học Bách Khoa Đà Nẵng'},
  ]);
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });
  const [search, setSearch] = useState('');
  // True: SearchView
  // False: Search History View
  const [view, setView] = useState(false);
  const searchHistory = useSelector((state) => state.university.searchHistory);
  console.log('SEARCH HISTORY: ', searchHistory);
  /**
   * call when search data
   * @param {*} keyword
   */
  const onSearch = (id, keyword) => {
    navigation.navigate('Universities', {keyword});
    console.log('ID : ', id);
    console.log('Keyword: ', keyword);
    dispatch(addSearchHistoryUniversity({id, keyword}));
  };
  const SearchHistoryView = () => (
    <View style={{paddingTop: 20}}>
      <View style={styles.rowTitle}>
        <Text headline>{t('search_history').toUpperCase()}</Text>
        <TouchableOpacity>
          <Text caption1 accentColor>
            {t('clear')}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {searchHistory.map((item, index) => (
          <TouchableOpacity
            style={[
              styles.itemHistory,
              {backgroundColor: colors.card},
              item.checked
                ? {
                    backgroundColor: colors.primary,
                  }
                : {},
            ]}
            onPress={() => onSearch(item.id, item.keyword)}
            key={'search' + index}>
            <Text
              caption2
              style={
                item.checked
                  ? {
                      color: BaseColor.whiteColor,
                    }
                  : {}
              }>
              {item.keyword}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
  const SearchView = () => (
    <View style={{paddingTop: 20, marginLeft: 10}}>
      {hints.map((hint, index) => (
        <View style={styles.rowTitle}>
          <TouchableOpacity
            key={index}
            style={{flexDirection: 'row'}}
            onPress={() => onSearch(hint.id, hint.keyword)}>
            <View style={{justifyContent: 'flex-start', marginRight: 5}}>
              <Icon name="search" size={20} color={colors.primary} />
            </View>
            <View
              style={{
                justifyContent: 'flex-start',
                flexGrow: 1,
              }}>
              <Text body1 medium>
                {hint.keyword.length > 30
                  ? `${hint.keyword.slice(0, 30)}...`
                  : hint.keyword}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{alignItems: 'flex-end'}}>
              <Icon name="times" size={20} color={colors.primary} />
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header
        title={t('search')}
        renderLeft={() => {
          return <Icon name="times" size={20} color={colors.primary} />;
        }}
        renderRight={() => {
          if (loading) {
            return <ActivityIndicator size="small" color={colors.primary} />;
          }
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        keyboardVerticalOffset={offsetKeyboard}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={{padding: 20}}>
          <TextInput
            onChangeText={(text) => {
              text === '' ? setView(false) : setView(true);
              setSearch(text);
            }}
            placeholder={t('search')}
            value={search}
            onSubmitEditing={() => {
              onSearch(search);
            }}
            // icon={
            //   <TouchableOpacity
            //     onPress={() => {
            //       setSearch('');
            //     }}
            //     style={styles.btnClearSearch}>
            //     <Icon name="times" size={18} color={BaseColor.grayColor} />
            //   </TouchableOpacity>
            // }
          />
          {view ? <SearchView /> : <SearchHistoryView />}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
