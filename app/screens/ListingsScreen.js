import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import colors from '../config/colors';
import listingApi from '../api/listings';
import routes from '../navigation/routes';

import ActivityIndicator from '../components/ActivityIndicator';
import Button from '../components/Button';
import Card from '../components/Card';
import Screen from '../components/Screen';
import AppText from '../components/Text';
import useApi from '../hooks/useApi';

const ListingsScreen = ({ navigation }) => {
  const getListingsApi = useApi(listingApi.getListings);

  useEffect(() => {
    getListingsApi.request();
  }, []);

  const handleRefresh = () => {
    getListingsApi.request();
  };

  return (
    <>
      <ActivityIndicator visible={getListingsApi.loading} />
      <Screen style={styles.screen}>
        {getListingsApi.error && (
          <>
            <AppText>Couldn't retrieve the listings</AppText>
            <Button title='Retry' onPress={getListingsApi.request} />
          </>
        )}
        <FlatList
          data={getListingsApi.data}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={'$' + item.price}
              imageUrl={item.images[0].url}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
              thumbnailUrl={item.images[0].thumbnailUrl}
            />
          )}
          refreshing={getListingsApi.loading}
          onRefresh={handleRefresh}
        ></FlatList>
      </Screen>
    </>
  );
};

export default ListingsScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    padding: 20,
  },
});
