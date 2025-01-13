import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Clock9 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { getNameInitials } from "../../utils/stringUtil";

const TopPicks = () => {
  const posts = [
    {
      id: 1,
      title:
        "Right food baked with natural ingredient, the use of best quality products",
      image:
        "https://wp.w3layouts.com/newsblog/wp-content/uploads/sites/22/2021/02/pic3.jpg",
    },
    {
      id: 2,
      title:
        "The 5 Nonnegotiables of a Healthy Quarantine food that a Doctor-Approved",
      image:
        "https://wp.w3layouts.com/newsblog/wp-content/uploads/sites/22/2021/02/pic2.jpg",
    },
    {
      id: 3,
      title:
        "Fashion is Creating your Beauty image. The New fashion starts here",
      image:
        "https://wp.w3layouts.com/newsblog/wp-content/uploads/sites/22/2021/02/pic1.jpg",
    },
  ];

  const [loading, setloading] = useState(false);

  return (
    <div className="container mx-auto px-5 md:px-10 py-24">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Top Picks of This Month
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) =>
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
              key={post.id}
              className="relative h-[400px] md:h-[470px] bg-cover bg-center rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-300"
              style={{
                backgroundImage: `url(${post.image})`,
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {post.title}
                </h2>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-14 w-14 border-2 border-neutral-400">
                    <AvatarImage src="https://pbs.twimg.com/profile_images/1612332480685838337/DtMNGDSQ_400x400.jpg" />
                    <AvatarFallback>
                      {getNameInitials("shakti Tamrakar")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="text-lg font-medium text-white">
                      Shakti Tamrakar
                    </span>
                    <p className="flex items-center justify-center gap-2 text-white text-sm lg:text-base">
                      February 22, 2025. <Clock9 size={14} strokeWidth={3} />{" "}
                      7:29 am
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
