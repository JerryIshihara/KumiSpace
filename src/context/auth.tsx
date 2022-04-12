import React, { useEffect, useState } from "react";
import { login, signup } from "api/auth";

export interface AuthContextProps {
	token: string;
	authenticate: (email: string, passward: string, path?: string) => void;
	signUp: (email: string, passward: string) => void;
	status: () => boolean;
    logout: () => void;
}

export const AuthContext = React.createContext<Partial<AuthContextProps> | any>(
	{}
);

export const AuthContextProvider = (props: any) => {
    const [token, setToken] = useState<string>();
	const authenticate = async (email: string, passward: string, path?: string) => {
		// TODO: use keychain for security
		login(email, passward)
            .then(res => {
                
				localStorage.setItem("secure_token", res.data.token);
                setToken(res.data.token);
			})
			.catch(e => {
                console.warn(e.response);
			});
	};
	const signUp = async (email: string, passward: string) => {
		signup(email, passward)
			.then(res => {
				localStorage.setItem("secure_token", res.data.token);
				setToken(res.data.token);
			})
			.catch(e => {
				console.warn(e.response);
			});
	};
	const status = () => {
		try {
			const t = localStorage.getItem("secure_token");
            if (t) {
                
				setToken(t);
				return true;
			}
		} catch (e) {
			setToken(undefined);
			console.warn(e);
			return false;
		}
	};
	const storeToken = async (user_token: string) => {
		// TODO: use keychain for security
		localStorage.setItem("secure_token", user_token);
		setToken(user_token);
	};
	const getTokenFromSecureStore = async () => {
		try {
			const t = localStorage.getItem("secure_token");
			if (t) {
				setToken(t);
			}
		} catch (e) {
			setToken(undefined);
			console.warn(e);
		}
	};
	const logout = async () => {
		localStorage.removeItem("secure_token");
		setToken(undefined);
	};
	React.useEffect(() => {
		getTokenFromSecureStore().catch(e => console.warn(e));
	});
	return (
		<AuthContext.Provider
			value={{
				token,
                authenticate,
                signUp,
				status,
				storeToken,
				getTokenFromSecureStore,
				logout,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	return React.useContext(AuthContext) as AuthContextProps;
}
