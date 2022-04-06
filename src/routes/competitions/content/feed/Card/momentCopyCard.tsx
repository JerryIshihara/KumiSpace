import React from "react";
import "./style.less";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { TextEllipsis } from "components";

interface Props {
    url?: string;
    img?: string;
}

const MomentCard: React.FC<Props> = props => {
	return (
		<div className="strm-card-moment">
			<div className="strm-card-moment-avatar-title-container">
				<div className="strm-card-avatar">
					<Avatar size={45} icon={<UserOutlined />} />
				</div>
				<div className="strm-card-moment-title-container">
					<TextEllipsis numLines={1}>
						<h3>
							This is a great Club! 
						</h3>
					</TextEllipsis>
					<TextEllipsis numLines={2}>
						<span>
							This is a great Club! This is a great Club! This is a great Club! This is a great Club! This is a great Club! This is a great Club! 
						</span>
					</TextEllipsis>
				</div>
			</div>
			<div className="strm-card-moment-avatar-title-container">
				<div className="strm-card-avatar">
					<Avatar size={30} icon={<UserOutlined />} />
				</div>
				<div className="strm-card-moment-title-container">
					<TextEllipsis numLines={2}>
						<span>
							This is a great titleasfas! This is a great title! This is a great
							title! This is a great title! This is a great title! This is a
							great title!
						</span>
					</TextEllipsis>
				</div>
			</div>
		</div>
	);
};

export default MomentCard;
