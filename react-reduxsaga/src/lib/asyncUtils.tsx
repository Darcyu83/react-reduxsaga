import { Dispatch } from "react";
import { isConstructorDeclaration } from "typescript";

export const createPromiseThunk = (type: string, promiseCreator: any) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (id?: any) => async (dispatch: Dispatch<any>) => {
    console.log("type===", type);
    dispatch({ type });
    try {
      let payload: any;
      if (id) {
        payload = await promiseCreator(id);
      } else {
        payload = await promiseCreator();
      }

      dispatch({ type: SUCCESS, payload });
    } catch (error) {
      dispatch({ type: ERROR, payload: error, error: true });
    }
  };
};

export const makeReducerPerSection = (type: any, key: any) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return (state: any, action: any) => {
    switch (action.type) {
      case type:
        return { ...state, [key]: reducerUtils.loading() };
      case SUCCESS:
        return { ...state, [key]: reducerUtils.success(action.payload) };
      case ERROR:
        return { ...state, [key]: reducerUtils.error(action.error) };
      default:
        return state;
    }
  };
};

export const reducerUtils = {
  initial: (initialData: any = null) => ({
    loading: false,
    data: initialData,
    error: null,
  }),
  loading: (prevState = null) => ({
    loading: true,
    data: prevState,
    error: null,
  }),
  success: (payload: any) => ({
    loading: false,
    data: payload,
    error: null,
  }),
  error: (error: any) => ({
    loading: false,
    data: null,
    error: error,
  }),
};
