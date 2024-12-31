import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      category: "Lifestyle",
      title:
        "Create healthy habits, not restrictions. Wellness is a taste of being.",
      image:
        "https://wp.w3layouts.com/newsblog/wp-content/uploads/sites/22/2021/02/food.jpg",
    },
    {
      id: 2,
      category: "Travel",
      title:
        "Create an Art that shows the beauty in everyone’s ideas of flaws.",
      image:
        "https://wp.w3layouts.com/newsblog/wp-content/uploads/sites/22/2021/02/beauty.jpg",
    },
    {
      id: 3,
      category: "Food",
      title:
        "Addicted to Fashion is the Armor to survive the reality of Everyday Life.",
      image:
        "https://wp.w3layouts.com/newsblog/wp-content/uploads/sites/22/2021/02/fashion.jpg",
    },
    {
      id: 4,
      category: "Fashion",
      title:
        "To succeed in Life, you need 3 things: a wishbone, a backbone, a funny bone.",
      image:
        "https://wp.w3layouts.com/newsblog/wp-content/uploads/sites/22/2021/02/lifestyle.jpg",
    },
  ];

  return (
    <>
      <div className="w-full md:h-[28rem] lg:h-[40rem] p-5 lg:px-20 bg-neutral-100 dark:bg-neutral-950">
        <Swiper
          pagination={{
            clickable: true,
          }}
          loop={true}
          autoplay={{
            delay: 2000,
          }}
          modules={[Autoplay, Pagination]}
          className="w-full h-full"
          style={{
            "--swiper-pagination-color": "#1D40AF",
            "--swiper-pagination-bullet-inactive-color": "#999999",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bullet-size": "10px",
            "--swiper-pagination-bullet-horizontal-gap": "6px",
          }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="flex flex-col md:flex-row justify-between items-center h-full md:px-[38px]">
                <div>
                  <p className="inline-block px-3 py-1 font-medium rounded-[15px] text-blue-800 bg-blue-300">
                    {slide.category}
                  </p>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold lg:leading-[60px] mt-5 md:w-[90%] text-neutral-900 dark:text-neutral-100">
                    {slide.title}
                  </h2>
                </div>

                <div className="mt-5 md:mt-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="rounded-3xl"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default HeroSlider;
