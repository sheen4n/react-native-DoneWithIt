import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import * as Yup from 'yup';
import { Notifications } from 'expo';

import messages from '../api/messages';
import { Form, SubmitButton, FormField, ErrorMessage } from '../components/forms';
import ActivityIndicator from './ActivityIndicator';

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label('Message'),
});

export default function ContactSellerForm({ listing }) {
  const messagesApi = useApi(messages.postMessage);
  const [error, setError] = useState();

  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();

    const response = await messagesApi.request(message, listing.id);
    if (!response.ok) {
      if (response.data) {
        return setError(response.data.error);
      } else {
        setError('An unexpected error occurred');
        return console.log(response);
      }
    }
    resetForm();
    Notifications.presentLocalNotificationAsync({
      title: 'Awesome!',
      body: 'Your message was sent to the seller',
    });
  };

  return (
    <>
      <ActivityIndicator visible={messagesApi.loading} />
      <Form
        initialValues={{
          message: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage error={error} visible={error} />
        <FormField name='message' placeholder='Mesage...' maxLength={255} />
        <SubmitButton title='Contact Seller' />
      </Form>
    </>
  );
}
