import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "./auth";
import { get_user, add_skill, edit_profile, edit_skill } from "api/user";

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

export interface UserContextProps {
	user: UserProps;
	updateProfile: (p: UserProfileProps, callBack: () => void) => void;
	addSkill: (skill: UserSkillProps, callBack: () => void) => void;
	editSkill: (pid: string, skill: UserSkillProps, callBack: () => void) => void;
}

export const UserContext = React.createContext<Partial<UserContextProps> | any>(
	{}
);

export const UserContextProvider = (props: any) => {
	const auth = useAuth();
	const [user, setUser] = useState<UserProps>();

	useEffect(() => {
		if (auth.token) {
			console.log(auth.token);

			get_user(auth.token)
				.then(res => {
					console.log(res.data);
					setUser(res.data);
				})
				.catch(e => {
					console.warn(e.response);
				});
		}
	}, [auth.token]);

	const updateProfile = async (
		newProfile: UserProfileProps,
		callBack: () => void
	) => {
		var _profile = { ...user?.profile, ...newProfile };
		edit_profile(auth.token, _profile)
			.then(res => {
				setUser({ ...user, profile: _profile } as UserProps);
				callBack();
			})
			.catch(e => {
				console.warn(e.response);
			});
	};

	const addSkill = async (skill: UserSkillProps, callBack: () => void) => {
		add_skill(auth.token, skill)
			.then(res => {
				setUser({ ...user, skills: user?.skills.concat(skill) } as UserProps);
				callBack();
			})
			.catch(e => {
				console.warn(e.response);
			});
	};

	const editSkill = async (
		pid: string,
		skill: UserSkillProps,
		callBack: () => void
	) => {
		edit_skill(auth.token, pid, skill)
			.then(res => {
				const index = user?.skills.findIndex(i => i.public_id === pid);
				if (index !== undefined) {
					user?.skills.splice(index, 1, skill);
					setUser({ ...user, skills: user?.skills } as UserProps);
					callBack();
				}
			})
			.catch(e => {
				console.warn(e.response);
			});
	};

	return (
		<UserContext.Provider
			value={{
				user,
				updateProfile,
				addSkill,
				editSkill,
			}}
		>
			{props.children}
		</UserContext.Provider>
	);
};

export function useUser() {
	return useContext(UserContext) as UserContextProps;
}
