import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const coverImage = user.coverPicture
    ? `${serverPublic}${user.coverPicture}`
    : `${serverPublic}defaultCover.jpg`;

  const profileImage = user.profilePicture
    ? `${serverPublic}${user.profilePicture}`
    : `${serverPublic}defaultProfile.png`;

  const postCount = posts.filter((post) => post.userId === user._id).length;

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      {/* Profile Card Container */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
        {/* Profile Images */}
        <div className="flex flex-col items-center gap-2">
          <img
            className="w-full h-32 object-cover rounded-t-lg"
            src={coverImage}
            alt="Cover"
          />
          <img
            className="w-24 h-24 object-cover rounded-full border-4 border-white -mt-12"
            src={profileImage}
            alt="Profile"
          />
        </div>

        {/* Profile Information */}
        <div className="text-center mt-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {user.firstname} {user.lastname}
          </h2>
          <p className="text-gray-500">
            {user.worksAt || 'Write about yourself...'}
          </p>
        </div>

        {/* Follow Status */}
        <div className="mt-6">
          <hr className="border-gray-300" />
          <div className="flex justify-around items-center my-4">
            <Stat label="Followers" count={user.followers.length} />
            <Divider />
            <Stat label="Following" count={user.following.length} />
            {location === 'profilePage' && (
              <>
                <Divider />
                <Stat label="Posts" count={postCount} />
              </>
            )}
          </div>
          <hr className="border-gray-300" />
        </div>

        {/* Profile Link */}
        {location !== 'profilePage' && (
          <div className="mt-4 text-center">
            <Link
              to={`/profile/${user._id}`}
              className="text-blue-500 hover:underline"
            >
              My Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

// Reusable Component for Statistics
const Stat = ({ label, count }) => (
  <div className="text-center">
    <span className="block text-xl font-bold text-gray-800">{count}</span>
    <span className="text-gray-500">{label}</span>
  </div>
);

// Divider Component
const Divider = () => <div className="w-px h-8 bg-gray-300"></div>;

export default ProfileCard;
