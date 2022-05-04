import axios from "axios";
import { withUrl } from "./constant";
import { UserSkillProps } from "context/user";

export enum Gender {
	male = "M",
	female = "F",
}

export const get_user = async (token: string) => {
	const response = await axios({
		method: "GET",
		url: "/api/users/user",
		headers: {
			"Authorization": token,
		},
	});
	return response;
};

export const get_profile = async (token: string) => {
	const response = await axios({
		method: "GET",
		url: "/api/users/profile",
		headers: {
			"Authorization": token,
		},
	});
	return response;
};

export const get_myscreen_info = async (token: string) => {
	const response = await axios({
		method: "GET",
		url: "/api/users/info",
		headers: {
			"Authorization": token,
		},
	});
	return response;
};

export const edit_profile = async (token: string, new_profile: object) => {
	const response = await axios({
		method: "PUT",
		url: "/api/users/profile/edit",
		headers: {
			"Authorization": token,
		},
		data: new_profile,
	});
	return response;
};

export const upload_avatar = async (
	token: string,
	image: any,
	filename?: string
) => {

	let formData = new FormData();
	// const file = {
	// 	uri: URL.createObjectURL(image.originFile),
	// 	name: image.originFile.name,
	// 	type: image.originFile.type,
	// 	size: image.originFile.size,
	// 	slice: image.originFile.slice,
	// 	stream: image.originFile.stream,
	// 	arrayBuffer: image.originFile.arrayBuffer,
	// 	text: image.originFile.text,
	// };
	// console.log("API", file);
	formData.append("file", image, image.name);

	const response = await axios({
		method: "post",
		url: "/api/users/profile/avatar",
		headers: {
			"Content-Type": `multipart/form-data`,
			"Authorization": token,
		},
		responseType: "blob",
		data: formData,
	});
	// const response = await fetch("/users/profile/avatar"),{
	// 	method: "post",
	// 	body: formData,
	// 	headers: {
	// 		"Content-Type": `multipart/form-data`,
	// 		"Authorization": token,
	// 	},
	// });
	
	return response;
};

export const get_avatar = async (token: string) => {
	const response = await axios({
		method: "get",
		url: "/api/users/profile/avatar",
		headers: {
			"Authorization": token,
		},
	});
	return response;
};

export const get_skills = async (token: string) => {
	const response = await axios({
		method: "PUT",
		url: "/api/skills",
		headers: {
			"Authorization": token,
		},
	});
	return response;
};

export const add_skill = async (token: string, skill: UserSkillProps) => {
	const response = await axios({
		method: "PUT",
		url: "/api/skills/new",
		headers: {
			"Authorization": token,
		},
		data: skill,
	});
	return response;
};

export const edit_skill = async (
	token: string,
	pid: string,
	skill: UserSkillProps
) => {
	const response = await axios({
		method: "PUT",
		url: "/api/skills/" + pid,
		headers: {
			"Authorization": token,
		},
		data: skill,
	});
	return response;
};
