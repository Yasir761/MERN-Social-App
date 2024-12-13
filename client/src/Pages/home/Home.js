import React from 'react';
import ProfileSide from '../../Components/profileSide/ProfileSide';
import PostSide from '../../Components/PostSide/PostSide';
import RightSide from '../../Components/RightSide/RightSide';

const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start w-full max-w-screen-xl mx-auto mt-8 gap-4">
      <ProfileSide />
      <PostSide />
      <RightSide />
    </div>
  );
};

export default Home;
