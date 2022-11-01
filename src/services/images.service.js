import axiosInstance from './config/axiosInstance.js';

export default {
  getCategories() {
    return axiosInstance.get('categories');
  },
  getBreeds() {
      return axiosInstance.get('breeds');
  },
  async searchImages(payload) {
    let query = '?limit=10';
    query = appendToQuery(query, 'category_ids', payload.category);
    query = appendToQuery(query, 'breed_ids', payload.breed);
    query = appendToQuery(query, 'order', payload.order);
    query = appendToQuery(query, 'page', payload.page);

    const url = `images/search${query}`;

    let response = await axiosInstance.get(url);
    response = {
      images: response.data,
      imagesCount: response.headers['pagination-count'],
    };

    return response;
  },
};

function isEmpty(str) {
  return (!str || 0 === str.length);
}

function appendToQuery(query, queryKey, queryValue) {
  if (!isEmpty(queryValue)) {
      if (query.length > 1) {
          query += '&';
      }
      query += `${queryKey}=${queryValue}`;
  }

  return query;
}