import axios from "axios";
import { withUrl } from "api/constant";

export const get_notifications = async (token: string): Promise<any> => {
	const response = await axios({
		method: "GET",
        url: withUrl(`/api/notifications/`),
        headers: {
            "Authorization": token,
        }
	});
	return response;
};

export const read_notification = async (pid: string): Promise<any> => {
	const response = await axios({
		method: "PUT",
		url: withUrl(`/api/notifications/${pid}`),
	});
	return response;
};

export const delete_notification = async (pid: string): Promise<any> => {
	const response = await axios({
		method: "DELETE",
        url: withUrl(`/api/notifications/${pid}`),
	});
	return response;
};
