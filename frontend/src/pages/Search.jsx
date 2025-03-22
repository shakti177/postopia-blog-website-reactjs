import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { usePost } from "@/context/PostContext";
import { Button } from "@/components/ui/button";

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
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPosts.map((post) => (
            <div
              key={post._id}
              className="flex flex-col justify-between dark:bg-neutral-900 shadow-md rounded-lg p-4 border hover:shadow-lg transition"
            >
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-52 object-cover rounded-lg mb-2"
              />
              <h2 className="text-xl font-semibold mb-2 line-clamp-3">
                {post.title}
              </h2>
              <p className="text-gray-500 dark:text-gray-300 line-clamp-3">
                <div
                  dangerouslySetInnerHTML={{
                    __html: post?.content || "No description available.",
                  }}
                />
              </p>
              <Link to={`/blog/${post._id}`} onClick={ScrollToTop}>
                <Button className="mt-4 px-4 py-2 bg-blue-800 hover:bg-blue-700 transition">
                  Read More
                </Button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No posts found.</p>
      )}
    </div>
  );
};

export default Search;
