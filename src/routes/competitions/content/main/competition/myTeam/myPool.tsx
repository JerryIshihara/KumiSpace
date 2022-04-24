import React, { useState } from "react";
import { Divider, Input, Button } from "antd";
import { Tag } from "@arco-design/web-react";

import { InviteRequestProps, MemberProps, PoolProps } from "types/kaggle";
import { useCompetition } from "context/kaggleCompetition";
import { TextEllipsis, UserItem } from "components";
import InviteRequests from './inviteRequests'

interface Props {
	pool: Partial<PoolProps>;
	invite_requests: Array<InviteRequestProps>;
}

const MyPool: React.FC<Props> = React.memo(
	({ pool, invite_requests }: Props) => {
		const compContext = useCompetition();
		const [description, setDescription] = useState<string>();
		const [language, setLanguage] = useState<string>();

        
        React.useEffect(() => {
            if (pool) {
                setDescription(pool.description)
                setLanguage(pool.language)
            }
        }, [pool])
        

		return (
			<>
				<h2>My Pool</h2>
				<Divider />
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						// alignItems: "center",
					}}
				>
					<h4>Description</h4>
					<Input.TextArea
						value={description}
						onChange={e => {
							setDescription(e.target.value);
						}}
					/>
					<h4 style={{ marginTop: "16px" }}>Language</h4>
					<Input
						value={language}
						onChange={e => {
							setLanguage(e.target.value);
						}}
					/>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "16px",
							marginTop: "32px",
						}}
					>
						<Button
							type="primary"
							disabled={
								language === pool.language && description === pool.description
							}
							onClick={() => {
								compContext.edit_my_pool &&
									compContext.edit_my_pool(description, language);
							}}
						>
							Save
						</Button>
						<Button onClick={compContext.leave_competition}>
							Leave the pool
						</Button>
					</div>
				</div>
				<InviteRequests admin={true} invites={invite_requests} />
			</>
		);
	}
);

export default MyPool;
