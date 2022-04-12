import React, { useState, useEffect } from "react";
import { useAuth } from "./auth";
import { get_profile, edit_profile } from "api/user";

export type UserProfileProps = {
	username: string,
	occupation?: string,
	organization?: string,
	description?: string,
};

export interface UserContextProps {
	profile: UserProfileProps;
	updateProfile: (p: UserProfileProps, callBack: () => void) => void;
}

export const UserContext = React.createContext<Partial<UserContextProps> | any>(
	{}
);

export const UserContextProvider = (props: any) => {
	const auth = useAuth();
	const [profile, setProfile] = useState<UserProfileProps>();

	useEffect(() => {
		if (auth.token) {
			console.log(auth.token);
			
			get_profile(auth.token)
				.then(res => {
					console.log(res.data);
					setProfile(res.data);
				})
				.catch(e => {
					console.warn(e);
				});
		}
	}, [auth.token]);

	const updateProfile = async (newProfile: UserProfileProps, callBack: () => void) => {
		var _profile = {...profile, ...newProfile}		
		edit_profile(auth.token, _profile).then(res => {
			setProfile(_profile)
			callBack();
		}).catch(e => {
			console.warn(e);
		})
	}

	return (
		<UserContext.Provider
			value={{
				profile,
				updateProfile
			}}
		>
			{props.children}
		</UserContext.Provider>
	);
};

export function useUser() {
	return React.useContext(UserContext) as UserContextProps;
}
