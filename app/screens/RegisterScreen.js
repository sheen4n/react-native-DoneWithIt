import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

import authApi from '../api/auth';
import usersApi from '../api/users';
import { ErrorMessage, Form, FormField, SubmitButton } from '../components/forms';
import Screen from '../components/Screen';
import useApi from '../hooks/useApi';
import ActivityIndicator from '../components/ActivityIndicator';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(4).label('Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

const RegisterScreen = () => {
  const [error, setError] = useState();
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();

  const handleSubmit = async (userInfo) => {
    const response = await registerApi.request(userInfo);
    if (!response.ok) {
      if (response.data) {
        return setError(response.data.error);
      } else {
        setError('An unexpected error occured');
        return console.log(response);
      }
    }

    const { data: authToken } = await loginApi.request(userInfo.email, userInfo.password);

    auth.logIn(authToken);
  };
  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <Screen style={styles.container}>
        <Form
          initialValues={{ name: '', email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={!!error} />

          <FormField
            name='name'
            autoCapitlize='none'
            autoCorrect={false}
            icon='account'
            placeholder='Name'
            textContentType='name'
          />

          <FormField
            name='email'
            autoCapitlize='none'
            autoCorrect={false}
            icon='email'
            keyboardType='email-address'
            placeholder='Email'
            textContentType='emailAddress'
          />

          <FormField
            name='password'
            autoCapitlize='none'
            autoCorrect={false}
            icon='lock'
            placeholder='Password'
            secureTextEntry
            textContentType='password'
          />

          <SubmitButton title='Register' />
        </Form>
      </Screen>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
