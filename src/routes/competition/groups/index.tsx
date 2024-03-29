import React, { useMemo, useEffect, useState } from "react";
import { Empty, Divider } from "antd";
import { IconLanguage } from "@arco-design/web-react/icon";
import "./style.less";

// import { get_teams_by_competition_name } from "api/kaggle";
import { UserItem, TextEllipsis } from "components";
import { TeamCard } from "../card";
import { useUser } from "context/user";
import { useCompetition } from "context/kaggleCompetition";
import { TeamProps } from "types/kaggle";

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
				<TeamCard
					key={team.public_id}
					team={team}
				/>
			))}
		</div>
	);
});

export default Teams;
