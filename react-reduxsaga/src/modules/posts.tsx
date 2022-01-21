import { Dispatch } from "react";
import * as postsAPI from "../api/posts";
import {
  createPromiseThunk,
  makeReducerPerSection,
  reducerUtils,
} from "../lib/asyncUtils";

const GET_POSTS = "GET_POSTS";
const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
const GET_POSTS_ERROR = "GET_POSTS_ERROR";

const GET_POST = "GET_POST";
const GET_POST_SUCCESS = "GET_POST_SUCCESS";
const GET_POST_ERROR = "GET_POST_ERROR";

export const getPostsOld = () => async (dispatch: Dispatch<any>) => {
  dispatch({ type: GET_POSTS });

  try {
    const posts = await postsAPI.getPosts();
    dispatch({ type: GET_POSTS_SUCCESS, posts });
  } catch (error: any) {
    dispatch({ type: GET_POSTS_ERROR, error });
  }
};

export const getPostOld = (id: number) => async (dispatch: Dispatch<any>) => {
  dispatch({ type: GET_POST });
  try {
    const post = await postsAPI.getPostById(id);
    dispatch({ type: GET_POST_SUCCESS, post });
  } catch (error: any) {
    dispatch({ type: GET_POST_ERROR, error });
  }
};

export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPostById = createPromiseThunk(GET_POST, postsAPI.getPostById);
const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial(),
};

export function reducerOld(state = initialState, action: any) {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, posts: reducerUtils.loading() };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: reducerUtils.success(action.payload),
      };
    case GET_POSTS_ERROR:
      return {
        ...state,
        posts: reducerUtils.error(action.error),
      };
    case GET_POST:
      return { ...state, post: reducerUtils.loading() };
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: reducerUtils.success(action.payload),
      };
    case GET_POST_ERROR:
      return {
        ...state,
        post: reducerUtils.error(action.error),
      };

    default:
      return state;
  }
}

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      const postsReducer = makeReducerPerSection(GET_POSTS, "posts");
      return postsReducer(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      const postReducer = makeReducerPerSection(GET_POST, "post");
      return postReducer(state, action);
    default:
      return state;
  }
}
