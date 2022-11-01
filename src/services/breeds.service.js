import axiosInstance from './config/axiosInstance.js';

export default {
  getBreeds() {
    return axiosInstance.get('breeds');
  },
  getBreedImage(breed) {
    let query = `?limit=1&breed_id=${breed}`;
    const url = query.length > 1 ? (`images/search${query}`) : ('images/search');
    return axiosInstance.get(url);
  },
  getBreedDetails(breedId) {
    return axiosInstance.get(`images/search?breed_id=${breedId}`);
  },
};