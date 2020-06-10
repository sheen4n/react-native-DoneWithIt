import client from './client';

const endpoint = '/listings';

const getListings = () => client.get(endpoint);

const createListing = (listing, onProgressChange) => {
  const { title, price, category, description, images, location } = listing;
  const categoryId = category.value;

  const data = new FormData();
  data.append('title', title);
  data.append('price', price);
  data.append('categoryId', categoryId);
  if (description) data.append('description', description);
  images.map((image, index) => {
    data.append('images', {
      name: 'image' + index,
      type: 'image/jpeg',
      uri: image,
    });
  });

  if (location) data.append('location', JSON.stringify(location));

  return client.post(endpoint, data, {
    onUploadProgress: (progress) => onProgressChange(progress.loaded / progress.total),
  });
};

export default {
  createListing,
  getListings,
};
