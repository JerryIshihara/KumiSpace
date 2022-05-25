import React, { useMemo } from "react";
import "./style.less";
import { Avatar, Button, Divider, Tag } from "antd";
import { Tag as ATag } from "@arco-design/web-react";
import {
	UserOutlined,
	LikeOutlined,
	MessageOutlined,
	SendOutlined,
	EllipsisOutlined,
} from "@ant-design/icons";
import { IconLanguage } from "@arco-design/web-react/icon";
import { TextEllipsis } from "components";
import { LevelColor } from "components/Skill/skillColor";
import { Bullet } from "utils/text.constant";

interface Props {
	profile: { username: string } | any;
	skills?: Array<{
		name: string;
		level?: "beginner" | "intermediate" | "expert";
	}>;
	url?: string | null;
	language?: string;
	role?: "leader" | "member";
	style?: React.CSSProperties;
}

const UserItem: React.FC<Props> = (props: Props) => {
	const url = useMemo(
		() => props.url,
		[props.url]
	);
	return (
		<div className="user-item-container" style={props.style}>
			<Avatar size={45} icon={<UserOutlined />} src={url} />
			<div className="user-item-title" style={{width: 'fit-content'}}>
				<div className="horizontal-center" style={{gap: '16px'}}>
					<TextEllipsis style={{ fontSize: 14, fontWeight: "bold", width: 'fit-content' }}>
						{props.profile?.username}{" "}
					</TextEllipsis>
					{props.role === "leader" && (
						<ATag size="small" color={"arcoblue"}>
							Leader
						</ATag>
					)}
				</div>
				<TextEllipsis style={{ fontSize: 12 }} numLines={2}>
					{props.profile.occupation}{" "}
					{props.profile.occupation && props.profile.organization && "@"}{" "}
					{props.profile.organization}
				</TextEllipsis>
				{props.language && (
					<TextEllipsis style={{ marginTop: "4px" }}>
						<IconLanguage /> {props.language}
					</TextEllipsis>
				)}
				<div className="user-item-tags">
					{props.skills?.map(skill => (
						<div className="horizontal-center">
							{skill.level && (
								<div
									style={{
										width: 10,
										height: 10,
										borderRadius: 50,
										marginRight: "4px",
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
