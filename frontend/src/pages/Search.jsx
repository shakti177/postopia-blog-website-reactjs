import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePost } from "@/context/postContext";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { posts } = usePost();
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    if (query) {
      const results = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.content.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPosts(results);
    }
  }, [query, posts]);

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 mt-3">
        Search Results for "{query}"
      </h1>
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {filteredPosts.map((post) => (
            <div
              key={post._id}
              className="flex flex-col justify-between dark:bg-neutral-900 shadow-md rounded-lg p-4 border hover:shadow-lg transition"
            >
              <Link to={`/blog/${post._id}`}>
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-52 object-cover rounded-lg mb-2"
                />
              </Link>
              <Link to={`/blog/${post._id}`}>
                <h2 className="text-xl font-semibold mb-2 line-clamp-2 hover:underline hover:underline-offset-2">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-500 dark:text-gray-300 line-clamp-3">
                <div
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
                <Link to={`/category/${post?.category}`}>
                  <span className="inline-block bg-gray-100 dark:bg-neutral-800 px-3 py-1 text-sm text-gray-500 dark:text-gray-300 rounded-2xl mt-4">
                    {post.category}
                  </span>
                </Link>
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

export default Search;
