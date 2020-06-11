import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import * as Yup from 'yup';

import useAuth from '../auth/useAuth';
import authApi from '../api/auth';
import { ErrorMessage, Form, FormField, SubmitButton } from '../components/forms';
import Screen from '../components/Screen';
import ActivityIndicator from '../components/ActivityIndicator';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

const LoginScreen = () => {
  const { logIn } = useAuth();
  const loginApi = useApi(authApi.login);

  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    const response = await loginApi.request(email, password);
    if (!response.ok) return setLoginFailed(true);
    setLoginFailed(false);
    logIn(response.data);
  };

  return (
    <>
      <ActivityIndicator visible={loginApi.loading} />
      <Screen style={styles.container}>
        <Image source={require('../assets/logo-red.png')} style={styles.logo} />
        <Form
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error='Invalid email and/or password' visible={loginFailed} />
          <FormField
            name='email'
            autoCapitalize='none'
            autoCorrect={false}
            icon='email'
            keyboardType='email-address'
            placeholder='Email'
            textContentType='emailAddress'
          />

          <FormField
            name='password'
            autoCapitalize='none'
            autoCorrect={false}
            icon='lock'
            placeholder='Password'
            secureTextEntry
            textContentType='password'
          />

          <SubmitButton title='Login' />
        </Form>
      </Screen>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
});
