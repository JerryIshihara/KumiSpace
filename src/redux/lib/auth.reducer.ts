import produce from "immer";
import { AuthState, AuthAction, authActionTypes } from "./auth.type";

const initialState: AuthState = {
	authenticated: false,
    requesting: false,
    failed: false,
	token: null,
};

const authReducer = (state: AuthState = initialState, action: AuthAction) => {
	switch (action.type) {
		case authActionTypes.LOGIN_REQUEST:
			return produce(state, copy => {
                copy.requesting = true;
                copy.failed = false;
				copy.token = action.payload;
			});
		case authActionTypes.LOGIN_SUCCESS:
			return produce(state, copy => {
				copy.authenticated = true;
                copy.requesting = false;
                copy.failed = false;
				copy.token = action.payload;
			});
		case authActionTypes.LOGIN_FAILURE:
			return produce(state, copy => {
				copy.authenticated = false;
                copy.requesting = false;
                copy.failed = true;
				copy.token = null;
			});
		case authActionTypes.LOGOUT:
			return produce(state, copy => {
				copy.authenticated = false;
                copy.requesting = false;
                copy.failed = false;
				copy.token = null;
			});
		default:
            return produce(state, copy => {
				copy.authenticated = false;
                copy.requesting = false;
                copy.failed = false;
				copy.token = null;
			});
	}
};

export default authReducer;