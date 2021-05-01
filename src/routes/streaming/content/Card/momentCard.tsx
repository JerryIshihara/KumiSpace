import React from "react";
import "./style.less";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { TextEllipsis } from "../../../../components";

interface Props {
    url?: string;
    img?: string;
}

const MomentCard: React.FC<Props> = props => {
	return (
		<div className="strm-card-moment">
			<img className="strm-card-moment-image" alt="alt" src={props.img} />
			<div className="strm-card-moment-avatar-title-container">
				<div className="strm-card-avatar">
					<Avatar size={30} icon={<UserOutlined />} />
				</div>
				<div className="strm-card-title-container">
					<TextEllipsis numLines={2}>
						<h3>
							This is a great title! This is a great title! This is a great
							title! This is a great title! This is a great title! This is a
							great title!
						</h3>
					</TextEllipsis>
				</div>
			</div>
		</div>
	);
};

export default MomentCard;
