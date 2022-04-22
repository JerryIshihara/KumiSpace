import React, { createContext, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
	get_competition,
	get_teams_by_competition_name,
	get_pool_by_competition,
} from "api/kaggle";
import { KaggleCompetitionProps, TeamProps } from "types/kaggle";

interface CompetitionContextProps {
	competition: KaggleCompetitionProps;
	teams: Array<TeamProps>;
	pool: any;
	myTeam: any;
}

const CompetitionContext = createContext<Partial<CompetitionContextProps>>({});

export const CompetitionProvider = (props: any) => {
	const { competitionName } = useParams<{ competitionName: string }>();

	const [competition, setCompetition] = useState();
	const [teams, setTeams] = useState();
	const [pool, setPool] = useState();
	const [myTeam, setMyTeam] = useState();

	useEffect(() => {
		if (competitionName) {
			get_competition(competitionName).then(res => {
				console.log("competition", res.data);
				setCompetition(res.data);
			});
		}
	}, [competitionName]);

	useEffect(() => {
		if (competition) {
			get_teams_by_competition_name(competitionName)
				.then(res => {
					console.log("teams", res.data);
					setTeams(res.data);
				})
				.catch(e => {
					console.warn(e.response);
				});
			get_pool_by_competition(competitionName)
				.then(res => {
					setPool(res.data);
					console.log("pool", res.data);
					console.log(res.data);
				})
				.catch(e => {
					console.warn(e.response);
				});
		}
	}, [competition]);

	return (
		<CompetitionContext.Provider
			value={{
				competition,
				teams,
				pool,
				myTeam,
			}}
		>
			{props.children}
		</CompetitionContext.Provider>
	);
};

export const useCompetition = () => {
	return useContext(CompetitionContext);
};
