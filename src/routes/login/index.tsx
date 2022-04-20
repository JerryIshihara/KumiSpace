import React, { useState, useEffect } from "react";
import "./style.less";

import { Button, Input, Space } from "antd";
import {
	withRouter,
	RouteComponentProps,
	useParams,
	useLocation,
	useHistory,
} from "react-router-dom";

import Navbar from "./navbar";
import OAuth from "./oauth";
// import { AuthProps } from "../../redux/lib/auth.type";
import { useAuth } from "context/auth";

const SIGNIN = "sign-in";
const SIGNUP = "sign-up";

interface Props extends RouteComponentProps {}

const LoginPage: React.FC<Props> = props => {
	const { authMode } = useParams<{ authMode: string }>();
	const auth = useAuth();
	const state = useLocation().state as string;
	const [identifier, setIdentifier] = useState<string>();
	const [credential, setCredential] = useState<string>();
	const [repeatCrd, setRepeatCrd] = useState<string>();
	useEffect(() => {
		setCredential(undefined);
		setRepeatCrd(undefined);
	}, [authMode]);
	// useEffect(() => {
	// 	if (auth.token) {
	// 		props.history.push(auth.redirectPath);
	// 	}
	// }, [auth.token])

	return (
		<div className="body-center">
			<Navbar />
			<div className="page-body-container login-form-container">
				{/* Login Form */}
				<div className="login-form">
					{/* Login Form Tabs */}
					<div className="login-form-tabs">
						<div
							className={
								`login-form-tab` +
								(authMode === SIGNIN ? ` login-form-tab-hover` : ``)
							}
							onClick={() => props.history.push("/auth/sign-in")}
						>
							<span>Sign in</span>
						</div>
						<div
							className={
								`login-form-tab` +
								(authMode === SIGNUP ? ` login-form-tab-hover` : ``)
							}
							onClick={() => props.history.push("/auth/sign-up")}
						>
							<span>Sign up</span>
						</div>
					</div>
					{/* Login Form Sign In */}
					{authMode === SIGNIN && (
						<div className="login-form-content">
							<span className="login-form-title">Sign in to your account</span>
							<div className="login-form-fields">
								<Space direction="vertical" size={15} style={{ width: "100%" }}>
									<Input
										size="large"
										placeholder="Email Address"
										value={identifier}
										onChange={e => setIdentifier(e.target.value)}
									/>
									<Input.Password
										size="large"
										placeholder="Password"
										value={credential}
										onChange={e => setCredential(e.target.value)}
									/>
									<Button
										className="login-form-submit"
										size="large"
										type="primary"
										style={{ width: "100%" }}
										loading={false}
										onClick={() => {
											if (identifier && credential) {
												auth.authenticate(identifier, credential, () => {
													props.history.push("/");
												});
											}
										}}
									>
										Submit
									</Button>
								</Space>
							</div>
						</div>
					)}
					{/* Login Form Sign Out */}
					{authMode === SIGNUP && (
						<div className="login-form-content">
							<span className="login-form-title">Create an account</span>
							<div className="login-form-fields">
								<Space direction="vertical" size={15} style={{ width: "100%" }}>
									<Input size="large" placeholder="First Name" />
									<Input size="large" placeholder="Last Name" />
									<Input
										size="large"
										placeholder="Email Address"
										value={identifier}
										onChange={e => setIdentifier(e.target.value)}
									/>
									<Input.Password
										size="large"
										placeholder="Password"
										value={credential}
										onChange={e => setCredential(e.target.value)}
									/>
									<Input.Password
										value={repeatCrd}
										onChange={e => setRepeatCrd(e.target.value)}
										size="large"
										placeholder="Confirm Password"
									/>
									<Button
										className="login-form-submit"
										size="large"
										type="primary"
										style={{ width: "100%" }}
										loading={false}
										onClick={() => {
											if (
												identifier &&
												credential &&
												credential === repeatCrd
											) {
												auth.signUp(identifier, credential);
											}
										}}
									>
										Submit
									</Button>
								</Space>
							</div>
						</div>
					)}
					<OAuth />
				</div>
			</div>
		</div>
	);
};

export default withRouter(LoginPage);
