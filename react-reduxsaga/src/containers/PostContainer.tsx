import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {} from "react-router-dom";
import Post from "../components/Post";
import { getPostThunk, goToHome } from "../modules/posts";

function PostContainer({ postId }: { postId: number }) {
  const { data, isLoading, error } = useSelector(
    (state: {
      posts: {
        post: {
          isLoading: boolean;
          data: { id: number; title: string; body: string };
          error: boolean;
        };
      };
    }) => state.posts.post
  ) || { isLoading: false, data: null, error: null };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (data) return;
    dispatch<any>(getPostThunk(postId));
  }, [postId, dispatch, data]);

  if (isLoading && !data) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      <button onClick={() => navigate("/")}>goToHome</button>
      {data && <Post post={data} />}
    </div>
  );
}

export default PostContainer;
