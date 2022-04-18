import React, { useMemo, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Divider } from "antd";
import { IconLanguage } from "@arco-design/web-react/icon";
import "./style.less";

import { get_teams_by_competition_name } from "api/kaggle";
import { UserItem, TextEllipsis } from "components";
import { TeamCard, TeamProps } from "../card";
import { useUser } from "context/user";

interface Props {
	competitionName: string;
}

const Teams: React.FC<Props> = ({ competitionName }: Props) => {
	const history = useHistory();
	const userContext = useUser();
	const [teams, setTeams] = useState<Array<TeamProps>>([]);

	useEffect(() => {
		if (competitionName) {
			get_teams_by_competition_name(competitionName)
				.then(res => {
					setTeams(res.data);
				})
				.catch(e => {
					console.warn(e.response);
				});
		}
	}, [competitionName]);

	return (
		<div>
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

			{teams.map((team: TeamProps) => (
				<TeamCard team={team} />
			))}
		</div>
	);
};

export default Teams;
