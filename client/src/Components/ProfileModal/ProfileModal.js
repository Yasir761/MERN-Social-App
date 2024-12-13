import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../actions/UploadAction';
import { updateUser } from '../../actions/UserAction';

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();

  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();

  const { user } = useSelector((state) => state.authReducer.authData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === 'profileImage'
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let UserData = formData;

    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append('name', fileName);
      data.append('file', profileImage);

      UserData.profilePicture = fileName;

      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }

    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append('name', fileName);
      data.append('file', coverImage);

      UserData.coverPicture = fileName;

      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }

    dispatch(updateUser(param.id, UserData));
    setModalOpened(false);
  };

  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        size="55%"
        overlayProps={{
          color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
        <form className="space-y-6">
          <h3 className="text-xl font-semibold">Update Your info</h3>

          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-2 border border-gray-300 rounded-md"
              name="firstname"
              onChange={handleChange}
              value={formData.firstname}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-2 border border-gray-300 rounded-md"
              name="lastname"
              onChange={handleChange}
              value={formData.lastname}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Works At"
              className="w-full p-2 border border-gray-300 rounded-md"
              name="worksAt"
              onChange={handleChange}
              value={formData.worksAt}
            />
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Lives in"
              className="w-full p-2 border border-gray-300 rounded-md"
              name="livesin"
              onChange={handleChange}
              value={formData.livesin}
            />
            <input
              type="text"
              placeholder="Country"
              className="w-full p-2 border border-gray-300 rounded-md"
              name="country"
              onChange={handleChange}
              value={formData.country}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Relationship Status"
              className="w-full p-2 border border-gray-300 rounded-md"
              name="relationship"
              onChange={handleChange}
              value={formData.relationship}
            />
          </div>

          <div className="space-y-2">
            <h5 className="text-lg font-medium">Profile Image</h5>
            <input
              type="file"
              name="profileImage"
              onChange={onImageChange}
              className="w-full text-gray-700 border border-gray-300 rounded-md p-2"
            />
            <h5 className="text-lg font-medium mt-4">Cover Image</h5>
            <input
              type="file"
              name="coverImage"
              onChange={onImageChange}
              className="w-full text-gray-700 border border-gray-300 rounded-md p-2"
            />
          </div>

          <button
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Update
          </button>
        </form>
      </Modal>
    </>
  );
}

export default ProfileModal;
