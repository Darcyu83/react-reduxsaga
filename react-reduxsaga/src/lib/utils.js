import { useParams } from "react-router-dom";

export const createPromiseThunk = (type, asyncOrPromiseAPIFunc) => {
  const [SUCCESS, ERROR] = [`${type}_success`, `${type}_error`];
  return (param) => async (dispatch) => {
    //요청시작
    dispatch({ type, param });
    try {
      const payload = await asyncOrPromiseAPIFunc(param);
      dispatch({ type: SUCCESS, payload });
    } catch (error) {
      dispatch({ type: ERROR, payload: error, error: true });
    }
  };
};

export const reducerUtils = {
  initial: (initialData = null) => ({
    isLoading: false,
    data: initialData,
    error: null,
  }),
  loading: (prevState = null) => ({
    isLoading: true,
    data: prevState,
    error: null,
  }),
  success: (payload) => ({
    isLoading: false,
    data: payload,
    error: null,
  }),
  error: (error) => ({
    isLoading: false,
    data: null,
    error: error,
  }),
};

export const handleAsyncActions = (type, key, keepData = false) => {
  const [SUCCESS, ERROR] = [`${type}_success`, `${type}_error`];

  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(keepData ? state[key].data : null),
        };
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload),
        };
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.error),
        };
      default:
        return state;
    }
  };
};

const defaultIdSelector = (param) => param;

export const createPromiseThunkById = (
  type,
  promiseCreator,
  idSelector = defaultIdSelector
) => {
  const [SUCCESS, ERROR] = [`${type}_success`, `${type}_error`];

  return (param) => async (dispatch) => {
    const id = idSelector(param);
    dispatch({ type, meta: id });
    try {
      const payload = await promiseCreator(id);
      dispatch({ type: SUCCESS, payload, meta: id });
    } catch (error) {
      dispatch({ type: ERROR, error: true, payload: error, meta: id });
    }
  };
};

export const handleAsyncActionById = (type, key, keepData = false) => {
  const [SUCCESS, ERROR] = [`${type}_success`, `${type}_error`];

  return (state, action) => {
    const id = action.meta;
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.loading(
              keepData ? state[key][id] && state[key][id].data : null
            ),
          },
        };

      case SUCCESS:
        return {
          ...state,
          [key]: { ...state[key], [id]: reducerUtils.success(action.payload) },
        };

      case ERROR:
        return;
      default:
        return state;
    }
  };
};
