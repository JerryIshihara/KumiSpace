import axios, { AxiosResponse }  from "axios";
import { withUrl } from "./constant";

// see flagger API documentation for specification
export const IdentityType = {
	email: "email",
	wechat: "wechat",
	phone: "phone",
};

export const login = async (idToken: string/* email: string, password: string */) => {
	const response = await axios({
		method: "POST",
		// url: withUrl("/users/login"),
		url: "/api/users/sessionLogin",
		data: {
			idToken
			// identity_type: IdentityType.email,
			// identifier: email.toLowerCase(),
			// credential: password,
		},
	});
	return response;
};

export const signup = async (idToken: string, firstName: string, lastName: string) => {
	const response = await axios({
		method: "POST",
		// url: "/api/users/signup",
		url: "/api/users/sessionSignUp",
		data: {
			idToken,
			firstName, 
			lastName,
			identity_type: IdentityType.email,
		},
	});
	return response;
};

export const log_out = async () => {
	const response = await axios({
		method: "PUT",
		// url: withUrl("/users/logout"),
		url: "/api/users/logout",
	});
	return response;
};

export const refresh = async (): Promise<AxiosResponse<any, any>> => {
	const response = await axios({
		method: "PUT",
		// url: withUrl("/users/logout"),
		url: "/api/users/refresh",
	});
	return response;
};
