import CONFIG from './config';

const API_ENDPOINT = {
  homepage: `${CONFIG.BASE_URL}list`,
  detailresto: (id) => `${CONFIG.BASE_URL}detail/${id}`,
  review: `${CONFIG.BASE_URL}review`,
};

export default API_ENDPOINT;
