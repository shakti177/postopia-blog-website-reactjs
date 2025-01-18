import { createContext, useState, useContext } from "react";
import {
  apiCreatePost,
  apiDeletePost,
  apiFetchPost,
  apiFetchPostByCategory,
  apiFetchPosts,
  apiPostThumbnail,
  apiUpdatePost,
} from "../api/postServices";

const postContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPost = async (postData, accessToken) => {
    setLoading(true);
    setError(null);
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await apiCreatePost(postData, accessToken);
      setPosts([...posts, response.data]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetchPosts();
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPost = async (postId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetchPost(postId);
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (postId, postData, accessToken) => {
    setLoading(true);
    setError(null);
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await apiUpdatePost(postId, postData, accessToken);
      setPosts(
        posts.map((post) =>
          post._id === postId ? { ...post, ...response.data } : post
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId, accessToken) => {
    setLoading(true);
    setError(null);
    const accessToken = localStorage.getItem("accessToken");
    try {
      await apiDeletePost(postId, accessToken);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchByCategory = async (category) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetchPostByCategory(category);
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const postThumbnail = async (thumbnailData, postId, accessToken) => {
    setLoading(true);
    setError(null);
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await apiPostThumbnail(
        thumbnailData,
        postId,
        accessToken
      );
      setPosts(
        posts.map((post) =>
          post._id === postId ? { ...post, ...response.data } : post
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <postContext.Provider
      value={{
        posts,
        loading,
        error,
        fetchPosts,
        fetchPost,
        createPost,
        updatePost,
        deletePost,
        fetchByCategory,
        postThumbnail,
      }}
    >
      {children}
    </postContext.Provider>
  );
};

export const usePost = () => {
  return useContext(postContext);
};
