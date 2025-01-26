import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePost } from "@/context/postContext";
import { formatDate } from "@/utils/dataUtil";
import { getNameInitials } from "@/utils/stringUtil";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileEdit from "@/components/EditProfile/ProfileEdit";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUser } from "@/context/userContext";

const Profile = () => {
  const { user } = useAuth();
  const { posts, fetchByUser } = usePost();
  const { deleteUserProfile } = useUser();

  useEffect(() => {
    if (user?.id) {
      fetchByUser(user.id);
    }
  }, [user?.id]);

  const handleDeleteUser = async () => {
    await deleteUserProfile();
  };

  return (
    <div className="bg-white dark:bg-black">
      <div className="container mx-auto px-5 md:px-10 py-4">
        <div className="flex flex-col-reverse md:flex-row gap-14 my-7">
          {/* Blog Section */}
          <div className="basis-[60%]">
            <h1 className="text-xl text-gray-900 dark:text-white mb-7 md:mb-5 border-b pb-4">
              Blogs Published
            </h1>
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post._id}
                  className="border-b flex items-center space-x-4 pb-4 mb-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Avatar className="size-6">
                        <AvatarImage src={user.profilePicture} />
                        <AvatarFallback>
                          {getNameInitials(user?.name)}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        {user?.name} • {formatDate(user.createdAt)}
                      </p>
                    </div>
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-2">
                      {post.content || "No description available."}
                    </p>
                    <span className="inline-block bg-gray-100 dark:bg-neutral-800 px-3 py-1 text-sm text-gray-500 dark:text-gray-300 rounded-2xl mt-2">
                      {post.category}
                    </span>
                  </div>
                  <div className="w-20 h-20 md:w-32 md:h-32 overflow-hidden rounded-lg">
                    <img
                      src={post.thumbnail}
                      alt="post thumbnail"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-300 text-center rounded-3xl bg-gray-50 dark:bg-neutral-900 p-4">
                No blogs published
              </p>
            )}
          </div>

          {/* User Profile */}
          <div className="basis-[20%]">
            <div className="flex flex-col items-center justify-center md:items-start md:border-l md:px-10">
              <div className="flex items-center space-x-4">
                <img
                  src={user?.profilePicture}
                  alt="profile"
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col items-center md:items-start space-y-2 mt-4">
                <h2 className="text-xl md:text-lg font-semibold text-gray-900 dark:text-white">
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
                <ProfileEdit />
              </div>
              <div className="mt-4">
                <p>
                  Joined on{" "}
                  {user?.createdAt ? formatDate(user.createdAt) : "Loading..."}
                </p>
              </div>
              <div className="mt-7">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div className="flex gap-1 items-center text-red-500 cursor-pointer">
                      <Trash2 size={18} />
                      Delete Account
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteUser}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
