import axios from "axios";



export const get_competitions = async (): Promise<any> => {
	const result = await axios({
		method: "GET",
		// headers: {
		// 	"x-access-tokens": token,
		// },
		url: "/kaggle",
	});
	return result;
};


export const get_competition = async (name: string): Promise<any> => {
	const result = await axios({
		method: "GET",
		// headers: {
		// 	"x-access-tokens": token,
		// },
		url: "/kaggle/" + name,
	});
	return result;
};


export const get_my_team = async (
	token: string,
	competition_name: string,
): Promise<any> => {
	const result = await axios({
		method: "GET",
		url: `/kaggle/${competition_name}/my-team`,
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
		url: `/kaggle/my-competitions`,
		headers: {
			"Authorization": token
		}
	});
	return result;
};
