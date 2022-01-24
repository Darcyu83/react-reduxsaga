import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostList from "../components/PostList";
import { getPostsThunk } from "../modules/posts";

function PostListContainer() {
  const { data, isLoading, error } = useSelector(
    (state: {
      posts: { posts: { data: []; isLoading: boolean; error: boolean } };
    }) => state.posts.posts
  );

  const dispatch = useDispatch();

  useEffect(() => dispatch<any>(getPostsThunk()), [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return <div>{data && <PostList posts={data} />}</div>;
}
export default PostListContainer;
