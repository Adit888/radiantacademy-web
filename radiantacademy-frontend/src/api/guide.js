import api from './axios';

export const getAllGuides = async () => {
  const response = await api.get('/guides'); // ⚠️ TIDAK ADA body atau headers tambahan di sini
  return response.data;
};

export const createGuide = async (guideData) => {
  const response = await api.post('/guides', guideData);
  return response.data;
};

export const toggleLike = async (guideId) => {
  const response = await api.post(`/guides/${guideId}/like`);
  return response.data;
};