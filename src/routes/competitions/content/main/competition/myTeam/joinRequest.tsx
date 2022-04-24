import React, {useState, useEffect} from "react";
import { Divider, Button, message, Input } from "antd";
import { Tag } from "@arco-design/web-react";
import { IconDelete } from "@arco-design/web-react/icon";

import { JoinRequestProps, TeamProps } from "types/kaggle";
import { TextEllipsis } from "components";
import { useCompetition } from "context/kaggleCompetition";

interface Props {
    myJoinRequest: {"my_request": JoinRequestProps, "group": TeamProps};
}
const MyJoinRequest: React.FC<Props> = React.memo(({ myJoinRequest }: Props) => {
    const compContext = useCompetition();
    const [description, setDescription] = useState<string>();
    const [language, setLanguage] = useState<string>();

    
    useEffect(() => {
        if (myJoinRequest) {
            setDescription(myJoinRequest.my_request.description)
            setLanguage(myJoinRequest.my_request.language)
        }
    }, [myJoinRequest])
	const decide_invite_request = (group_pid: string, accept: boolean) => {
		// make_invite_request_decision(auth.token, group_pid, accept)
		// 	.then(res => {
		// 		console.log(res);
		// 	})
		// 	.catch(e => {
		// 		console.warn(e.response);
		// 	});
	};

    return (
        <>
					<h2>My Join Request</h2>
					<Divider />
					<div
						className="strm-page-card strm-card-team-container"
						style={{
							display: "flex",
							flexDirection: "row",
						}}
					>
						<div
							style={{
								flex: 1,
								display: "flex",
								flexDirection: "column",
								margin: 0,
							}}
						>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<TextEllipsis
									numLines={1}
									style={{
										fontSize: 18,
										fontWeight: "bold",
										width: "fit-content",
									}}
								>
									{myJoinRequest.group.name}
								</TextEllipsis>
								<span
									style={{
										marginLeft: "auto",
										marginRight: "8px",
										color: "GrayText",
									}}
								>
									Updated on:{" "}
									{myJoinRequest.my_request.updated_on.split("T")[0] +
										" " +
										myJoinRequest.my_request.updated_on
											.split("T")[1]
											.split(".")[0]}
								</span>
								<Tag
									style={{
										marginRight: "8px",
									}}
									color={
										myJoinRequest.my_request.status === "accepted"
											? "green"
											: myJoinRequest.my_request.status === "rejected"
											? "red"
											: undefined
									}
								>
									{myJoinRequest.my_request.status}
								</Tag>
								<Button
									type="text"
									onClick={compContext.leave_competition}
									icon={<IconDelete />}
								/>
							</div>
						</div>
					</div>
					{myJoinRequest.my_request.status === "pending" && (
						<>
							<Divider />
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									// alignItems: "center",
								}}
							>
								<h4>Description</h4>
								<Input.TextArea
									value={description}
									onChange={e => {
										setDescription(e.target.value);
									}}
								/>
								<h4 style={{ marginTop: "16px" }}>Language</h4>
								<Input
									value={language}
									onChange={e => {
										setLanguage(e.target.value);
									}}
								/>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "16px",
										marginTop: "32px",
									}}
								>
									<Button
                                type="primary"
                                disabled={
                                    language === myJoinRequest.my_request.language &&
                                    description === myJoinRequest.my_request.description
                                }
                                onClick={() => { }}
									>
										Save
									</Button>
									<Button onClick={compContext.leave_competition}>Withdraw request</Button>
								</div>
							</div>
						</>
					)}
				</>
    )
});

export default MyJoinRequest;
