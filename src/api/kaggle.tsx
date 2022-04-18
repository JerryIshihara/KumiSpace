import { withUrl } from "./constant";
import axios from "axios";


export interface KaggleCompetitionProps {
	name: string;
	category: string;
	reward: string;
	team_count: number;
	url: string;
	title: string;
	deadline: string;
	description: string;
	competition_header_image_url: string;
	organization_thumbnail_url: string;
}


export const get_competitions = async (token: string): Promise<any> => {
	const result = await axios({
		method: "GET",
		// headers: {
		// 	"x-access-tokens": token,
		// },
		url: withUrl("/kaggle_competitions"),
	});
	return result;
};


export const get_competition = async (name: string): Promise<any> => {
	const result = await axios({
		method: "GET",
		// headers: {
		// 	"x-access-tokens": token,
		// },
		url: withUrl("/kaggle_competitions/" + name),
	});
	return result;
};


export const join_pool = async (
	token: string,
	competition_name: string,
	description?: string,
	language?: string
): Promise<any> => {
	const result = await axios({
		method: "POST",
		headers: {
			"Authorization": token,
		},
		url: withUrl(`/kaggle_competitions/${competition_name}/pool`),
		data: {
			description,
			language,
		},
	});
	return result;
};


export const edit_pool = async (
	token: string,
	competition_name: string,
	description?: string,
	language?: string
): Promise<any> => {
	const result = await axios({
		method: "PUT",
		headers: {
			"Authorization": token,
		},
		url: withUrl(`/kaggle_competitions/${competition_name}/pool`),
		data: {
			description,
			language,
		},
	});
	return result;
};


export const get_pool_by_competition = async (
	competition_name: string,
): Promise<any> => {
	const result = await axios({
		method: "GET",
		url: withUrl(`/kaggle_competitions/${competition_name}/pool`),
	});
	return result;
};


export const get_my_team = async (
	token: string,
	competition_name: string,
): Promise<any> => {
	const result = await axios({
		method: "GET",
		url: withUrl(`/kaggle_competitions/${competition_name}/my-team`),
		headers: {
			"Authorization": token,
		}
	});
	return result;
};


export const create_team = async (
	token: string,
	competition_name: string,
	name: string,
	num_members: number,
	language?: string,
	description?: string,
): Promise<any> => {
	const result = await axios({
		method: "POST",
		headers: {
			"Authorization": token,
		},
		url: withUrl(`/kaggle_competitions/${competition_name}/groups`),
		data: {
			name, 
			num_members,
			language,
			description,
		},
	});
	return result;
};

export const leave_team = async (
	token: string,
	competition_name: string,
): Promise<any> => {
	const result = await axios({
		method: "PUT",
		headers: {
			"Authorization": token,
		},
		url: withUrl(`/kaggle_competitions/${competition_name}/leave`),
	});
	return result;
};

export const join_team = async (
	token: string,
	group_pid: string,
	language?: string,
): Promise<any> => {
	const result = await axios({
		method: "PUT",
		headers: {
			"Authorization": token,
		},
		url: withUrl(`/kaggle_competitions/groups`),
		data: {
			group_pid,
			language
		}
	});
	return result;
};

export const get_teams_by_competition_name = async (
	competition_name: string,
): Promise<any> => {
	const result = await axios({
		method: "GET",
		url: withUrl(`/kaggle_competitions/${competition_name}/groups`),
	});
	return result;
};

export const get_my_competitions = async (
	token: string,
): Promise<any> => {
	const result = await axios({
		method: "GET",
		url: withUrl(`/kaggle_competitions/my-competitions`),
		headers: {
			"Authorization": token
		}
	});
	return result;
};

