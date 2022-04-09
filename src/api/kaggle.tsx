import { withUrl } from "./constant";
import axios from "axios";

export interface KaggleCompetitionProps {
	name: string
	category : string
	reward : string
	team_count : number
	url : string
	title : string
	deadline : string
	description : string
	competition_header_image_url : string
	organization_thumbnail_url : string
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