import axiosClient from './axiosClient';
const PostAPI = {
  getAllPosts: async (limit, page) => {
    const url = '/api/posts';
    const response = await axiosClient.get(url, {
      params: {
        pagination: {
          page: page,
          pageSize: limit,
        },
        populate: '*',
      },
    });
    return response;
  },
  getAllEvents: async (limit, page) => {
    const url = '/api/events';
    const response = await axiosClient.get(url, {
      params: {
        pagination: {
          page: page,
          pageSize: limit,
        },
        populate: '*',
      },
    });
    return response;
  },
  getPostById: async (id) => {
    const url = `/api/posts/${id}`;
    return axiosClient.get(url, { params: { populate: '*' } });
  },
  getEventById: async (id) => {
    const url = `/api/events/${id}`;
    return axiosClient.get(url, { params: { populate: '*' } });
  },
};

export default PostAPI;
