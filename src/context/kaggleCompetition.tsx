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
	get_my_team,
} from "api/kaggle";
import { get_pool_by_competition } from 'api/kaggle/pool'
import {get_teams_by_competition_name, leave_team, send_join_team_request,} from 'api/kaggle/group'
import {
	KaggleCompetitionProps,
	PoolProps,
	TeamProps,
	MemberProps,
	JoinRequestProps,
	InviteRequestProps,
	GroupCommentProps,
} from "types/kaggle";
import { useAuth } from "./auth";
import { useUser } from "./user";

interface MyTeamProps {
	team?: TeamProps;
	pool?: PoolProps;
	join_requests?: {my_request: JoinRequestProps, group: TeamProps};
	invite_requests?: Array<InviteRequestProps>;
	comments: Array<GroupCommentProps>
}
type MySectionType = "no-content" | "pool" | "join_requests" | "team";
interface CompetitionContextProps {
	competitionName: string,
	competition: KaggleCompetitionProps;
	teams: Array<TeamProps>;
	pool: Array<PoolProps>;
	myTeam: MyTeamProps;
	isLeader: boolean;
	mySectionType: MySectionType;
	leave_competition: () => void;
	join_team:(team_pid: string, description: string | undefined, language: string | undefined) => void;
	fetch_my_team: () => void;
	fetch_pool: () => void;
	fetch_teams: () => void;
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
			fetch_teams()
			fetch_pool()
		}
	}, [competition]);

	// fetch my team of the competition
	useEffect(() => {
		if (competitionName && auth.token) {
			fetch_my_team()
		}
	}, [competitionName, auth.token]);

	const fetch_teams = () => {
		get_teams_by_competition_name(competitionName)
		.then(res => {
			console.log("teams", res.data);
			setTeams(res.data);
		})
		.catch(e => {
			console.warn(e.response);
		});
	}

	const fetch_my_team = () => {
		auth.authorizedAPI(
			(token: string) => get_my_team(token, competitionName),
			(res) => {
				console.log("my team: ", res.data);
				
				setMyTeam(res.data);
			},
			() => { },
			() => {}
		)
	}

	const fetch_pool = () => {
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

	const join_team = (team_pid: string, description: string | undefined, language: string | undefined) => {
		send_join_team_request(auth.token, team_pid, undefined)
			.then(res => {
				console.log(res.data);
			})
			.catch(e => {
				console.warn(e.response);
			});
	};

	const leave_competition = () => {
		auth.authorizedAPI(
			(token) => leave_team(token, competitionName),
			res => {
				fetch_my_team()
				fetch_teams()
				message.success(`You have left the competition ${competitionName}`)
			},
			e => {
				console.warn(e.response);
			},
		)
	};

	return (
		<CompetitionContext.Provider
			value={{
				competitionName,
				competition,
				teams,
				pool,
				myTeam,
				isLeader,
				mySectionType,
				join_team,
				leave_competition,
				fetch_my_team,
				fetch_pool,
				fetch_teams,
			}}
		>
			{props.children}
		</CompetitionContext.Provider>
	);
};

export const useCompetition = () => {
	return useContext(CompetitionContext);
};
