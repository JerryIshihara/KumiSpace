import React, { useMemo, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Divider } from "antd";
import "./style.less";

import { get_pool_by_competition } from "api/kaggle";
import { UserItem } from "components";
import JoinPoolForm from "./joinPoolForm";

interface Props {
	competitionName: string;
}

const Pool: React.FC<Props> = ({ competitionName }: Props) => {
	const history = useHistory();
	const [pools, setPools] = useState([]);
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

	return (
		<div className="pool-container">
			<JoinPoolForm
				competitionName={competitionName}
				onCancel={() => {
					history.goBack();
				}}
			/>
			<Button
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
			{pools.map((pool: any) => (
				<UserItem profile={pool.user.profile} skills={pool.user.skills}/>
			))}
		</div>
	);
};

export default Pool;
