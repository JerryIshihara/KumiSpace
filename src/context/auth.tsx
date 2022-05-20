import React, { useEffect, useState, useCallback } from "react";
import { login, signup, log_out, refresh } from "api/auth";
import { AxiosResponse } from "axios";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { actionCodeSettings } from "firebase";

export interface AuthContextProps {
	token: string;
	redirectPath: string;
	// authenticate: (
	// 	email: string,
	// 	passward: string,
	// 	callback?: () => void
	// ) => void;
	// signUp: (
	// 	email: string,
	// 	passward: string,
	// 	firstName: string,
	// 	lastName: string,
	// 	callback?: (res: any) => void
	// ) => void;
	signUpWithEmailAndPassword: (
		email: string,
		passward: string,
		firstName: string,
		lastName: string,
		onNotVerified?: (user: any) => void,
		onError?: (error: any) => void,
		callback?: (res: any) => void
	) => void;
	signInWithEmailAndPassword: (
		email: string,
		passward: string,
		onNotVerified?: (user: any) => void,
		onError?: (error: any) => void,
		callback?: () => void
	) => void;
	resetPassword: (email: string, onError?: (error: any) => void, callback?: () => void) => void;
	status: () => Promise<{ isAuthenticated: Boolean }>;
	logout: () => void;
	refresh_token: () => Promise<AxiosResponse<any, any>>;
	storeToken: (token: string) => void;
	authorizedAPI: (
		func: (token: string) => Promise<any>,
		callBack?: (res: any) => any,
		fallback?: (e: any) => any,
		final?: () => any,
		onNotLoggedIn?: () => void,
	) => void;
}

export const AuthContext = React.createContext<Partial<AuthContextProps> | any>(
	{}
);

export const AuthContextProvider = (props: any) => {
	const history = useHistory()
	const [token, setToken] = useState<string>();

	useEffect(() => {
		console.log("auth context");

		getTokenFromSecureStore();
	}, []);

	const resetPassword = (email: string, onError?: (error: any) => void, callback?: () => void) => {
		firebase
			.auth()
			.sendPasswordResetEmail(email)
			.then(() => {
				// Password reset email sent!
				// ..
				console.log("sent reset email");
				
				callback && callback();
			})
			.catch((e) => {
				onError && onError(e)
			})
			.catch(error => {
				// ..
				console.warn(error);
			});
	};
	const signInWithEmailAndPassword = (
		email: string,
		password: string,
		onNotVerified?: (user: any) => void,
		onError?: (error: any) => void,
		callback?: () => void
	) => {
		// When the user signs in with email and password.
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(({ user }: any) => {
				if (!user.emailVerified) {
					onNotVerified && onNotVerified(user);
					console.log("email not verified");
				} else {
					// Get the user's ID token as it is needed to exchange for a session cookie.
					return user.getIdToken().then((idToken: string) => {
						// Session login endpoint is queried and the session cookie is set.
						// CSRF protection should be taken into account.
						// ...
						console.log(idToken);
						login(idToken)
							.then(res => {
								storeToken(res.data.token);
								callback && callback();
							})
							.catch(e => {
								console.warn(e.response);
							});
						// const csrfToken = getCookie('csrfToken')
						// return postIdTokenToSessionLogin("/sessionLogin", idToken, csrfToken);
					});
				}
			})
			.catch((e) => {
				onError && onError(e)
			})
			.then(() => {
				// A page redirect would suffice as the persistence is set to NONE.
				return firebase.auth().signOut();
			})
			.then(() => {});
	};
	const signUpWithEmailAndPassword = (
		email: string,
		passward: string,
		firstName: string,
		lastName: string,
		onNotVerified?: (user: any) => void,
		onError?: (error: any) => void,
		callback?: (res: any) => void
	) => {
		// When the user signs in with email and password.
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, passward)
			.then(({ user }: any) => {
				// Get the user's ID token as it is needed to exchange for a session cookie.
				return user.getIdToken().then((idToken: string) => {
					// Session login endpoint is queried and the session cookie is set.
					// CSRF protection should be taken into account.
					// ...
					// const csrfToken = getCookie('csrfToken')
					// return postIdTokenToSessionLogin('/sessionLogin', idToken, csrfToken);
					signup(idToken, firstName, lastName).then(res => {
						// storeToken(res.data.token);
						callback && callback(res);
						if (!user.emailVerified) {
							onNotVerified && onNotVerified(user);
							console.log("email not verified");
						}
					});
				});

			})
			.catch((e) => {
				onError && onError(e)
			})
			.then(() => {
				// A page redirect would suffice as the persistence is set to NONE.
				return firebase.auth().signOut();
			})
			.then(() => {
				// window.location.assign('/profile');
			});
	};
	// const authenticate = async (
	// 	email: string,
	// 	passward: string,
	// 	callback?: () => void
	// ) => {
	// 	// TODO: use keychain for security
	// 	login(email, passward)
	// 		.then(res => {
	// 			console.log(res.headers);

	// 			localStorage.setItem("secure_token", res.data.token);
	// 			setToken(res.data.token);
	// 			if (callback) {
	// 				callback();
	// 			}
	// 		})
	// 		.catch(e => {
	// 			console.warn(e.response);
	// 		});
	// };
	// const signUp = async (
	// 	email: string,
	// 	passward: string,
	// 	firstName: string,
	// 	lastName: string,
	// 	callBack?: (res: any) => void
	// ) => {
	// 	signup(email, passward, firstName, lastName)
	// 		.then(res => {
	// 			localStorage.setItem("secure_token", res.data.token);
	// 			setToken(res.data.token);
	// 			callBack && callBack(res);
	// 		})
	// 		.catch(e => {
	// 			console.warn(e.response);
	// 		});
	// };
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
			} else {
				refresh()
					.then(res => {
						storeToken(res.data.token);
					})
					.catch(e => {
						console.warn(e);
						if (e.response.status === 401) {
							logout();
						}
					});
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
			final?: () => any,
			onNotLoggedIn?: () => void,
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
								storeToken(res.data.token);
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
			} else {
				onNotLoggedIn && onNotLoggedIn()
			}
		},
		[token]
	);

	return (
		<AuthContext.Provider
			value={{
				token,
				// authenticate,
				resetPassword,
				status,
				storeToken,
				getTokenFromSecureStore,
				signUpWithEmailAndPassword,
				signInWithEmailAndPassword,
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
