import React from "react";
import Post from "./Post";

function PostList({ posts }: any) {
  return (
    <div>
      {posts.map((post: any) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
export default PostList;
