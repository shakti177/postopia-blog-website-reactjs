import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { usePost } from "@/context/postContext";
import { formatDate } from "@/utils/dataUtil";
import { getNameInitials } from "@/utils/stringUtil";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Category = () => {
  const { category } = useParams();
  const { categoryPosts, fetchByCategory, loading } = usePost();

  useEffect(() => {
    if (category) {
      fetchByCategory(category);
    }
  }, [category]);

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 mt-3">Category: {category}</h1>
      {loading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <div className="size-16 rounded-full border-[10px] border-gray-300 border-r-blue-800 dark:border-neutral-200 dark:border-r-neutral-700 animate-spin"></div>
        </div>
      ) : categoryPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {categoryPosts.map((post) => (
            <div
              key={post._id}
              className="flex flex-col justify-between dark:bg-neutral-900 shadow-md rounded-lg p-4 border hover:shadow-lg transition"
            >
              <Link to={`/blog/${post._id}`} onClick={ScrollToTop}>
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-52 object-cover rounded-lg mb-2"
                />
              </Link>
              <div className="flex items-center gap-3 mb-4">
                <div>
                  <Avatar className="size-10">
                    <AvatarImage
                      src={post.author.profilePicture}
                      className="object-cover w-full h-full"
                    />
                    <AvatarFallback>
                      {getNameInitials(post.author.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-col mt-2">
                  <p className="text-black font-bold dark:text-gray-300">
                    {post.author.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {formatDate(post?.createdAt)}
                  </p>
                </div>
              </div>
              <Link to={`/blog/${post._id}`} onClick={ScrollToTop}>
                <h2 className="text-xl font-semibold mb-2 line-clamp-2 hover:underline hover:underline-offset-2">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-500 dark:text-gray-300 line-clamp-3">
                <span
                  dangerouslySetInnerHTML={{
                    __html: post?.content || "No description available.",
                  }}
                />
              </p>
              <div className="flex justify-between items-center">
                <Link to={`/blog/${post._id}`}>
                  <Button
                    className="mt-4 px-4 py-2 bg-blue-800 hover:bg-blue-700 transition"
                    onClick={ScrollToTop}
                  >
                    Read More
                  </Button>
                </Link>
                <span className="inline-block bg-gray-100 dark:bg-neutral-800 px-3 py-1 text-sm text-gray-500 dark:text-gray-300 rounded-2xl mt-4">
                  {post.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center h-96 flex flex-col justify-center items-center gap-3">
          <h2 className="text-3xl font-medium">Nothing To See Here</h2>
          <p className="text-xl">No Post Found!</p>
          <Button className="px-4 py-2 bg-blue-800 hover:bg-blue-700 transition">
            <Link to="/">Home</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Category;
