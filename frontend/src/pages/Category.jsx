import { usePost } from "@/context/postContext";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Category = () => {
  const { category } = useParams();

  const { categoryPosts, fetchByCategory } = usePost();

  useEffect(() => {
    if (category) {
      fetchByCategory(category);
    }
  }, [category]);

  return (
    <div>
      Category:{category}
      {categoryPosts.map((post) => (
        <div key={post._id}>
          <Link to={`/blog/${post._id}`}>
            <h2>{post.title}</h2>
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-2">
            <div
              dangerouslySetInnerHTML={{
                __html: post.content || "No description available.",
              }}
            />
          </p>
        </div>
      ))}
    </div>
  );
};

export default Category;
