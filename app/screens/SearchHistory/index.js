import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
} from 'react-native';
import {BaseStyle, BaseColor, Images, useTheme} from '@config';
import {Header, SafeAreaView, TextInput, Icon, Text, Button} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {setSearchText} from '../../redux/university/actions';
import {getListMajors} from '../../redux/majors/actions';
import {getListCriteria} from '../../redux/criteria/actions';
export default function SearchHistory({navigation, route}) {
  //const setSearchCallBack = route.params.setSearch;
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const {t} = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });
  const [majorModalVisible, setMajorModalVisible] = useState(false);
  const [criteriaModalVisible, setCriteriaModalVisible] = useState(false);
  const search = useSelector((state) => state.university.searchText);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [textMajor, setTextMajor] = useState('Choose your Major');
  const [refreshing] = useState(false);
  const majors = useSelector((state) => state.major.majors);
  const [textCriteria, setTextCriteria] = useState('Choose your Criteria');
  // const [criteria] = useState([
  //   'Wifi',
  //   'Quán Net',
  //   'Tiền học',
  //   'Chất lượng đào tạo',
  //   ,
  // ]);
  const criteria = useSelector((state) => state.criteria.criterions);
  //Handling Increase or Decrease text:
  const [filterCriteria, setFilterCriteria] = useState(true);
  const [filterFee, setFilterFee] = useState(true);
  const [filterRating, setFilterRating] = useState(true);
  useEffect(() => {
    dispatch(getListMajors());
    dispatch(getListCriteria());
  }, [dispatch]);
  const onSearch = (keyword) => {
    dispatch(setSearchText(keyword));
    navigation.navigate('ListSchool');
  };
  const MajorModal = () => {
    const [scrollOffset, setScrollOffset] = useState();
    const scrollViewRef = useRef();
    const handleOnScroll = (event) => {
      setScrollOffset(event.nativeEvent.contentOffset.y);
    };
    const handleScrollTo = (p) => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo(p);
      }
    };
    return (
      <View>
        <Modal
          testID={'modal'}
          isVisible={majorModalVisible}
          onBackdropPress={() => setMajorModalVisible(false)}
          // onSwipeComplete={close()}
          //swipeDirection={['down']}
          scrollTo={handleScrollTo}
          scrollOffset={scrollOffset}
          scrollOffsetMax={100} // content height - ScrollView height
          propagateSwipe={true}
          style={styles.modal}>
          <View style={styles.scrollableModal}>
            <ScrollView
              ref={scrollViewRef}
              onScroll={handleOnScroll}
              scrollEventThrottle={16}>
              {majors.map((major) => (
                <View style={styles.majorModalWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      setTextMajor(major.name);
                      setMajorModalVisible(false);
                    }}
                    activeOpacity={0.7}>
                    <View
                      style={[
                        styles.scrollableModalContent1,
                        {backgroundColor: colors.primary},
                      ]}>
                      <Text
                        title3
                        whiteColor
                        semibold
                        style={{
                          marginLeft: 4,
                          textAlign: 'center',
                          paddingBottom: 10,
                        }}>
                        {major.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  };
  const CriteriaModal = () => {
    const [scrollOffset, setScrollOffset] = useState();
    const scrollViewRef = useRef();
    const handleOnScroll = (event) => {
      setScrollOffset(event.nativeEvent.contentOffset.y);
    };
    const handleScrollTo = (p) => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo(p);
      }
    };
    return (
      <View>
        <Modal
          testID={'modal'}
          isVisible={criteriaModalVisible}
          onBackdropPress={() => setCriteriaModalVisible(false)}
          // onSwipeComplete={close()}
          //swipeDirection={['down']}
          scrollTo={handleScrollTo}
          scrollOffset={scrollOffset}
          scrollOffsetMax={100} // content height - ScrollView height
          propagateSwipe={true}
          style={styles.modal}>
          <View style={styles.scrollableModal}>
            <ScrollView
              ref={scrollViewRef}
              onScroll={handleOnScroll}
              scrollEventThrottle={16}>
              {criteria.map((cri) => (
                <View style={styles.majorModalWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      setTextCriteria(cri.name);
                      setCriteriaModalVisible(false);
                    }}
                    activeOpacity={0.7}>
                    <View
                      style={[
                        styles.scrollableModalContent1,
                        {backgroundColor: colors.primary},
                      ]}>
                      <Text
                        title3
                        whiteColor
                        semibold
                        style={{
                          paddingBottom: 10,
                        }}>
                        {cri.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  };

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
        <ScrollView contentContainerStyle={{flex: 1, padding: 20}}>
          <Text regular body1 style={{marginBottom: 10}}>
            Tìm Kiếm
          </Text>
          <TextInput
            onChangeText={(text) => setText(text)}
            placeholder="Nhập tên trường muốn tìm"
            value={text}
            icon={
              <TouchableOpacity
                onPress={() => {
                  setText('');
                }}
                style={styles.btnClearSearch}>
                <Icon name="times" size={18} color={BaseColor.grayColor} />
              </TouchableOpacity>
            }
          />
          <View style={{paddingTop: 20}}>
            <Text regular body1 style={{marginBottom: 10}}>
              Lọc theo chuyên ngành
            </Text>
            <TouchableOpacity
              onPress={() => setMajorModalVisible(true)}
              style={{width: '100%'}}>
              <View
                style={[
                  BaseStyle.textInput,
                  {backgroundColor: colors.card},
                  styles.gender,
                ]}>
                <Text grayColor style={{marginLeft: 5}}>
                  {textMajor}
                </Text>
              </View>
            </TouchableOpacity>
            <MajorModal />
          </View>
          <View style={{paddingTop: 20}}>
            <Text regular body1 style={{marginBottom: 10}}>
              Lọc theo tiêu chí
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => setCriteriaModalVisible(true)}
                style={{width: '70%'}}>
                <View
                  style={[
                    BaseStyle.textInput,
                    {backgroundColor: colors.card},
                    styles.gender,
                  ]}>
                  <Text grayColor style={{marginLeft: 5}}>
                    {textCriteria}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setFilterCriteria(!filterCriteria)}>
                <Text
                  style={{
                    textDecorationLine: 'underline',
                    color: colors.primary,
                  }}>
                  {filterCriteria ? 'Tăng dần' : 'Giảm dần'}
                </Text>
              </TouchableOpacity>
            </View>
            <CriteriaModal />
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 20,
              justifyContent: 'space-between',
            }}>
            <View style={{flex: 1.2}}>
              <Text regular body1>
                Sắp xếp theo học phí
              </Text>
            </View>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setFilterFee(!filterFee)}>
              <Text
                style={{
                  textDecorationLine: 'underline',
                  color: colors.primary,
                }}>
                {filterFee ? 'Tăng dần' : 'Giảm dần'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', paddingTop: 20}}>
            <View style={{flex: 1.2}}>
              <Text regular body1>
                Sắp xếp theo thứ hạng
              </Text>
            </View>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setFilterRating(!filterRating)}>
              <Text
                style={{
                  textDecorationLine: 'underline',
                  color: colors.primary,
                }}>
                {filterRating ? 'Tăng dần' : 'Giảm dần'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Button onPress={() => onSearch(text)}>Tìm kiếm</Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
