import React from "react";
import ListPost from "./ListPost";

const Posts = ({ explorePost, explorePage }) => {
  console.log(explorePost);
  return (
    <section className="mt-24">
      <div className="flex flex-col items-center w-full px-12 mx-auto max-w-7xl">
        {explorePost?.map(
          (explore) =>
            explore.user && <ListPost explore={explore} key={explore.id} />
        )}
      </div>
    </section>
  );
};

export default Posts;
