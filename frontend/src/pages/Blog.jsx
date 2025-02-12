import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePost } from "@/context/postContext";
import { formatDate } from "@/utils/dataUtil";
import { getNameInitials } from "@/utils/stringUtil";
import { getFormattedTime } from "@/utils/timeUtil";
import { Clock9, Twitter } from "lucide-react";
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Blog = () => {
  const { id } = useParams();
  const { posts, post, fetchPost, fetchPosts, loading } = usePost();

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  useEffect(() => {
    if (posts.length === 0) {
      fetchPosts();
    }
  }, [posts]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="size-16 rounded-full border-[10px] border-gray-300 border-r-blue-800 dark:border-neutral-200 dark:border-r-neutral-700 animate-spin"></div>
      </div>
    );

  const getRandomPosts = () => {
    if (!posts || posts.length === 0) return [];
    const filteredPosts = posts.filter((p) => p._id !== id);
    const shuffled = filteredPosts.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const randomPosts = getRandomPosts();

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto px-5 lg:px-32 py-10">
      <div className="space-y-4">
        <div className="w-full h-[200px] md:h-[400px] lg:h-[500px] bg-cover bg-center overflow-hidden">
          <img
            src={post?.thumbnail}
            alt={post?.title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="space-y-4 border-b border-neutral-200 pb-4">
          <h2 className="text-3xl md:text-4xl font-bold md:leading-normal">
            {post?.title}
          </h2>
          <div className="flex flex-col md:flex-row gap-7 justify-between mt-4">
            <div className="flex items-center gap-4">
              <Avatar className="size-7 md:size-9">
                <AvatarImage
                  src={post?.author.profilePicture}
                  className="object-cover w-full h-full"
                />
                <AvatarFallback>
                  {getNameInitials(post?.author.name)}
                </AvatarFallback>
              </Avatar>

              <span className="text-sm">
                <p>Published by</p>
                <p className="text-base font-medium">{post?.author.name}</p>
              </span>
            </div>
            <p className="flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400">
              Published on {formatDate(post?.createdAt)}
              <Clock9 size={14} strokeWidth={3} />
              {getFormattedTime(post?.createdAt)}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-9 border-b border-neutral-200 pb-4">
        <div
          dangerouslySetInnerHTML={{
            __html: post?.content || "No description available.",
          }}
          className="ql-editor"
        />
      </div>
      {/* Share Section */}
      <div className="flex justify-end gap-2 mt-4 border-b border-neutral-200 pb-4">
        <p>Share On</p>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            post?.title
          )}&url=${encodeURIComponent(window.location.href)}`}
          target="_blank"
          rel="noreferrer"
          className="text-neutral-900 dark:text-white"
        >
          <Twitter size={24} className="fill-current" strokeWidth={0} />
        </a>
      </div>
      {/* Similar Blogs Section */}
      <div className="mt-9">
        <p className="text-2xl font-medium mb-6 border-b border-neutral-200 pb-4">
          Similar Blogs
        </p>
        <div className="flex flex-col gap-4 mt-4">
          {randomPosts.map((relatedPost) => (
            <div key={relatedPost._id}>
              <div className="flex items-center justify-between gap-4 border-b border-neutral-200 pb-4">
                <div className="basis-[80%] flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarImage
                        src={relatedPost.author.profilePicture}
                        className="object-cover w-full h-full"
                      />
                      <AvatarFallback>
                        {getNameInitials(relatedPost.author.name)}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm">{relatedPost.author.name}</p>
                    <span className="text-sm">
                      {formatDate(relatedPost.createdAt)}
                    </span>
                  </div>
                  <Link to={`/blog/${relatedPost._id}`} onClick={ScrollToTop}>
                    <h2 className="text-xl font-medium line-clamp-2">
                      {relatedPost.title}
                    </h2>
                  </Link>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        relatedPost?.content || "No description available.",
                    }}
                    className="line-clamp-3"
                  />
                  <div>
                    <span className="inline-block bg-neutral-100 dark:bg-neutral-800 px-3 py-1 text-sm text-neutral-500 dark:text-neutral-400 rounded-2xl">
                      {relatedPost.category}
                    </span>
                  </div>
                </div>
                <div className="w-20 h-20 md:w-32 md:h-32 overflow-hidden rounded-lg">
                  <Link to={`/blog/${relatedPost._id}`} onClick={ScrollToTop}>
                    <img
                      src={relatedPost.thumbnail}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
