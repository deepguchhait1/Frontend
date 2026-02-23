import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};
export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
};

export const getUserFriends = async () => {
  const response = await axiosInstance.get("/users/friends");
  return response.data;
};

export const getRecommendedUsers = async () => {
  const response = await axiosInstance.get("/users" );
  return response.data;
};

export const getOutgoingFriendReqs = async () => {
  const response = await axiosInstance.get("/users/outgoing-friend-requests" );
  return response.data;
};

export const sendFriendRequest = async (userId) => {
  const response = await axiosInstance.post(`/users/friend-request/${userId}` );
  return response.data;
};

export const getFriendRequests = async () => {
  const response = await axiosInstance.get(`/users/friend-requests` );
  return response.data;
};

export const acceptFriendRequest = async (userId) => {
  const response = await axiosInstance.put(`/users/friend-request/${userId}/accept` );
  return response.data;
};
export const rejectFriendRequest = async (userId) => {
  const response = await axiosInstance.put(`/users/friend-request/${userId}/rejected` );
  return response.data;
};
export const getStreamToken = async () => {
  const response = await axiosInstance.get(`/chat/token`);
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await axiosInstance.put('/users/profile', profileData);
  return response.data;
};

export const uploadImage = async (formData) => {
  const response = await axiosInstance.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getCallHistory = async () => {
  const response = await axiosInstance.get('/call/history');
  return response.data;
};

export const createCallHistory = async (callData) => {
  const response = await axiosInstance.post('/call/history', callData);
  return response.data;
};
