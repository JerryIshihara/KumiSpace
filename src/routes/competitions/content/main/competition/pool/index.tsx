import React, { useMemo, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Divider } from "antd";
import { IconLanguage } from "@arco-design/web-react/icon";
import "./style.less";

import { get_pool_by_competition } from "api/kaggle";
import { UserItem, TextEllipsis } from "components";
import { useUser } from "context/user";
import InviteForm from "./inviteForm";

interface Props {
	competitionName: string;
}

const Pool: React.FC<Props> = ({ competitionName }: Props) => {
	const history = useHistory();
	const userContext = useUser();
	const [pools, setPools] = useState([]);
	useEffect(() => {
		get_pool_by_competition(competitionName)
			.then(res => {
				setPools(res.data);
				console.log(res.data);
			})
			.catch(e => {
				console.warn(e.response);
			});
	}, [competitionName]);

	return (
		<div className="pool-container">
			{/* <JoinPoolForm
				competitionName={competitionName}
				onCancel={() => {
					history.goBack();
				}}
			/> */}
			{/* {showJoinButton && (
				<><Button
					type="primary"
					ghost
					onClick={() => {
						history.push({
							pathname: window.location.pathname + "?tab=pool&form=pool",
						});
					}}
				>
					Join the pool
				</Button>
					<Divider />
					</>
			)} */}

			{pools.map((pool: any) => (
				<>
					<div style={{ display: "flex", flexDirection: "row" }}>
						<UserItem
							style={{ flex: 1 }}
							profile={pool.user.profile}
							skills={pool.user.skills}
							url={pool.user.avatar.url}
						/>
						<div style={{ flex: 1 }}>
							{pool.user.public_id !== userContext.user?.public_id && (
								<>
									<Button
										size="small"
										type="link"
										style={{ padding: 0 }}
										onClick={() => {
											history.push(
												window.location.pathname + "?tab=pool&form=invite"
											);
										}}
									>
										Invite
									</Button>
									<InviteForm user={pool.user} />
								</>
							)}
							{pool.language && (
								<TextEllipsis>
									<IconLanguage /> {pool.language}
								</TextEllipsis>
							)}
							{pool.description && (
								<p style={{ color: "GrayText", fontSize: 12 }}>
									{pool.description}
								</p>
							)}
						</div>
					</div>
				</>
			))}
		</div>
	);
};

export default Pool;
