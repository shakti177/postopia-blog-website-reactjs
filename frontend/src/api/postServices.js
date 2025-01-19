import API from "./axios";

export const apiCreatePost = async (postData, accessToken) => {
  try {
    const response = await API.post("/posts/create", postData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const apiFetchPosts = async () => {
  try {
    const response = await API.get("/posts");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const apiFetchPost = async (postId) => {
  try {
    const response = await API.get(`/posts/?postId=${postId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const apiUpdatePost = async (postId, postData, accessToken) => {
  try {
    const response = await API.patch(
      `/posts/update/postId=${postId}`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const apiDeletePost = async (postId, accessToken) => {
  try {
    const response = await API.delete(`/posts/delete/?postId=${postId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const apiFetchPostByCategory = async (category) => {
  try {
    const response = await API.get(`/posts/category/?category=${category}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const apiPostThumbnail = async (thumbnailData, postID, accessToken) => {
  try {
    const response = await API.post(
      `/posts/postThumbnail/?postID=${postID}`,
      thumbnailData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const apiFetchPostByUser = async (userId) => {
  try {
    const response = await API.get(`/posts/author?authorId=${userId}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
