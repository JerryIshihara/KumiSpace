import axios, { AxiosResponse }  from "axios";
import { withUrl } from "./constant";

// see flagger API documentation for specification
export const IdentityType = {
	email: "email",
	wechat: "wechat",
	phone: "phone",
};

export const login = async (email: string, password: string) => {
	const response = await axios({
		method: "PUT",
		// url: withUrl("/users/login"),
		url: "/users/login",
		data: {
			identity_type: IdentityType.email,
			identifier: email.toLowerCase(),
			credential: password,
		},
	});
	return response;
};

export const signup = async (email: string, password: string, firstName: string, lastName: string) => {
	const response = await axios({
		method: "POST",
		url: withUrl("/users/signup"),
		data: {
			firstName, 
			lastName,
			identity_type: IdentityType.email,
			identifier: email.toLowerCase(),
			credential: password,
		},
	});
	return response;
};

export const log_out = async () => {
	const response = await axios({
		method: "PUT",
		// url: withUrl("/users/logout"),
		url: "/users/logout",
	});
	return response;
};

export const refresh = async (): Promise<AxiosResponse<any, any>> => {
	const response = await axios({
		method: "PUT",
		// url: withUrl("/users/logout"),
		url: "/users/refresh",
	});
	return response;
};
