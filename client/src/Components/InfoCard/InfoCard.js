import React, { useEffect, useState } from 'react';
import { PencilIcon, LogOutIcon } from 'lucide-react';
import ProfileModal from '../ProfileModal/ProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as UserApi from '../../api/UserRequest.js';
import { logOut } from '../../actions/AuthAction';

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;

  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchProfileUser = async () => {
      try {
        setIsLoading(true);
        if (profileUserId === user._id) {
          setProfileUser(user);
        } else {
          const profileUser = await UserApi.getUser(profileUserId);
          setProfileUser(profileUser);
        }
      } catch (error) {
        console.error('Failed to fetch profile', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfileUser();
  }, [user, profileUserId]);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const ProfileInfoItem = ({ label, value }) => (
    <div className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
      <span className="text-sm font-medium text-gray-600">{label}</span>
      <span className="text-sm font-semibold text-gray-800">{value || 'Not specified'}</span>
    </div>
  );

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg w-full max-w-sm overflow-hidden">
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6">
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-bold text-gray-800">Profile Info</h4>
          {user._id === profileUserId && (
            <button 
              onClick={() => setModalOpened(true)} 
              className="text-gray-600 hover:text-purple-600 transition-colors group"
            >
              <PencilIcon 
                className="w-5 h-5 group-hover:rotate-6 transition-transform" 
                strokeWidth={2}
              />
            </button>
          )}
        </div>
      </div>

      <div className="p-6 space-y-2">
        <ProfileInfoItem 
          label="Status" 
          value={profileUser.relationship} 
        />
        <ProfileInfoItem 
          label="Lives in" 
          value={profileUser.livesin} 
        />
        <ProfileInfoItem 
          label="Works at" 
          value={profileUser.worksAt} 
        />
      </div>

      {user._id === profileUserId && (
        <div className="p-6 pt-0">
          <button
            onClick={handleLogOut}
            className="
              w-full 
              flex 
              items-center 
              justify-center 
              gap-2
              py-3 
              bg-red-500 
              text-white 
              font-semibold 
              rounded-lg 
              hover:bg-red-600 
              transition-colors 
              group
            "
          >
            <LogOutIcon 
              className="w-5 h-5 group-hover:-translate-x-1 transition-transform" 
              strokeWidth={2} 
            />
            Log Out
          </button>
        </div>
      )}

      <ProfileModal 
        modalOpened={modalOpened} 
        setModalOpened={setModalOpened} 
        data={user} 
      />
    </div>
  );
};

export default InfoCard;