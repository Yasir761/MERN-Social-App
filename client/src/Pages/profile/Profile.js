import React from 'react';
import ProfilePageLeft from '../../Components/ProfilePageLeft/ProfilePageLeft';
import ProfileCard from '../../Components/ProfileCard/ProfileCard';
import PostSide from '../../Components/PostSide/PostSide';
import RightSide from '../../Components/RightSide/RightSide';

const Profile = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between w-full max-w-screen-xl mx-auto mt-8 gap-6">
      {/* Left Side */}
      <div className="w-full lg:w-1/4">
        <ProfilePageLeft />
      </div>

      {/* Center Section */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <ProfileCard location="profilePage" />
        <PostSide />
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/4">
        <RightSide />
      </div>
    </div>
  );
};

export default Profile;
