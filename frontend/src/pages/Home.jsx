import HeroSlider from "@/components/Hero/HeroSlider";
import Articles from "@/components/Posts/Articles";
import TopPicks from "@/components/TopPick/TopPicks";
import Newsletter from "@/components/Newsletter/Newsletter";
import React from "react";

const Home = () => {
  return (
    <>
      <HeroSlider />
      <TopPicks />
      <Articles />
      <Newsletter />
    </>
  );
};

export default Home;
