import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePost } from "@/context/postContext";
import { formatDate } from "@/utils/dataUtil";
import { getNameInitials } from "@/utils/stringUtil";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Trash2 } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

const Profile = () => {
  const { user, loading } = useAuth();
  const { posts, fetchByUser, loading: postLoading } = usePost();
  const { updateUserProfile, uploadUserAvatar, deleteUserProfile } = useUser();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user?.name);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(user?.profilePicture);

  useEffect(() => {
    if (user?.id) {
      const fetchData = async () => {
        await fetchByUser(user.id);
      };
      fetchData();
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
    if (user?.profilePicture) {
      setPreview(user.profilePicture);
    }
  }, [user?.name, user?.profilePicture]);

  const hasChanges = () => {
    return name !== user?.name || oldPassword || newPassword || selectedFile;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
      name,
    };

    if (oldPassword && newPassword) {
      updateData.oldPassword = oldPassword;
      updateData.newPassword = newPassword;
    }

    if (selectedFile) {
      const formData = new FormData();
      formData.append("profilePicture", selectedFile);
      await uploadUserAvatar(formData);
    }

    await updateUserProfile(updateData);
    setOpen(false);

    setOldPassword("");
    setNewPassword("");
    setSelectedFile(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

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
            {postLoading ? (
              Array(3)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="border-b flex items-center space-x-4 pb-4 mb-4 animate-pulse"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="size-6 bg-gray-200 rounded-full dark:bg-neutral-800"></div>
                        <div className="w-32 h-4 bg-gray-200 dark:bg-neutral-800 rounded"></div>
                      </div>
                      <div className="w-40 h-4 bg-gray-200 dark:bg-neutral-800 rounded mb-2"></div>
                      <div className="w-56 h-4 bg-gray-200 dark:bg-neutral-800 rounded"></div>
                      <div className="w-12 h-4 bg-gray-200 dark:bg-neutral-800 rounded mt-4"></div>
                    </div>
                    <div className="w-20 h-20 md:w-32 md:h-32 bg-gray-200 dark:bg-neutral-800 rounded-lg"></div>
                  </div>
                ))
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post._id}
                  className="border-b flex items-center space-x-4 pb-4 mb-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="size-6">
                        <AvatarImage src={user?.profilePicture} />
                        <AvatarFallback>
                          {getNameInitials(user?.name)}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        {user?.name} • {formatDate(user?.createdAt)}
                      </p>
                    </div>
                    <h2 className="text-lg md:text-xl font-medium text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-2">
                      {post.content || "No description available."}
                    </p>
                    <span className="inline-block bg-gray-100 dark:bg-neutral-800 px-3 py-1 text-sm text-gray-500 dark:text-gray-300 rounded-2xl mt-4">
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
              <p className="text-gray-500 dark:text-gray-300 text-center rounded-3xl bg-gray-100 dark:bg-neutral-900 p-4">
                No blogs published
              </p>
            )}
          </div>

          {/* Blog Section Ends */}

          {/* User Profile */}
          <div className="basis-[20%] md:sticky top-28 h-full">
            {loading ? (
              <div className="flex flex-col items-center justify-center md:items-start md:border-l md:px-10">
                <Skeleton className="size-32 rounded-full" />
                <div className="flex flex-col items-center md:items-start space-y-2 mt-4">
                  <Skeleton className="w-32 h-5" />
                  <Skeleton className="w-40 h-5" />
                  <Skeleton className="w-36 h-5" />
                </div>
                <div className="flex flex-col gap-2 items-center md:items-start mt-4">
                  <Skeleton className="w-28 h-5" />
                  <Skeleton className="w-20 h-5" />
                </div>
              </div>
            ) : (
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

                {/* Edit Profile Section */}
                <div className="mt-4">
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full sm:w-auto bg-blue-800 hover:bg-blue-700">
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">
                          Edit Profile
                        </DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here.
                        </DialogDescription>
                      </DialogHeader>
                      <form className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <Avatar className="w-20 h-20">
                              <AvatarImage
                                src={preview}
                                alt="Profile picture"
                                className="w-full h-full object-cover"
                              />
                              <AvatarFallback>
                                {getNameInitials(user?.name)}
                              </AvatarFallback>
                            </Avatar>
                            <label
                              htmlFor="picture"
                              className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1 rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
                            >
                              <Camera className="w-4 h-4" />
                              <Input
                                id="picture"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                              />
                            </label>
                          </div>
                          <div className="flex-1">
                            <Label
                              htmlFor="name"
                              className="text-sm font-medium"
                            >
                              Name
                            </Label>
                            <Input
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <div>
                          <Label
                            htmlFor="email"
                            className="text-sm font-medium"
                          >
                            Email
                          </Label>
                          <Input
                            id="email"
                            value={user?.email}
                            disabled
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">
                            Old password (Optional)
                          </Label>
                          <Input
                            type="password"
                            className="mt-1"
                            onChange={(e) => setOldPassword(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">
                            New password (Optional)
                          </Label>
                          <Input
                            type="password"
                            className="mt-1"
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>
                        <DialogFooter>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                className="w-full sm:w-auto bg-blue-800 hover:bg-blue-700"
                                disabled={loading || !hasChanges()}
                              >
                                Save Changes
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to update your profile?
                                  This action will save the changes you have
                                  made.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={handleSubmit}
                                  className="bg-blue-800 hover:bg-blue-700"
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Edit Profile Section Ends  */}

                <div className="mt-4">
                  <p className="font-semibold">
                    Joined on{" "}
                    {user?.createdAt
                      ? formatDate(user.createdAt)
                      : "Loading..."}
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
                        <AlertDialogAction
                          onClick={handleDeleteUser}
                          className="bg-blue-800 hover:bg-blue-700"
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
