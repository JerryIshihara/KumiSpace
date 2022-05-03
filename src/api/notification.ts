import axios from "axios";


export const get_notifications = async (token: string): Promise<any> => {
	const response = await axios({
		method: "GET",
        url: `/api/notifications/`,
        headers: {
            "Authorization": token,
        }
	});
	return response;
};

export const read_notification = async (pid: string): Promise<any> => {
	const response = await axios({
		method: "PUT",
		url: `/api/notifications/${pid}`,
	});
	return response;
};

export const delete_notification = async (pid: string): Promise<any> => {
	const response = await axios({
		method: "DELETE",
        url: `/api/notifications/${pid}`,
	});
	return response;
};
