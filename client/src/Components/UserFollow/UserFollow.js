import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unFollowUser } from '../../actions/UserAction';

const UserFollow = ({ person }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [following, setFollowing] = useState(person.followers.includes(user._id));

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleFollow = () => {
    following
      ? dispatch(unFollowUser(person._id, user))
      : dispatch(followUser(person._id, user));

    setFollowing((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
      <div className="flex items-center gap-3">
        <img
          src={person.profilePicture ? serverPublic + person.profilePicture : serverPublic + 'defaultProfile.png'}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">{person.firstname} {person.lastname}</span>
          <span className="text-sm text-gray-600">@{person.firstname}{person.lastname}</span>
        </div>
      </div>

      <button
        className={`px-4 py-2 rounded-full font-semibold text-white ${
          following ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
        } transition-colors duration-200`}
        onClick={handleFollow}
      >
        {following ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
};

export default UserFollow;
