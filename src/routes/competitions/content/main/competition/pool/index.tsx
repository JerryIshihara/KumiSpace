import React, {useMemo} from "react";
import { Button, Divider } from "antd";
import "./style.less";

import { UserItem } from "components";
import JoinPoolForm from "./joinPoolForm";
import { useHistory } from "react-router-dom";

const Pool: React.FC = () => {
	const history = useHistory();
	const numMember = useMemo(() => Math.max(1, Math.min(4, Math.floor(Math.random() * 10))), []) 
	return (
		<div className="pool-container">
			<JoinPoolForm
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
			{[...Array(numMember)].fill("").map(_ => (
				<UserItem />
			))}
		</div>
	);
};

export default Pool;
