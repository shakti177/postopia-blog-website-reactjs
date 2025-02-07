// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { usePost } from "@/context/postContext";
// import { formatDate } from "@/utils/dataUtil";
// import { getNameInitials } from "@/utils/stringUtil";
// import { getFormattedTime } from "@/utils/timeUtil";
// import { Clock9 } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const Blog = () => {
//   const { id } = useParams();
//   const { post, fetchPost, loading } = usePost();
//   const [blog, setBlog] = useState(null);
//   const [isBlogLoading, setIsBlogLoading] = useState(true);

//   useEffect(() => {
//     if (id) {
//       setIsBlogLoading(true);
//       fetchPost(id);
//       setIsBlogLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     if (post) {
//       setBlog(post);
//     } else {
//       setBlog(null);
//     }
//   }, [post]);

//   if (loading || isBlogLoading) return <h1>Loading...</h1>;

//   return (
//     <>
//       <div className="container mx-auto px-5 lg:px-32 py-10">
//         <div className="space-y-4">
//           <div className="w-full h-[200px] md:h-[400px] lg:h-[500px] bg-cover bg-center overflow-hidden">
//             <img
//               src={blog?.thumbnail}
//               alt={blog?.title}
//               className="object-cover w-full h-full"
//             />
//           </div>
//           <div className="space-y-4 border-b border-neutral-200 pb-4">
//             <h2 className="text-3xl md:text-4xl font-bold md:leading-normal">
//               {blog?.title}
//             </h2>
//             <div className="flex flex-col md:flex-row gap-7 justify-between mt-4">
//               <div className="flex items-center gap-4">
//                 <Avatar className="size-7 md:size-9">
//                   <AvatarImage
//                     src={blog?.authorPicture}
//                     className="object-cover w-full h-full"
//                   />
//                   <AvatarFallback>
//                     {getNameInitials(blog?.authorName)}
//                   </AvatarFallback>
//                 </Avatar>

//                 <span className="text-sm">
//                   <p>Published by</p>
//                   {blog?.authorName}
//                 </span>
//               </div>
//               <p className="flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400">
//                 Published on {formatDate(blog?.createdAt)}
//                 <Clock9 size={14} strokeWidth={3} />
//                 {getFormattedTime(blog?.createdAt)}
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="mt-9 border-b border-neutral-200 pb-4">
//           <div
//             dangerouslySetInnerHTML={{
//               __html: blog?.content || "No description available.",
//             }}
//             className="ql-editor"
//           />
//         </div>
//         <div className="mt-9">
//           <p className="text-xl">Similar Blogs</p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Blog;

import React from "react";

const Blog = () => {
  return <div>Blog</div>;
};

export default Blog;
