import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import { Skeleton } from "../ui/skeleton";
import { usePost } from "@/context/postContext";

const HeroSlider = () => {
  const { posts, fetchPosts, loading } = usePost();

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div className="p-5 md:px-[38px] lg:px-[120px]">
        {loading ? (
          <div>
            <Skeleton className="h-[400px] md:h-[600px] rounded-3xl" />
          </div>
        ) : (
          <Swiper
            pagination={{
              clickable: true,
            }}
            loop={true}
            autoplay={{
              delay: 2500,
            }}
            spaceBetween={30}
            modules={[Autoplay, Pagination]}
            style={{
              "--swiper-pagination-color": "#1D40AF",
              "--swiper-pagination-bullet-inactive-color": "#999999",
              "--swiper-pagination-bullet-inactive-opacity": "1",
              "--swiper-pagination-bullet-size": "10px",
              "--swiper-pagination-bullet-horizontal-gap": "6px",
            }}
          >
            {posts.slice(0, 4).map((slide) => (
              <SwiperSlide key={slide._id}>
                <div className="flex flex-col md:flex-row items-center justify-between space-y-5 md:space-y-0 pb-10 md:py-10">
                  <div className="md:w-[90%]">
                    <p className="inline-block px-3 py-1 font-medium rounded-[15px] text-blue-800 bg-blue-300">
                      {slide.category}
                    </p>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold lg:leading-[60px] mt-5 md:w-[90%] text-neutral-900 dark:text-neutral-100 line-clamp-3">
                      {slide.title}
                    </h2>
                  </div>

                  <div className="w-full md:w-[50%] h-[400px] lg:h-[500px] relative rounded-lg overflow-hidden">
                    <img
                      src={slide.thumbnail}
                      alt={slide.title}
                      className="w-full h-full object-cover rounded-3xl"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
};

export default HeroSlider;
