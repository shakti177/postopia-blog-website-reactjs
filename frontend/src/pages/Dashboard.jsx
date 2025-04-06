import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, X, Trash2, FileEditIcon } from "lucide-react";
import { usePost } from "@/context/postContext";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
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

const Dashboard = () => {
  const [searchText, setSearchText] = useState("");

  const { user } = useAuth();
  const { userPosts, fetchByUser, deletePost, loading } = usePost();

  useEffect(() => {
    if (user?.id) {
      const fetchData = async () => {
        await fetchByUser(user.id);
      };
      fetchData();
    }
  }, [user?.id]);

  const handleClear = () => {
    setSearchText("");
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      console.log("Searching for:", searchText);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleDetetePost = async (postId) => {
    await deletePost(postId);
  };

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="container mx-auto px-5 md:px-10 my-10">
        <h1 className="text-xl text-gray-900 dark:text-white mb-7 md:mb-5 border-b pb-4">
          Manage Blogs
        </h1>
        <div className="mt-10">
          {loading ? (
            Array(3)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="border-b flex items-center space-x-4 pb-4 mb-4 animate-pulse"
                >
                  <div className="w-20 h-20 md:w-32 md:h-32 bg-gray-200 dark:bg-neutral-800 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-32 h-4 bg-gray-200 dark:bg-neutral-800 rounded"></div>
                    </div>
                    <div className="w-40 h-4 bg-gray-200 dark:bg-neutral-800 rounded mb-2"></div>
                    <div className="w-56 h-4 bg-gray-200 dark:bg-neutral-800 rounded"></div>
                    <div className="w-12 h-4 bg-gray-200 dark:bg-neutral-800 rounded mt-4"></div>
                  </div>
                </div>
              ))
          ) : userPosts.length > 0 ? (
            <div className="flex flex-col gap-5 mt-5">
              {userPosts.map((post) => (
                <div
                  key={post._id}
                  className="flex items-center justify-between gap-3 md:gap-8 p-5 bg-gray-100 dark:bg-neutral-900 rounded-lg"
                >
                  <div className="w-20 h-20 md:w-32 md:h-32 overflow-hidden rounded-lg">
                    <img
                      src={post.thumbnail}
                      alt="post thumbnail"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 flex flex-col md:flex-row justify-between gap-2 md:gap-10">
                    <div className="space-y-2">
                      <Link to={`/blog/${post._id}`} onClick={ScrollToTop}>
                        <h2 className="inline md:text-xl font-semibold text-gray-900 dark:text-white line-clamp-2 leading-5 hover:underline hover:underline-offset-2">
                          {post.title}
                        </h2>
                      </Link>
                      <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-2">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: post.content || "No description available.",
                          }}
                        />
                      </p>
                      <Link to={`/category/${post?.category}`}>
                        <span className="inline-block bg-white dark:bg-neutral-800 px-3 py-1 text-sm text-gray-500 dark:text-gray-300 rounded-2xl mt-4">
                          {post.category}
                        </span>
                      </Link>
                    </div>
                    <div className="flex items-center gap-2 md:gap-6">
                      <Link to={`/editblog/${post._id}`}>
                        <FileEditIcon />
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Trash2 color="#ef4444" className="cursor-pointer" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. It will permanently
                              delete this blog post and remove it from our
                              servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDetetePost(post._id)}
                              className="bg-blue-800 hover:bg-blue-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-300 text-center rounded-3xl bg-gray-100 dark:bg-neutral-900 p-4">
              No blogs published
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
