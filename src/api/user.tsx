import axios from "axios";
import { withUrl } from "./constant";

export enum Gender {
	male = "M",
	female = "F",
}

export const get_profile = async (token: string) => {
	const response = await axios({
		method: "GET",
		url: withUrl("/users/profile"),
		headers: {
			"Authorization": token,
		},
	});
	return response;
};

export const get_myscreen_info = async (token: string) => {
	const response = await axios({
		method: "GET",
		url: withUrl("/users/info"),
		headers: {
			"Authorization": token,
		},
	});
	return response;
};

export const edit_profile = async (
	token: string,
	new_profile: object
) => {
	const response = await axios({
		method: "PUT",
		url: withUrl("/users/profile/edit"),
		headers: {
			"Authorization": token,
		},
		data: new_profile,
	});
	return response;
};

export const upload_avatar = async (
	token: string,
	filename: string,
	image: any
) => {
	// console.log(blob.type);

	let formData = new FormData();
	formData.append("file", image);
	// const response = await axios({
	// 	method: "post",
	// 	url: withUrl("/users/profile/avatar"),
	// 	headers: {
	// 		'Content-Type': `multipart/form-data`,
	// 		"x-access-tokens": token,
	// 	},
	// 	data: {
	// 		filename,
	// 		binary: blob
	// 	},
	// });
	const response = await fetch(withUrl("/users/profile/avatar"), {
		method: "post",
		body: formData,
		headers: {
			"Content-Type": `multipart/form-data`,
			"Authorization": token,
		},
	});
	return response;
};

export const get_avatar = async (token: string) => {
	const response = await axios({
		method: "get",
		url: withUrl("/users/profile/avatar"),
		headers: {
			"x-access-tokens": token,
		},
	});
	return response;
};
