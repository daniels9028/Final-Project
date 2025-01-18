import React from "react";
import ListPost from "./ListPost";

const Posts = ({
  explorePost,
  explorePage,
  handleDeletePost,
  openModalCrudPost,
}) => {
  return (
    <section>
      <div className="flex flex-col items-center w-full px-6 mx-auto lg:px-12 max-w-7xl">
        {explorePost?.map(
          (explore) =>
            explore.user && (
              <ListPost
                key={explore.id}
                explore={explore}
                handleDeletePost={handleDeletePost}
                openModalCrudPost={openModalCrudPost}
              />
            )
        )}
      </div>
    </section>
  );
};

export default Posts;
