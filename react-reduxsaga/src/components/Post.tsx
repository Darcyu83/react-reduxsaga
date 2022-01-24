import React from "react";

function Post({ post }: { post: { id: number; title: string; body: string } }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <h1>{post.body}</h1>
    </div>
  );
}
export default Post;
