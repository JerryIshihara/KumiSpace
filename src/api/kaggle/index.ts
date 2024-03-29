import { withUrl } from "api/constant";
import axios from "axios";



export const get_competitions = async (): Promise<any> => {
	const result = await axios({
		method: "GET",
		// headers: {
		// 	"x-access-tokens": token,
		// },
		url: withUrl("/api/kaggle/"),
	});
	return result;
};

export const search_competitions = async (keyword: string | undefined): Promise<any> => {
	const result = await axios({
		method: "PUT",
		// headers: {
		// 	"x-access-tokens": token,
		// },
		url: withUrl("/api/kaggle/search"),
		data: {
			keyword
		}
	});
	return result;
};


export const get_competition = async (name: string): Promise<any> => {
	const result = await axios({
		method: "GET",
		// headers: {
		// 	"x-access-tokens": token,
		// },
		url: withUrl("/api/kaggle/" + name),
	});
	return result;
};


export const get_my_team = async (
	token: string,
	competition_name: string,
): Promise<any> => {
	const result = await axios({
		method: "GET",
		url: withUrl(`/api/kaggle/${competition_name}/my-team`),
		headers: {
			"Authorization": token,
		}
	});
	return result;
};

export const get_my_competitions = async (
	token: string,
): Promise<any> => {
	const result = await axios({
		method: "GET",
		url: withUrl(`/api/kaggle/my-competitions`),
		headers: {
			"Authorization": token
		}
	});
	return result;
};
