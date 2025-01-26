import React from "react";
import ListPost from "./ListPost";

const Posts = ({
  explorePost,
  explorePage,
  handleDeletePost,
  formCrudPost,
  handleChangeCrudPost,
  handleUpdatePost,
  errorCrudPost,
  successCrudPost,
  loadingCrudPost,
  fileCrudPost,
  handleFileChangeCrudPost,
  isModalCrudPostOpen,
  openModalCrudPost,
  closeModalCrudPost,
  selectedPost,
  handleSelectPost,
}) => {
  return (
    <section>
      <div className="flex flex-col items-center w-full px-6 mx-auto lg:px-12 max-w-7xl">
        {explorePost?.map(
          (explore, index) =>
            explore.user && (
              <ListPost
                key={`${explore.id}-${index}`}
                explore={explore}
                handleDeletePost={handleDeletePost}
                formCrudPost={formCrudPost}
                handleChangeCrudPost={handleChangeCrudPost}
                handleUpdatePost={handleUpdatePost}
                errorCrudPost={errorCrudPost}
                successCrudPost={successCrudPost}
                loadingCrudPost={loadingCrudPost}
                fileCrudPost={fileCrudPost}
                handleFileChangeCrudPost={handleFileChangeCrudPost}
                isModalCrudPostOpen={isModalCrudPostOpen}
                openModalCrudPost={openModalCrudPost}
                closeModalCrudPost={closeModalCrudPost}
                selectedPost={selectedPost}
                handleSelectPost={handleSelectPost}
              />
            )
        )}
      </div>
    </section>
  );
};

export default Posts;
