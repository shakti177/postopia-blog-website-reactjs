import HeroSlider from "@/components/Hero/HeroSlider";
import Articles from "@/components/Posts/Articles";
import TopPicks from "@/components/TopPick/TopPicks";
import React from "react";

const Home = () => {
  return (
    <>
      <HeroSlider />
      <TopPicks />
      <Articles />
    </>
  );
};

export default Home;
