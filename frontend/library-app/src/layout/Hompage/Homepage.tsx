import React from "react";
import { Carousel } from "./components/Carousel";
import { ExploreNewBooks } from "./components/ExploreNewBooks";
import { Heros } from "./components/Heros";
import { LibraryServices } from "./components/LibraryServices";

export const Homepage = () => {
  return (
    <>
      <ExploreNewBooks />
      <Carousel />
      <Heros />
      <LibraryServices />
    </>
  );
};
