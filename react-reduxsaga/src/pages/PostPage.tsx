import React from "react";
import { useParams } from "react-router-dom";
import PostContainer from "../containers/PostContainer";

function PostPage() {
  const params = useParams();

  console.log(params);

  const { id } = params;
  //   { id }: { id: string }
  return <>{id && <PostContainer postId={parseInt(id, 10)} />}</>;
}
export default PostPage;
