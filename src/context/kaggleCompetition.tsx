import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useMemo,
	useCallback,
} from "react";
import { useParams } from "react-router-dom";
import { message } from "antd";

import {
	get_competition,
	get_teams_by_competition_name,
	get_pool_by_competition,
	get_my_team,
	leave_team,
	edit_pool,
} from "api/kaggle";
import {
	KaggleCompetitionProps,
	PoolProps,
	TeamProps,
	MemberProps,
	JoinRequestProps,
	InviteRequestProps,
} from "types/kaggle";
import { useAuth } from "./auth";
import { useUser } from "./user";

interface MyTeamProps {
	team?: TeamProps;
	pool?: Partial<PoolProps>;
	join_requests?: {my_request: JoinRequestProps, group: TeamProps};
	invite_requests?: Array<InviteRequestProps>;
}
type MySectionType = "no-content" | "pool" | "join_requests" | "team";
interface CompetitionContextProps {
	competition: KaggleCompetitionProps;
	teams: Array<TeamProps>;
	pool: Array<PoolProps>;
	myTeam: MyTeamProps;
	isLeader: boolean;
	mySectionType: MySectionType;
	leave_competition: () => void;
	edit_my_pool: (
		description: string | undefined,
		language: string | undefined
	) => void;
}

const CompetitionContext = createContext<Partial<CompetitionContextProps>>({});

/**
 * Competition Context for competition related state
 * @author Jerry Ishihara
 * @date 2022-04-22
 * @param {any} props:any
 * @returns {React.Provider<Partial<CompetitionContextProps>>}
 */
export const CompetitionProvider = (props: any) => {
	const auth = useAuth();
	const userContext = useUser();
	const { competitionName } = useParams<{ competitionName: string }>();

	const [competition, setCompetition] = useState<KaggleCompetitionProps>();
	// all teams
	const [teams, setTeams] = useState<Array<TeamProps>>();
	// all user pools
	const [pool, setPool] = useState<Array<PoolProps>>();
	// my section
	const [myTeam, setMyTeam] = useState<MyTeamProps>();
	let mySectionType: MySectionType = useMemo(() => {
		if (myTeam?.pool) {
			return "pool";
		} else if (myTeam?.team) {
			return "team";
		} else if (myTeam?.join_requests) {
			return "join_requests";
		}
		return "no-content";
	}, [myTeam]);
	const isLeader = useMemo(() => {
		if (!myTeam?.team) {
			return false;
		}
		const leader = myTeam.team.members.find(
			(member: MemberProps) => member.role === "leader"
		);
		return leader && leader.user.public_id === userContext.user.public_id;
	}, [myTeam, userContext.user]);

	// fetch competition info
	useEffect(() => {
		if (competitionName) {
			get_competition(competitionName).then(res => {
				console.log("competition", res.data);
				setCompetition(res.data);
			});
		}
	}, [competitionName]);

	// fetch teams and pool
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

	// fetch my team of the competition
	useEffect(() => {
		if (competitionName && auth.token) {
			get_my_team(auth.token, competitionName)
				.then(res => {
					console.log(res.data);
					setMyTeam(res.data);
				})
				.catch(e => {
					console.warn(e.response);
					if (e.response.status === 401) {
						auth
							.refresh_token()
							.then(res => {
								auth.storeToken(res.data.token);
								get_my_team(res.data.token, competitionName)
									.then(res => {
										console.log(res.data);
										setMyTeam(res.data);
									})
									.catch(e => {
										console.warn(e.response);
									});
							})
							.catch(e => {
								auth.logout();
							});
					}
				});
		}
	}, [competitionName, auth.token]);

	const edit_my_pool = useCallback(
        (description: string | undefined, language: string | undefined) => {
            if (auth.token && competitionName) {
                edit_pool(auth.token, competitionName, description, language)
				.then(res => {
					console.log(res.data);
					setMyTeam({ ...myTeam, pool: { ...pool, description, language } });
					message.success("Successfully updated the pool!");
				})
				.catch(e => {
					console.warn(e.response);
					message.error("Pool update failed!");
				});
            }
		},
		[auth.token, competitionName]
	);
	const leave_competition = () => {
		leave_team(auth.token, competitionName)
			.then(res => {
				setMyTeam(undefined);
			})
			.catch(e => {
				console.warn(e.response);
			});
	};

	return (
		<CompetitionContext.Provider
			value={{
				competition,
				teams,
				pool,
				myTeam,
				isLeader,
				mySectionType,
				leave_competition,
				edit_my_pool,
			}}
		>
			{props.children}
		</CompetitionContext.Provider>
	);
};

export const useCompetition = () => {
	return useContext(CompetitionContext);
};
