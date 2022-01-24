import React from "react";
import { Link } from "react-router-dom";
function PostList({ posts }: { posts: [] }) {
  return (
    <ul>
      {posts.map((post: { id: number; title: string; body: string }) => (
        <li key={post.id}>
          <Link to={`/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default PostList;
