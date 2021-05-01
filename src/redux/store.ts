import { createStore, applyMiddleware, AnyAction, Dispatch } from "redux";
import thunkMiddleware from "redux-thunk";
import loggerMiddleware from "redux-logger";
import rootReducer from "./reducer";

const store = createStore(
	rootReducer,
	applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export default store;
