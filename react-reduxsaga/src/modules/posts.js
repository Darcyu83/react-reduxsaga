import * as postsAPI from "../api/posts";
import {
  createPromiseThunk,
  createPromiseThunkById,
  handleAsyncActions,
  reducerUtils,
} from "../lib/utils";

const GET_POSTS = "posts/get";
const GET_POSTS_SUCCESS = "posts/get_success";
const GET_POSTS_ERROR = "posts/get_error";

const GET_POST = "post/get";
const GET_POST_SUCCESS = "post/get_success";
const GET_POST_ERROR = "post/get_error";

const CLEAR_POST = "post/clear";
// 프로미스를 다루는 리덕스 모듈을 다룰 땐 다음과 같은 사항을 고려해야합니다.

// 프로미스가 시작, 성공, 실패했을때 다른 액션을 디스패치해야합니다.
// 각 프로미스마다 thunk 함수를 만들어주어야 합니다.
// 리듀서에서 액션에 따라 로딩중, 결과, 에러 상태를 변경해주어야 합니다.

export function getPosts1() {
  return async (dispatch) => {
    dispatch({ type: GET_POSTS });
    try {
      const posts = await postsAPI.getPosts();
      dispatch({ type: GET_POSTS_SUCCESS }, posts);
    } catch (error) {
      dispatch({ type: GET_POSTS_ERROR }, error);
    }
  };
}

export const getPost1 = (id) => (dispatch) => {
  dispatch({ type: GET_POST });

  postsAPI
    .getPostById(id)
    .then((post) => dispatch({ type: GET_POST_SUCCESS, post }))
    .catch((error) => dispatch({ type: GET_POST_ERROR, error }));
};

export const getPostsThunk = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPostThunk = createPromiseThunkById(
  GET_POST,
  postsAPI.getPostById
);

const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial(),
};

export default function recucer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      const postsReducer = handleAsyncActions(GET_POSTS, "posts", true);
      return postsReducer(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      const postReducer = handleAsyncActions(GET_POST, "post");
      return postReducer(state, action);

    default:
      return state;
  }
}

export const goToHome =
  () =>
  (dispatch, getState, { history }) => {
    history.push("/");
  };
