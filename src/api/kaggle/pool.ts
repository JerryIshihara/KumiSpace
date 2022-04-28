import axios from "axios";


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
		url: `/kaggle/pool/${competition_name}`,
		data: {
			description,
			language,
		},
	});
	return result;
};


export const edit_pool = async (
	token: string,
	public_id: string,
	description?: string,
	language?: string
): Promise<any> => {
	const result = await axios({
		method: "PUT",
		headers: {
			"Authorization": token,
		},
		url: `/kaggle/pool/${public_id}`,
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
		url: `/kaggle/pool/${competition_name}`,
	});
	return result;
};