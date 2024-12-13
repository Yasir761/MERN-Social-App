import React, { useEffect } from 'react';
import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getTimelinePosts } from '../../actions/PostAction';
import { useParams } from 'react-router-dom';

const Posts = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, [user._id]);

  if (params.id) {
    posts = posts.filter((post) => post.userId === params.id);

  }

 
  return (
    <div className="flex flex-col gap-4">
      {loading ? (
        <div className="text-center text-gray-500">Fetching Posts...</div>
      ) : (
        posts.map((post, id) => <Post data={post} key={id} />)
      )}
    </div>
  );
};

export default Posts;
