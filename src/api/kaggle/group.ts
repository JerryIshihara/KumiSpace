import axios from "axios"

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
		url: `/api/kaggle/groups/${competition_name}`,
		data: {
			name, 
			num_members,
			language,
			description,
		},
	});
	return result;
};

export const edit_team = async (
	token: string,
	competition_name: string,
	name: string,
	num_members: number,
	description?: string,
): Promise<any> => {
	const result = await axios({
		method: "PUT",
		headers: {
			"Authorization": token,
		},
		url: `/api/kaggle/groups/${competition_name}`,
		data: {
			name, 
			num_members,
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
		method: "DELETE",
		headers: {
			"Authorization": token,
		},
		url: `/api/kaggle/${competition_name}/leave`,
	});
	return result;
};

// export const join_team = async (
// 	token: string,
// 	group_pid: string,
// 	language?: string,
// ): Promise<any> => {
// 	const result = await axios({
// 		method: "PUT",
// 		headers: {
// 			"Authorization": token,
// 		},
// 		url: `/api/kaggle/groups`,
// 		data: {
// 			group_pid,
// 			language
// 		}
// 	});
// 	return result;
// };


export const get_teams_by_competition_name = async (
	competition_name: string,
): Promise<any> => {
	const result = await axios({
		method: "GET",
		url: `/api/kaggle/groups/${competition_name}`,
	});
	return result;
};

export const make_join_request_decision = async (
	token: string,
	group_pid: string,
	requester_pid: string,
	accept: boolean,
): Promise<any> => {
	const result = await axios({
		method: "POST",
		headers: {
			"Authorization": token,
		},
		url: `/api/kaggle/groups/join/decision`,
		data: {
			group_pid,
			requester_pid,
			accept,
		},
	});
	return result;
};


export const send_join_team_request = async (
	token: string,
	group_pid: string,
	description?: string,
	language?: string
): Promise<any> => {
	const result = await axios({
		method: "POST",
		headers: {
			"Authorization": token,
		},
		url: `/api/kaggle/groups/join`,
		data: {
			group_pid,
			description,
			language,
		},
	});
	return result;
};

export const delete_join_team_request = async (
	token: string,
	group_pid: string,
): Promise<any> => {
	const result = await axios({
		method: "DELETE",
		headers: {
			"Authorization": token,
		},
		url: `/api/kaggle/groups/join`,
		data: {
			group_pid,
		}
	});
	return result;
};

export const edit_join_team_request = async (
	token: string,
	group_pid: string,
	description?: string,
	language?: string
): Promise<any> => {
	const result = await axios({
		method: "PUT",
		headers: {
			"Authorization": token,
		},
		url: `/api/kaggle/groups/join`,
		data: {
			group_pid,
			description,
			language,
		},
	});
	return result;
};

export const sent_invite_request = async (
	token: string,
	competitionName: string,
	invitee_pid: string,
): Promise<any> => {
	const result = await axios({
		method: "POST",
		headers: {
			"Authorization": token,
		},
		url: `/api/kaggle/groups/invites/${competitionName}`,
		data: {
			invitee_pid,
		},
	});
	return result;
};

export const make_invite_request_decision = async (
	token: string,
	group_pid: string,
	accept: boolean,
): Promise<any> => {
	const result = await axios({
		method: "POST",
		headers: {
			"Authorization": token,
		},
		url: `/api/kaggle/groups/invites/decision`,
		data: {
			group_pid,
			accept,
		},
	});
	return result;
};

export const write_comment = async (
	token: string,
	group_pid: string,
	content: string,
): Promise<any> => {
	const result = await axios({
		method: "POST",
		headers: {
			"Authorization": token,
		},
		url: `/api/kaggle/groups/comments`,
		data: {
			group_pid,
			content,
		},
	});
	return result;
};