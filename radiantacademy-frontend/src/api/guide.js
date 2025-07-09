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

export const deleteGuide = async (guideId) => {
  const response = await api.delete(`/guides/${guideId}`);
  return response.data;
};

export const getGuideById = async (guideId) => {
  const response = await api.get(`/guides/${guideId}`);
  return response.data;
};

export const updateGuide = async (guideId, updatedData) => {
  const response = await api.put(`/guides/${guideId}`, updatedData);
  return response.data;
};

// Get comments for guide
export const getComments = async (guideId) => {
  const res = await api.get(`/guides/${guideId}/comments`);
  return res.data;
};

// Post comment
export const postComment = async (guideId, commentData) => {
  const res = await api.post(`/guides/${guideId}/comments`, commentData);
  return res.data;
};

export const updateComment = (commentId, updatedData) =>
  api.put(`/comments/${commentId}`, updatedData);

export const deleteComment = (commentId) =>
  api.delete(`/comments/${commentId}`);
