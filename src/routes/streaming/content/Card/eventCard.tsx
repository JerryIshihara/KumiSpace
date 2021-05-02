import React from "react";
import "./style.less";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import event_img from "../../../../assets/event.png";
import { TextEllipsis } from "../../../../components";

const ClubCard: React.FC = () => {
	return (
		<div className="strm-card">
			<img className="strm-card-image" alt="alt" src={event_img} />
			<div className="strm-card-avatar-title-container">
				
				<div className="strm-card-event-title-container">
					<TextEllipsis numLines={2}>
						<h3>
							This is a great title! This is a great title! This is a great
							title! This is a great title! This is a great title! This is a
							great title!
						</h3>
					</TextEllipsis>
				</div>
                {/* <div className="strm-card-avatar">
					<Avatar size={45} icon={<UserOutlined />} />
				</div> */}
            </div>
            <div className="strm-card-avatar-title-container">
				
				<div className="strm-card-event-time-container">
					<TextEllipsis numLines={2}>
						<h3>
							May 25th, 2021
						</h3>
					</TextEllipsis>
				</div>
                {/* <div className="strm-card-avatar">
					<Avatar size={45} icon={<UserOutlined />} />
				</div> */}
			</div>
		</div>
	);
};

export default ClubCard;
