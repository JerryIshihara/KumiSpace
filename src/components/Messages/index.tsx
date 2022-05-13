import React, { useMemo, useState } from "react";
import "./style.less"
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "@arco-design/web-react/dist/css/arco.css";
import { Comment, Button, Input } from "@arco-design/web-react";
import { IconMessage } from "@arco-design/web-react/icon";
import { useUser } from "context/user";
import { useCompetition } from "context/kaggleCompetition";
import { timePassed } from "utils/time";
import { useAuth } from "context/auth";
import { write_comment } from "api/kaggle/group";
import { message } from "antd";

const Messages = () => {
	const auth = useAuth();
	const compContext = useCompetition();
	const [content, setContent] = useState<string>();
	const messeges = useMemo(
		() =>
			compContext.myTeam?.team?.comments.map(comment => (
				<Comment
					align="right"
					// actions={
					// 	<span className="custom-comment-action">
					// 		<IconMessage /> Reply
					// 	</span>
					// }
					author={comment.user.profile.username}
					avatar={
						<Avatar
							src={comment.user.avatar ? comment.user.avatar.url : undefined}
							icon={<UserOutlined />}
						/>
					}
					content={<div>{comment.content}</div>}
					datetime={timePassed(comment.sent_on)}
				></Comment>
			)),
		[compContext.myTeam]
	);
	const leaveComment = () => {
		if (compContext.myTeam?.team?.public_id && content) {
			const pid = compContext.myTeam?.team?.public_id;
			auth.authorizedAPI(
				token => write_comment(token, pid, content),
				res => {
					console.log(res);
					
					compContext.fetch_my_team && compContext.fetch_my_team();
					message.success("You wrote a comment!");
					setContent(undefined);
				},
				e => {
					console.warn(e.response);
					message.error("Error");
				},
				() => {}
			);
		}
	};
	return (
		<>
			<h1>Comments</h1>
			{messeges}
			<Comment
				align="right"
				actions={[
					<Button
						key="0"
						type="secondary"
						onClick={() => {
							setContent(undefined);
						}}
					>
						Cancel
					</Button>,
					<Button key="1" type="primary" onClick={leaveComment}>
						Reply
					</Button>,
				]}
				// avatar={
				// 	userContext?.user?.avatar ? userContext?.user?.avatar.url : undefined
				// }
				content={
					<div>
						<Input.TextArea
							placeholder="Here is your content."
							value={content}
							onChange={value => {
								setContent(value);
							}}
						/>
					</div>
				}
			></Comment>
		</>
	);
};

export default Messages;
