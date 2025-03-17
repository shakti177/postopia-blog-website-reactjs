import { createContext, useState, useContext } from "react";
import {
  apiCreatePost,
  apiDeletePost,
  apiFetchPost,
  apiFetchPostByCategory,
  apiFetchPostByUser,
  apiFetchPosts,
  apiUpdatePost,
} from "../api/postServices";

const postContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [categoryPosts, setCategoryPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPost = async (formData) => {
    setLoading(true);
    setError(null);
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await apiCreatePost(formData, accessToken);
      setPosts([...posts, response.data]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async (page = 1, limit = 5) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetchPosts(page, limit);
      if (page === 1) {
        setPosts(response.posts);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...response.posts]);
      }
      return response; // Return the response to get totalPages and currentPage
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPost = async (postId) => {
    if (post && post._id === postId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await apiFetchPost(postId);
      setPost(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (postId, formData) => {
    setLoading(true);
    setError(null);
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await apiUpdatePost(postId, formData, accessToken);
      setPosts(
        posts.map((post) =>
          post._id === postId ? { ...post, ...response } : post
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId) => {
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
      setCategoryPosts(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchByUser = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetchPostByUser(userId);
      setUserPosts(response);
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
        post,
        userPosts,
        categoryPosts,
        loading,
        error,
        createPost,
        fetchPosts,
        fetchPost,
        updatePost,
        deletePost,
        fetchByCategory,
        fetchByUser,
      }}
    >
      {children}
    </postContext.Provider>
  );
};

export const usePost = () => {
  return useContext(postContext);
};
