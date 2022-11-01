import axiosInstance from './config/axiosInstance.js';

export default {
  getCatImage() {
    return axiosInstance.get('/images/search');
  },
  vote(model) {
    const payload = {
        "image_id": model.id,
        "value": model.vote,
    };

    return axiosInstance.post(`/votes`, payload);
  },
};