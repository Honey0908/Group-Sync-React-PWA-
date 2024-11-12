import api from './axios';

// Create a room
export const createRoom = async (name: string, maxMembers: number) => {
  const response = await api.post('/rooms/create', { name, maxMembers });
  return response.data;
};

// Join a room
export const joinRoom = async (roomId: string) => {
  const response = await api.post(`/rooms/join/${roomId}`);
  return response.data;
};

// Fetch all rooms
export const fetchAllRooms = async () => {
  const response = await api.get('/rooms');
  return response.data;
};

export const fetchUserRooms = async (userId: string) => {
  const response = await api.get('/rooms/user/' + userId);
  return response.data;
};

// Send push notification to room members
export const sendNotification = async (roomId: string, message: string) => {
  const response = await api.post(`/notifications/send/${roomId}`, { message });
  return response.data;
};
