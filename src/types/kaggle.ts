export interface KaggleCompetitionProps {
	name: string;
	category: string;
	reward: string;
	team_count: number;
	url: string;
	title: string;
	deadline: Date;
	description: string;
	competition_header_image_url: string;
	organization_thumbnail_url: string;
}
export type UserProfileProps = {
	username: string;
	occupation?: string;
	organization?: string;
	description?: string;
};
export type UserSkillProps = {
	public_id?: string;
	name: string;
	level?: "beginner" | "intermediate" | "expert";
};
export type UserProps = {
	public_id: string;
	profile: UserProfileProps;
	avatar: { url: string } | null;
	skills: Array<UserSkillProps>;
};

export interface MemberProps {
	user: UserProps;
	role: "leader" | "member";
	language?: string;
}

export type RequestStatusType = "pending" | "accepted" | "rejected" | "expired";

export interface JoinRequestProps {
	language?: string;
	description?: string;
	status: RequestStatusType;
	user: UserProps;
	updated_on: Date;
}

export interface InviteRequestProps {
	description?: string;
	status: RequestStatusType;
	user: UserProps;
}

export interface GroupCommentProps {
	public_id: string;
	user: UserProps;
	content: string;
	sent_on: Date;
}

export interface TeamProps {
	name: string;
	public_id: string;
	num_members: number;
	description?: string;
	members: Array<MemberProps>;
	join_requests: Array<JoinRequestProps>;
	invite_requests: Array<InviteRequestProps>;
	comments: Array<GroupCommentProps>;
}

export interface PoolProps {
	public_id: string;
	user: UserProps;
	language?: string;
	description?: string;
	updated_on: Date;
}
