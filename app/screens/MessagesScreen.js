import React, { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import Screen from '../components/Screen';
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from '../components/lists';

const initialMessages = [
  {
    id: 1,
    title: 'Talkative Dude',
    description: 'Blah Blah Blah',
    image: require('../assets/mosh.jpg'),
  },
  {
    id: 2,
    title: 'Hello World',
    description:
      'Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World',
    image: require('../assets/mosh.jpg'),
  },
];

const MessagesScreen = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (message) => () => {
    // Delete the message from messages
    setMessages(messages.filter((m) => m.id !== message.id));
  };

  const handleRefresh = () => {
    console.log('refreshed');
  };

  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            image={item.image}
            title={item.title}
            subTitle={item.description}
            onPress={() => console.log('hi')}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={handleDelete(item)} />
            )}
            showChevron
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => handleRefresh()}
      />
    </Screen>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({});
