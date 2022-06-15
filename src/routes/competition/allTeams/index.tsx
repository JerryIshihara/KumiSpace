import React, { useMemo, useEffect, useState } from "react";
import { Empty, Divider } from "antd";
import { IconLanguage } from "@arco-design/web-react/icon";
import "./style.less";

// import { get_teams_by_competition_name } from "api/kaggle";
import { UserItem, TextEllipsis } from "components";
import { TeamListItem } from "../card";
import { useUser } from "context/user";
import { useCompetition } from "context/kaggleCompetition";
import { TeamProps } from "types/kaggle";
import { get_teams_by_competition_name } from "api/kaggle/group";

interface Props {
	teams: Array<TeamProps>;
}
const Teams: React.FC<Props> = React.memo(({ teams }: Props) => {
	const userContext = useUser();
	const compContext = useCompetition();

	return (
		<div>
			{teams.length === 0 &&   <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{
      height: 60,
    }}
    description={
      <span>
        No teams yet
      </span>
    }
  />}
			{teams.map((team: TeamProps, index: number) => (
				<TeamListItem key={team.public_id} team={team} last={index === teams.length - 1}/>
			))}
		</div>
	); 
});

export default Teams;
