import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import { getPostById } from "../modules/posts";

function PostContainer() {
  const { data, loading, error } = useSelector(
    (state: any) => state.posts.post
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostById(2));
  }, [dispatch]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;

  return (
    <div>
      PostContiner <hr />
      {data && <Post key={data.id} post={data} />}
    </div>
  );
}
export default PostContainer;
