import React, { useState, useRef } from 'react';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, uploadPost } from '../../actions/UploadAction';

const PostShare = () => {
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const dispatch = useDispatch();
  const desc = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const reset = () => {
    setImage(null);
    desc.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    const description = desc.current.value.trim(); // Get trimmed description

  // Check if the description is empty and if no image is selected
  if (!description && !image) {
    alert('Please write something or upload an image before sharing!');
    return; // Prevent post submission if neither description nor image is provided
  }

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append('name', filename);
      data.append('file', image);

      newPost.image = filename;

      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }

    dispatch(uploadPost(newPost));
    reset();
  };

  return (
    <div className="  flex items-start gap-4 p-4 bg-white rounded-lg shadow-md">
      <img
        src={
          user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + 'defaultProfile.png'
        }
        alt=""
        className="w-12 h-12 rounded-full object-cover"
      />

      <div className="flex flex-col flex-1 ">
        <input
          type="text"
          placeholder="Write a caption..."
          ref={desc}
          className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          required
        />

        <div className="flex items-center gap-4 mb-4">
          <div
            className="flex items-center gap-2 text-blue-500 cursor-pointer"
            onClick={() => imageRef.current.click()}
          >
            <PhotoOutlinedIcon />
            Photo
          </div>
          <div className="flex items-center gap-2 text-green-500">
            <PlayCircleOutlineIcon />
            Video
          </div>
          <div className="flex items-center gap-2 text-red-500">
            <LocationOnOutlinedIcon />
            Location
          </div>
          <div className="flex items-center gap-2 text-yellow-500">
            <CalendarMonthOutlinedIcon />
            Schedule
          </div>
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Share'}
          </button>
          <input
            type="file"
            name="myImage"
            ref={imageRef}
            onChange={onImageChange}
            className="hidden"
          />
        </div>

        {image && (
          <div className="relative">
            <CloseOutlinedIcon
              onClick={() => setImage(null)}
              className="absolute top-2 right-2 text-white bg-gray-800 rounded-full cursor-pointer"
            />
            <img
              src={URL.createObjectURL(image)}
              alt=""
              className="w-full rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
