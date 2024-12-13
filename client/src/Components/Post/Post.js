import React, { useState } from 'react';
import './Post.css';
import Comment from '../../Img/comment.png';
import Share from '../../Img/share.png';
import Like from '../../Img/like.png';
import Notlike from '../../Img/notlike.png';
import { useSelector } from 'react-redux';
import { likePost } from '../../api/PostRequest';

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);

  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  return (
    <div className="post w-full max-w-2xl bg-white rounded-lg shadow-lg p-4 mb-4">
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ' '}
        alt=""
        className="w-full h-64 object-cover rounded-lg mb-4"
      />

      <div className="postReact flex gap-4 mb-2">
        <img
          src={liked ? Like : Notlike}
          alt=""
          className="cursor-pointer"
          onClick={handleLike}
        />
        <img src={Comment} alt="" className="cursor-pointer" />
        <img src={Share} alt="" className="cursor-pointer" />
      </div>

      <span className="text-gray-500 text-sm">{likes} likes</span>

      <div className="detail mt-2">
        <span className="font-bold">{data.name}</span>
        <span className="block text-gray-600 text-sm">{data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
