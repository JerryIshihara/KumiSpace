import React from "react";
import "./style.less";
import { Avatar, Button, Divider, Tag } from "antd";
import {
	UserOutlined,
	LikeOutlined,
	MessageOutlined,
	SendOutlined,
	EllipsisOutlined,
} from "@ant-design/icons";
import { IoEllipsisHorizontalCircleOutline } from "react-icons/io5";
import { TextEllipsis } from "components";
import { LevelColor } from "components/Skill/skillColor";
import { Bullet } from "utils/text.constant";

interface Props {
	profile: { username: string } | any;
	skills?: Array<{
		name: string;
		level?: "beginner" | "intermediate" | "expert";
	}>;
	url?: string;
	img?: string;
	style?: React.CSSProperties;
}

const UserItem: React.FC<Props> = (props: Props) => {
	return (
		<div className="user-item-container" style={props.style}>
			<Avatar size={45} icon={<UserOutlined />} src={props.url} />
			<div className="user-item-title">
				<TextEllipsis style={{ fontSize: 14, fontWeight: "bold" }}>
					{props.profile?.username}
				</TextEllipsis>
				<TextEllipsis style={{ fontSize: 12 }} numLines={2}>
					{props.profile.occupation}{" "}
					{props.profile.occupation && props.profile.organization && "@"}{" "}
					{props.profile.organization}
				</TextEllipsis>
				<div className="user-item-tags">
					{props.skills?.map(skill => (
						<div className="horizontal-center">
							{skill.level && (
								<div
									style={{
										width: 10,
										height: 10,
										borderRadius: 50,
										marginRight: '4px',
										backgroundColor: LevelColor[skill.level],
									}}
								/>
							)}
							<span style={{ fontSize: 12 }}>{skill.name}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default UserItem;
