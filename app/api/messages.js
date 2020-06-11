import client from './client';

const endpoint = '/messages';

const postMessage = (message, listingId) => client.post(endpoint, { message, listingId });

export default {
  postMessage,
};
