import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Clock9 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { usePost } from "@/context/postContext";
import { getNameInitials } from "@/utils/stringUtil";
import { formatDate } from "@/utils/dataUtil";
import { getFormattedTime } from "@/utils/timeUtil";
import { Link } from "react-router-dom";

const TopPicks = () => {
  const { posts, fetchPosts, loading } = usePost();

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-5 md:px-10 py-24">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Top Picks of This Month
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(0, 3).map((post) =>
          loading ? (
            <div>
              <Skeleton className="h-[350px] md:h-[370px] rounded-2xl" />
              <div className="space-y-2 mt-4">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ) : (
            <div
              key={post._id}
              className="relative h-[400px] md:h-[470px] bg-cover bg-center rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-300"
              style={{
                backgroundImage: `url(${post.thumbnail})`,
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h2 className="text-2xl font-bold text-white mb-4 line-clamp-3">
                  <Link to={`/blog/${post._id}`}> {post.title}</Link>
                </h2>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-14 w-14 border-2 border-neutral-400">
                    <AvatarImage
                      src={post.authorPicture}
                      className="object-cover w-full h-full"
                    />
                    <AvatarFallback>
                      {getNameInitials(post.authorName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="text-lg font-medium text-white">
                      {post.authorName}
                    </span>
                    <p className="flex items-center justify-center gap-2 text-white text-sm lg:text-base">
                      {formatDate(post.createdAt)}{" "}
                      <Clock9 size={14} strokeWidth={3} />{" "}
                      {getFormattedTime(post.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TopPicks;
