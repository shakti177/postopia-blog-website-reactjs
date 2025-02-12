import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePost } from "@/context/postContext";
import { formatDate } from "@/utils/dataUtil";
import { getNameInitials } from "@/utils/stringUtil";
import { getFormattedTime } from "@/utils/timeUtil";
import { Clock9 } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Blog = () => {
  const { id } = useParams();
  const { post, fetchPost, loading } = usePost();

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
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
                  {post?.author.name}
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
        <div className="mt-9">
          <p className="text-xl">Similar Blogs</p>
        </div>
      </div>
    </>
  );
};

export default Blog;
