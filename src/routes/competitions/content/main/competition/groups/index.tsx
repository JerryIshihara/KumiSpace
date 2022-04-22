import React, { useMemo, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Divider } from "antd";
import { IconLanguage } from "@arco-design/web-react/icon";
import "./style.less";

// import { get_teams_by_competition_name } from "api/kaggle";
import { UserItem, TextEllipsis } from "components";
import { TeamCard } from "../card";
import { useUser } from "context/user";
import { useCompetition } from "context/kaggleCompetition";
import {TeamProps} from 'types/kaggle'


const Teams: React.FC = (props) => {
	const userContext = useUser();
	const compContext = useCompetition()

	return (
		<div>
			{compContext.teams?.map((team: TeamProps) => (
				<TeamCard key={team.public_id} team={team} />
			))}
		</div>
	);
};

export default Teams;
