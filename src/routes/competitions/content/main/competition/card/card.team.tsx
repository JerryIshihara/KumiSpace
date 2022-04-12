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
import { TextEllipsis, UserItem } from "components";
import { Bullet } from "utils/text.constant";

interface Props {
	url?: string;
	img?: string;
}

const ClubCard: React.FC<Props> = props => {
    const numMember = Math.max(1, Math.min(4, Math.floor(Math.random() * 10)))
	return (
        <div className="strm-page-card strm-card-team-container">
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <TextEllipsis numLines={1} style={{fontSize: 20, fontWeight: 'bold', width: 'fit-content'}}>
                    Team name ({numMember}/5)
                </TextEllipsis>
                <Button style={{marginLeft: '16px'}} type="primary" ghost>Join</Button>
                </div>
			{[...Array(numMember)]
				.fill("")
				.map(_ => (
					<UserItem />
				))}

			{/* <img className="strm-page-card-image" alt="alt" src={props.img} />
			<div className="strm-page-card-social-activity">
				<LikeOutlined />
				<MessageOutlined />
				<SendOutlined />
				<Divider type="vertical" />
				<span className="strm-page-card-social-activity-stats">
					232 likes {Bullet} 432 comments
				</span>
				<Divider type="vertical" />
				<span className="strm-card-date-style">May 5</span>
			</div> */}
		</div>
	);
};

export default ClubCard;
