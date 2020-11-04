import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
//import {AuthActions} from '@actions';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {Header, SafeAreaView, Icon, Text, Button, TextInput} from '@components';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import {Login} from '../../redux/auth/actions';
export default function SignIn({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState({id: true, password: true});
  const loading = useSelector((state) => state.auth.isLoading);
  //const authentication = useSelector((state) => state.auth.isAuthenticated);
  const success = useSelector((state) => state.auth.loginSuccess);
  /**
   * call when action login
   *
   */
  console.log('success: ', success);
  if (success) {
    navigation.navigate('Home');
  }
  const onLogin = () => {
    // if (email === '' || password === '') {
    //   setSuccess({
    //     ...success,
    //     id: false,
    //     password: false,
    //   });
    // } else {
    //   //setLoading(true);
    //   // dispatch(
    //   //   AuthActions.authentication(true, (response) => {
    //   //     setLoading(false);
    //   //     navigation.goBack();
    //   //   }),
    //   // );
    //
    dispatch(Login({email, password}));
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{top: 'always'}}>
      <Header
        title={t('sign_in')}
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
          <TextInput
            onChangeText={(text) => setEmail(text)}
            // onFocus={() => {
            //   setSuccess({
            //     ...success,
            //     id: true,
            //   });
            // }}
            placeholder={t('input_id')}
            //success={success.id}
            value={email}
          />
          <TextInput
            style={{marginTop: 10}}
            onChangeText={(text) => setPassword(text)}
            // onFocus={() => {
            //   setSuccess({
            //     ...success,
            //     password: true,
            //   });
            // }}
            placeholder={t('input_password')}
            secureTextEntry={true}
            //success={success.password}
            value={password}
          />
          <Button
            style={{marginTop: 20}}
            full
            loading={loading}
            onPress={() => {
              onLogin();
            }}>
            {t('sign_in')}
          </Button>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResetPassword')}>
            <Text body1 grayColor style={{marginTop: 25}}>
              {t('forgot_your_password')}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
