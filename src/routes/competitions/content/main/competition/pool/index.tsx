import React, { useMemo, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Divider } from "antd";
import { IconLanguage } from "@arco-design/web-react/icon";
import "./style.less";

import { get_pool_by_competition } from "api/kaggle";
import { UserItem, TextEllipsis } from "components";
import JoinPoolForm from "../myTeam/joinPoolForm";
import { useUser } from "context/user";

interface Props {
	competitionName: string;
}

const Pool: React.FC<Props> = ({ competitionName }: Props) => {
	const history = useHistory();
	const userContext = useUser();
	const [pools, setPools] = useState([]);
	const [showJoinButton, setShowJoinButton] = useState<Boolean>(false);
	useEffect(() => {
		get_pool_by_competition(competitionName)
			.then(res => {
				setPools(res.data);
				console.log(res.data);
			})
			.catch(e => {
				console.warn(e);
			});
	}, [competitionName]);

	useEffect(() => {
		setShowJoinButton(
			!userContext.user ||
				pools.findIndex(
					(p: any) => p.user.public_id === userContext.user.public_id
				) < 0
		);
	}, [userContext.user, pools]);

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
							url={process.env.REACT_APP_HOST + pool.user.avatar.url}
						/>
						<div style={{ flex: 1 }}>
							{pool.user.public_id !== userContext.user?.public_id && <Button size="small" type="link" style={{padding: 0}}>Invite</Button>}
							{pool.language && (
								<TextEllipsis>
									<IconLanguage /> {pool.language}
								</TextEllipsis>
							)}
							{pool.description && (
								<p style={{ color: "GrayText", fontSize: 12}}>
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
