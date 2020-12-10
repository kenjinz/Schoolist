import React, {useState} from 'react';
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
import {Header, SafeAreaView, TextInput, Icon, Text, Button} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {setSearchText} from '../../redux/university/actions';
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
  const [majors] = useState([
    'Công nghệ thông tin',
    'Điện tử viễn thôg',
    'Học máy',
    'Trí tuệ nhân tạo',
    ,
  ]);
  const [textCriteria, setTextCriteria] = useState('Choose your Criteria');
  const [criteria] = useState([
    'Wifi',
    'Quán Net',
    'Tiền học',
    'Chất lượng đào tạo',
    ,
  ]);
  //Handling Increase or Decrease text:
  const [filterCriteria, setFilterCriteria] = useState(true);
  const [filterFee, setFilterFee] = useState(true);
  const [filterRating, setFilterRating] = useState(true);
  /**
   * call when search data
   * @param {*} keyword
   */
  const onSearch = (keyword) => {
    dispatch(setSearchText(keyword));
    navigation.navigate('ListSchool');
  };
  const MajorModal = () => (
    <View>
      <Modal
        testID={'modal'}
        isVisible={majorModalVisible}
        backdropOpacity={0.2}
        onBackdropPress={() => setMajorModalVisible(false)}
        // swipeDirection={['up', 'left', 'right', 'down']}
        style={styles.view}>
        {majors.map((major) => (
          <View style={styles.majorModalWrapper}>
            <TouchableOpacity
              onPress={() => {
                setTextMajor(major);
                setMajorModalVisible(false);
              }}>
              <View style={styles.majorModal}>
                <Text
                  title3
                  style={{
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                    borderBottomColor: colors.border,
                  }}>
                  {major}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </Modal>
    </View>
  );
  const CriteriaModal = () => (
    <View>
      <Modal
        testID={'modal'}
        isVisible={criteriaModalVisible}
        backdropOpacity={0.2}
        onBackdropPress={() => setCriteriaModalVisible(false)}
        // swipeDirection={['up', 'left', 'right', 'down']}
        style={styles.view}>
        {criteria.map((cri) => (
          <View style={styles.majorModalWrapper}>
            <TouchableOpacity
              onPress={() => {
                setTextCriteria(cri);
                setCriteriaModalVisible(false);
              }}>
              <View style={styles.majorModal}>
                <Text
                  title3
                  style={{
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                    borderBottomColor: colors.border,
                  }}>
                  {cri}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </Modal>
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
