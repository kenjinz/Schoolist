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
import {rootURL} from '../../redux/common/rootURL';

export default function SearchHistory({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  // const [searchHistory, setSearchHistory] = useState([
  //   {id: '1', keyword: 'Trường Đại học bách khoa đại học Đà Nẵng'},
  //   {id: '2', keyword: 'Tripple Room'},
  //   {id: '3', keyword: 'Single Room'},
  //   {id: '4', keyword: 'King Room'},
  //   {id: '5', keyword: 'Lux Room'},
  // ]);
  // True: SearchView
  // False: Search History View
  const [view, setView] = useState(false);
  const searchHistory = useSelector((state) => state.university.searchHistory);
  /**
   * call when search data
   * @param {*} keyword
   */
  const onSearch = (keyword) => {
    console.log(1);
    // const found = searchHistory.some((item) => item.keyword == keyword);
    // let searchData = [];
    // if (found) {
    //   searchData = searchHistory.map((item) => {
    //     return {
    //       ...item,
    //       checked: item.keyword == keyword,
    //     };
    //   });
    // } else {
    //   searchData = searchHistory.concat({
    //     keyword: search,
    //   });
    // }
    // setLoading(true);
    // setTimeout(() => navigation.goBack(), 1000);
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
            onPress={() => onSearch(item.keyword)}
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
      <View style={styles.rowTitle}>
        <View style={{flexGrow: 0.1, justifyContent: 'flex-start'}}>
          <Icon name="search" size={20} color={colors.primary} />
        </View>
        <View style={{flexGrow: 0.8}}>
          <Text body1 medium>
            ABC
          </Text>
        </View>
        <View style={{flexGrow: 0.1, alignItems: 'flex-end'}}>
          <Icon name="times" size={20} color={colors.primary} />
        </View>
      </View>
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
          {view ? <SearchHistoryView /> : <SearchView />}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
