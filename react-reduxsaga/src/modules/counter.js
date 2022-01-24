import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const INCREASE_ASYNC = "INCREASE_ASYNC";
const DECREASE_ASYNC = "DECREASE_ASYNC";

// 액션 생성 함수
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const increaseSagaAsync = () => ({ type: INCREASE_ASYNC });
export const decreaseSagaAsync = () => ({ type: DECREASE_ASYNC });

export const increaseAsync = () => (dispatch, getState) => {
  setTimeout(() => {
    console.log("increaseAsync", getState());
    dispatch(increase());
  }, 1000);
};

export const decreaseAsync = () => (dispatch, getState) => {
  setTimeout(() => {
    console.log("decreaseAsync", getState());
    dispatch(decrease());
  }, 1000);
};

function* increaseSaga() {
  yield delay(1000);
  yield put(increase());
}
function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
}

export function* counterSaga() {
  yield takeEvery(INCREASE_ASYNC, increaseSaga); // 모든 INCREASE_ASYNC 액션을 처리
  yield takeLatest(DECREASE_ASYNC, decreaseSaga); // 가장 마지막으로 디스패치된 DECREASE_ASYNC 액션만을 처리
}

const initialState = 0;

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return state + 1;
    case DECREASE:
      return state - 1;
    default:
      return state;
  }
}
