import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePost } from "@/context/postContext";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/dataUtil";

const Profile = () => {
  const { user } = useAuth();
  const { posts, fetchByUser } = usePost();

  useEffect(() => {
    if (user?.id) {
      fetchByUser(user.id);
    }
  }, [user?.id]);

  return (
    <div className="bg-white dark:bg-black">
      <div className="container mx-auto px-5 md:px-10 py-4">
        <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10">
          {/* Blog Section */}
          <div className="basis-[60%]">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Blogs Published
            </h1>
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post._id} className="p-4 border-b">
                  <h2 className="text-lg font-semibold">{post.title}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-3">
                    {post.content || "No description available."}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-300 text-center rounded-3xl bg-gray-50 dark:bg-neutral-900 p-4">
                No blogs published
              </p>
            )}
          </div>

          {/* User Profile */}
          <div className="basis-[40%] sticky top-28 h-full overflow-auto lg:block">
            <div className="flex flex-col md:border-l p-6">
              <div className="flex items-center space-x-4">
                <img
                  src={user?.profilePicture}
                  alt="profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
              <div className="space-y-2 mt-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {user?.name || "Anonymous User"}
                </h2>
                <p className="text-gray-500 dark:text-gray-300">
                  {user?.email || "No email available"}
                </p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <p>{posts.length} Blogs</p>
              </div>
              <div className="mt-4">
                <Button className="bg-blue-800 hover:bg-blue-700">
                  Edit Profile
                </Button>
              </div>
              <div className="mt-4">
                <p>
                  Joined on{" "}
                  {user?.createdAt ? formatDate(user.createdAt) : "Loading..."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
