import React, { useEffect, useState, useCallback } from "react";
import { login, signup, log_out, refresh } from "api/auth";
import { AxiosResponse } from "axios";
import { useHistory } from "react-router-dom";

export interface AuthContextProps {
	token: string;
	redirectPath: string;
	authenticate: (
		email: string,
		passward: string,
		callback?: () => void
	) => void;
	signUp: (email: string, passward: string) => void;
	status: () => Promise<{ isAuthenticated: Boolean }>;
	logout: () => void;
	refresh_token: () => Promise<AxiosResponse<any, any>>;
	storeToken: (token: string) => void;
	authorizedAPI: (
		func: (token: string) => Promise<any>,
		callBack?: (res: any) => any,
		fallback?: (e: any) => any,
		final?: () => any
	) => void;
}

export const AuthContext = React.createContext<Partial<AuthContextProps> | any>(
	{}
);

export const AuthContextProvider = (props: any) => {
	const history = useHistory();
	const [token, setToken] = useState<string>();
	useEffect(() => {
		console.log("auth context");

		getTokenFromSecureStore();
	}, []);
	const authenticate = async (
		email: string,
		passward: string,
		callback?: () => void
	) => {
		// TODO: use keychain for security
		login(email, passward)
			.then(res => {
				console.log(res.headers);

				localStorage.setItem("secure_token", res.data.token);
				setToken(res.data.token);
				if (callback) {
					callback();
				}
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
	const status = async (): Promise<
		{ isAuthenticated: Boolean } | undefined
	> => {
		try {
			const t = localStorage.getItem("secure_token");
			if (t) {
				setToken(t);
				return new Promise((res, rej) => res({ isAuthenticated: true }));
			}
		} catch (e) {
			setToken(undefined);
			console.warn(e);
			return new Promise(rej => rej({ isAuthenticated: false }));
		}
	};
	const refresh_token = async (): Promise<AxiosResponse<any, any>> => {
		return refresh();
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
		log_out()
			.then(res => {
				console.log(res.data);
				localStorage.removeItem("secure_token");
				setToken(undefined);
			})
			.catch(e => {
				console.warn(e.response);
			});
	};

	const authorizedAPI = useCallback(
		(
			func: (token: string) => Promise<any>,
			callBack?: (res: any) => any,
			fallback?: (e: any) => any,
			final?: () => any
		) => {
			if (token) {
				func(token)
					.then(res => {
						callBack && callBack(res);
					})
					.catch(e => {
						console.warn(e.response);
						if (e.response.status === 401) {
							refresh().then(res => {
								setToken(res.data.token);
								func(res.data.token)
									.then(res => {
										callBack && callBack(res);
									})
									.catch(e => {
										console.warn(e);
										if (e.response.status === 401) {
											logout();
										} else {
											fallback && fallback(e);
										}
									});
							});
						} else {
							fallback && fallback(e);
						}
					})
					.finally(() => {
						final && final();
					});
			}
		},
		[token]
	);

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
				refresh_token,
				authorizedAPI,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	return React.useContext(AuthContext) as AuthContextProps;
}
