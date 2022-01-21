import { combineReducers } from "redux";
import counter from "./counter";
import posts from "./posts";

const rootReducer = combineReducers({ counter, posts });

export type TState = ReturnType<typeof rootReducer>;
export default rootReducer;
