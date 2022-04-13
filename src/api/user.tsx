import axios from "axios";
import { type } from "os";
import { withUrl } from "./constant";
import { UserSkillProps } from "context/user";

export enum Gender {
	male = "M",
	female = "F",
}


export const get_user = async (token: string) => {
	const response = await axios({
		method: "GET",
		url: withUrl("/users/user"),
		headers: {
			"Authorization": token,
		},
	});
	return response;
};

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

export const edit_profile = async (token: string, new_profile: object) => {
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


export const get_skills = async (token: string) => {
	const response = await axios({
		method: "PUT",
		url: withUrl("/skills"),
		headers: {
			"Authorization": token,
		},
	});
	return response;
};



export const add_skill = async (token: string, skill: UserSkillProps) => {
	const response = await axios({
		method: "PUT",
		url: withUrl("/skills/new"),
		headers: {
			"Authorization": token,
		},
		data: skill,
	});
	return response;
};

export const edit_skill = async (token: string, pid: string, skill: UserSkillProps) => {
	const response = await axios({
		method: "PUT",
		url: withUrl("/skills/" + pid),
		headers: {
			"Authorization": token,
		},
		data: skill,
	});
	return response;
};

