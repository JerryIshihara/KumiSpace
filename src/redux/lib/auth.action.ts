// import { AppDispatch } from "../store";
// import { authActionTypes, AuthAction, AuthLocalStorageKey } from "./auth.type";
// import AuthService from "../../api/auth";

// function login(email: string, password: string, callback?: any) {
// 	return (dispatch: AppDispatch) => {
// 		dispatch(request());
// 		AuthService.login(email, password)
// 			.then(response => {
// 				localStorage.setItem(AuthLocalStorageKey, response);
//                 dispatch(success(response));
// 				callback();
// 			})
//             .catch(error => {
//                 console.error(error);
// 				dispatch(failure(error));
// 			});
// 	};

// 	function request(): AuthAction {
// 		return { type: authActionTypes.LOGIN_REQUEST, payload: "" };
// 	}
// 	function success(response: any): AuthAction {
// 		return { type: authActionTypes.LOGIN_SUCCESS, payload: response };
// 	}
// 	function failure(error: any): AuthAction {
// 		return { type: authActionTypes.LOGIN_FAILURE, payload: error };
// 	}
// }
// export type loginType = typeof login;

// function logout(callback?: any) {
// 	// remove local storage
// 	localStorage.removeItem(AuthLocalStorageKey);
// 	callback();
// 	return { type: authActionTypes.LOGOUT, payload: "" };
// }
// export type logoutType = typeof logout;

// const actions = {
// 	login,
// 	logout,
// };

// export default actions;
const a = ""
export default a;