
export type NotificationType = "join" | "invite" | "admin";

export interface NotificationProps {
	public_id: string;
	to_user_id: string;
	from_user_id: string;
	type: NotificationType;
	title: string;
	text: string;
	is_read: boolean;
	redirect_memo: string;
	image_url: string | null;
	created_on: Date;
	updated_on: Date;
}
