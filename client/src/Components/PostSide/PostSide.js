import React from 'react';
import PostShare from '../PostShare/PostShare';
import Posts from '../Posts/Posts';

const PostSide = () => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-md">
      <PostShare />
      <Posts />
    </div>
  );
};

export default PostSide;
