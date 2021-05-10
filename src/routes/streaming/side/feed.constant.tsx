import {
	ThunderboltFilled,
	HomeFilled,
	CalendarFilled,
} from "@ant-design/icons";
import { RiGroupFill } from "react-icons/ri";
import "./style.less";

export const feedItems = [
	{
		title: "Home",
		path: "/",
		icon: () => <HomeFilled />,
	},
	// {
	// 	title: "Moments",
	// 	path: "/feed/moments",
	// 	icon: () => <ThunderboltFilled />,
	// },
	{
		title: "Clubs",
		path: "/feed/clubs",
		icon: () => (
			<RiGroupFill
				className="ant-menu-item-icon"
				style={{ verticalAlign: "-4%" }}
			/>
		),
	},
	{
		title: "Events",
		path: "/feed/events",
		icon: () => <CalendarFilled />,
	},
];
