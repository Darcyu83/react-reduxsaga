import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostList from "../components/PostList";
import { getPosts } from "../modules/posts";

function PostListContainer() {
  const { data, loading, error } = useSelector(
    (state: any) => state.posts.posts
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  return <div>{data && <PostList posts={data} />}</div>;
}

export default PostListContainer;
