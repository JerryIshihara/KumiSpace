import React, { useMemo, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Divider } from "antd";
import { IconLanguage } from "@arco-design/web-react/icon";
import "./style.less";

import { UserItem, TextEllipsis } from "components";
import { useUser } from "context/user";
import InviteForm from "./inviteForm";
import { useCompetition } from "context/kaggleCompetition";
import { PoolProps } from "types/kaggle";

const Pool: React.FC = (props) => {
	const history = useHistory();
	const userContext = useUser();
	const compContext = useCompetition()

	return (
		<div className="pool-container">

			{compContext.pool?.map((pool: PoolProps) => (
				<>
					<div style={{ display: "flex", flexDirection: "row" }}>
						<UserItem
							style={{ flex: 1 }}
							profile={pool.user.profile}
							skills={pool.user.skills}
							url={pool.user.avatar?.url}
						/>
						<div style={{ flex: 1 }}>
							{pool.user.public_id !== userContext.user?.public_id && (
								<>
									<Button
										size="small"
										type="link"
										style={{ padding: 0 }}
										onClick={() => {
											history.push(
												window.location.pathname + "?tab=pool&form=invite"
											);
										}}
									>
										Invite
									</Button>
									<InviteForm user={pool.user} />
								</>
							)}
							{pool.language && (
								<TextEllipsis>
									<IconLanguage /> {pool.language}
								</TextEllipsis>
							)}
							{pool.description && (
								<p style={{ color: "GrayText", fontSize: 12 }}>
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
