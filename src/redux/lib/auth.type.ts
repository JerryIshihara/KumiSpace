// import { Dispatch, AnyAction } from "redux";
// import { connect } from "react-redux";
// import { RootState, AppDispatch } from "../store";
// import actions from "./auth.action";

// export enum authActionTypes {
// 	LOGIN_REQUEST = "LOGIN_REQUEST",
// 	LOGIN_SUCCESS = "LOGIN_SUCCESS",
// 	LOGIN_FAILURE = "LOGIN_FAILURE",
// 	LOGOUT = "LOGOUT",
// }
// export type AuthState = {
// 	authenticated: boolean;
// 	requesting: boolean;
// 	failed: boolean;
// 	token: any;
// };
// export type AuthAction = { type: authActionTypes; payload: any };
// export const AuthLocalStorageKey = "USER";

// export interface AuthProps extends AuthState {
// 	login: (email: string, password: string, callback?: any) => any;
// 	logout: () => any;
// }

// function _mapStateToProps(state: RootState) {
// 	return state.auth;
// }
// function _mapDispatchToProps(dispatch: any) {
// 	return {
// 		login: (email: string, password: string, callback?: any) => {
// 			dispatch(actions.login(email, password, callback));
// 		},
// 		logout: (callback?: any) => {
// 			dispatch(actions.logout(callback));
// 		},
// 	};
// }
// export const authConnector = connect(_mapStateToProps, _mapDispatchToProps);
// export type AuthReduxProps = typeof authConnector;
const a = ""
export default a;