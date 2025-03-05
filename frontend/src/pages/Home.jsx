import Sidebar from "@/components/SideBar/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePost } from "@/context/postContext";
import { formatDate } from "@/utils/dataUtil";
import { getNameInitials } from "@/utils/stringUtil";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const { posts, fetchPosts, loading } = usePost();

  useEffect(() => {
    fetchPosts();
  }, []);

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="container mx-auto px-5 md:px-10 py-7">
        <div className="grid grid-cols-1 md:grid-cols-[66%_30%] justify-between">
          <div>
            <h1 className="text-xl font-medium text-gray-900 dark:text-white mb-7 md:mb-5 border-b pb-4">
              Recent Blogs
            </h1>
            {loading
              ? Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="border-b flex items-center space-x-4 pb-4 mb-4 animate-pulse"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-6 h-6 bg-gray-200 rounded-full dark:bg-neutral-800"></div>
                          <div className="w-32 h-4 bg-gray-200 dark:bg-neutral-800 rounded"></div>
                        </div>
                        <div className="w-40 h-4 bg-gray-200 dark:bg-neutral-800 rounded mb-2"></div>
                        <div className="w-56 h-4 bg-gray-200 dark:bg-neutral-800 rounded"></div>
                        <div className="w-12 h-4 bg-gray-200 dark:bg-neutral-800 rounded mt-4"></div>
                      </div>
                      <div className="w-20 h-20 md:w-32 md:h-32 bg-gray-200 dark:bg-neutral-800 rounded-lg"></div>
                    </div>
                  ))
              : posts.map((post) => (
                  <div
                    key={post._id}
                    className="border-b grid grid-cols-1 md:grid-cols-[70%_25%] items-center justify-between pb-6 mb-6"
                  >
                    <div className="order-last md:order-first">
                      <div className="flex items-center space-x-3 mb-3">
                        <Avatar className="size-6">
                          <AvatarImage
                            src={post.author.profilePicture}
                            className="object-cover w-full h-full"
                          />
                          <AvatarFallback>
                            {getNameInitials(post.author.name)}
                          </AvatarFallback>
                        </Avatar>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          {post.author.name} • {formatDate(post?.createdAt)}
                        </p>
                      </div>
                      <Link
                        to={`/blog/${post._id}`}
                        onClick={ScrollToTop}
                        className="line-clamp-2"
                      >
                        <h2 className="inline text-lg md:text-xl font-medium text-gray-900 dark:text-white hover:underline hover:underline-offset-2">
                          {post.title}
                        </h2>
                      </Link>
                      <p className="text-sm mt-3 text-gray-500 dark:text-gray-300 line-clamp-3">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: post.content || "No description available.",
                          }}
                        />
                      </p>
                      <span className="inline-block bg-gray-100 dark:bg-neutral-800 px-3 py-1 text-sm text-gray-500 dark:text-gray-300 rounded-2xl mt-4">
                        {post.category}
                      </span>
                    </div>

                    <div className="w-full h-56 md:w-full md:h-32 lg:h-44 pb-4 md:pb-0">
                      <Link to={`/blog/${post._id}`} onClick={ScrollToTop}>
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </Link>
                    </div>
                  </div>
                ))}
          </div>
          <div>
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
