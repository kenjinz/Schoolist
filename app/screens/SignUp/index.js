import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Text, Header, SafeAreaView, Icon, Button, TextInput} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import Modal from 'react-native-modal';
import {Config} from 'react-native-config';
export default function SignUp({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [gender, setGender] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState(0);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    email: '',
    fullName: '',
    password: '',
    phoneNumber: '',
    gender: '',
    age: '',
    another: [],
  });
  const reEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const reNumber = /^\d+$/;
  /**
   * call when action signup
   *
   */
  const onSignUp = () => {
    setLoading(true);
    const userValues = {email, fullName, password, phoneNumber, gender, age};
    return fetch(`${Config.API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userValues),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message) {
          json.message.map((val) =>
            setError({
              ...error,
              another: [...error.another, val],
            }),
          );
          throw new Error(json.message);
        } else {
          navigation.navigate('Home');
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header
        title={t('sign_up')}
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
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        keyboardVerticalOffset={offsetKeyboard}
        style={{flex: 1}}>
        <View style={styles.contain}>
          <Text body2 medium style={{color: 'red'}}>
            {error.another ? error.another.toString() : null}
          </Text>
          <TextInput
            onChangeText={(text) => {
              setEmail(text);
              if (text === '') {
                setError({
                  ...error,
                  email: 'Email is required',
                });
              }
              if (reEmail.test(text)) {
                //setEmail(text);
                setError({
                  ...error,
                  email: '',
                });
              } else {
                setError({
                  ...error,
                  email: 'Is not email',
                });
              }
            }}
            placeholder={t('input_email')}
            keyboardType="email-address"
            value={email}
          />
          {error.email !== '' ? (
            <Text body2 medium style={{color: 'red'}}>
              {error.email}
            </Text>
          ) : null}
          <TextInput
            style={{marginTop: 10}}
            onChangeText={(text) => {
              setFullName(text);
              if (text === '') {
                setError({
                  ...error,
                  fullName: 'Name is required',
                });
              } else if (text.length < 5 || text.length > 30) {
                setError({
                  ...error,
                  fullName: 'Length of name is between 5 and 30 characters',
                });
              } else {
                setError({
                  ...error,
                  fullName: '',
                });
              }
            }}
            placeholder={t('input_name')}
            value={fullName}
          />
          {error.fullName !== '' ? (
            <Text body2 medium style={{color: 'red'}}>
              {error.fullName}
            </Text>
          ) : null}
          <TextInput
            style={{
              marginTop: 10,
              fontFamily: 'Helvetica',
              fontSize: 14,
              fontWeight: '400',
            }}
            onChangeText={(text) => {
              setPassword(text);
              if (text === '') {
                setError({
                  ...error,
                  password: 'Password is required',
                });
              } else if (text.length < 6 || text.length > 30) {
                setError({
                  ...error,
                  password: 'Length of password is between 6 and 30 characters',
                });
              } else {
                setError({
                  ...error,
                  password: '',
                });
              }
            }}
            placeholder={t('input_password')}
            secureTextEntry={true}
            value={password}
          />
          {error.password !== '' ? (
            <Text body2 medium style={{color: 'red'}}>
              {error.password}
            </Text>
          ) : null}
          <TextInput
            style={{marginTop: 10}}
            onChangeText={(text) => {
              setPhoneNumber(text);
              if (text === '') {
                setError({
                  ...error,
                  phoneNumber: 'Phone Number must not be empty',
                });
              } else if (!reNumber.test(text)) {
                setError({
                  ...error,
                  phoneNumber: 'Phone Number must be Number',
                });
              } else {
                setError({...error, phoneNumber: ''});
              }
            }}
            placeholder="Input Phone Number"
            keyboardType="numeric"
            value={phoneNumber}
          />
          {error.phoneNumber !== '' ? (
            <Text body2 medium style={{color: 'red'}}>
              {error.phoneNumber}
            </Text>
          ) : null}
          <TextInput
            style={{marginTop: 10}}
            onChangeText={(text) => {
              setAge(parseInt(text, 10));
              if (text === '') {
                setError({
                  ...error,
                  age: 'Age must not be empty',
                });
              } else if (!reNumber.test(age)) {
                setError({
                  ...error,
                  age: 'Age must be Number',
                });
              } else {
                setError({...error, age: ''});
              }
            }}
            placeholder="Input Age"
            keyboardType="numeric"
            value={age}
          />
          {error.phoneNumber !== '' ? (
            <Text body2 medium style={{color: 'red'}}>
              {error.age}
            </Text>
          ) : null}
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{width: '100%'}}>
            <View
              style={[
                BaseStyle.textInput,
                {backgroundColor: colors.card},
                styles.gender,
              ]}>
              <Text color={colors.primary} style={{marginLeft: 5}}>
                {gender === true ? 'Male' : 'Female'}
              </Text>
            </View>
          </TouchableOpacity>
          <GenderModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setGender={setGender}
          />
          <Button
            full
            style={{marginTop: 20}}
            loading={loading}
            onPress={() => onSignUp()}>
            {t('sign_up')}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const GenderModal = ({modalVisible, setModalVisible, setGender}) => (
  <View>
    <Modal
      testID={'modal'}
      isVisible={modalVisible}
      backdropOpacity={0.2}
      onBackdropPress={() => setModalVisible(false)}
      // swipeDirection={['up', 'left', 'right', 'down']}
      style={styles.view}>
      <View style={styles.genderModalWrapper}>
        <TouchableOpacity
          onPress={() => {
            setGender(true);
            setModalVisible(false);
          }}>
          <View style={styles.genderModal}>
            <Text title3>Male</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.genderModal}>
          <TouchableOpacity
            onPress={() => {
              setGender(false);
              setModalVisible(false);
            }}>
            <Text title3>Female</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </View>
);
