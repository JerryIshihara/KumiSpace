import { combineReducers } from 'redux';
import authReducer from "./lib/auth.reducer";

const rootReducer = combineReducers({ auth: authReducer });

export default rootReducer;

