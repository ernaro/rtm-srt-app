import { api } from './configs/axiosConfig';


export const axiosFetcher = url => api.get(url).then(res => res.data).catch(err => {
  const error = new Error('An error occurred while fetching the data.');
  error.status = err.response.status;
  throw error;
});

export const createChannel = channel => api.post("/channels", channel);

export const updateChannelById = (id, channel) => api.put(`/channels/${id}`, channel);

export const deleteChannelById = id => api.delete(`/channels/${id}`);

export const startChannelById = id => api.post(`/channels/${id}/start`);

export const stopChannelById = id => api.post(`/channels/${id}/stop`);

export const changeUserPassword = (id, passwords) => api.put(`/users/${id}`, passwords);

