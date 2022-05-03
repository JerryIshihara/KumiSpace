import React, { useState, useEffect } from "react";
import "./style.less";

import { Button, Input, Space } from "antd";
import { Alert } from "@arco-design/web-react";
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
	const [firstName, setFirstName] = useState<string>();
	const [lastName, setLastName] = useState<string>();
	const [identifier, setIdentifier] = useState<string>();
	const [credential, setCredential] = useState<string>();
	const [repeatCrd, setRepeatCrd] = useState<string>();
	const [error, setError] = useState<string>();
	useEffect(() => {
		setCredential(undefined);
		setRepeatCrd(undefined);
		setError(undefined);
	}, [authMode]);

	const onSignUp = () => {
		if (!firstName || !lastName) {
			setError("Please enter you first and last name");
		} else if (!identifier) {
			setError("Please enter you email");
		} else if (!credential) {
			setError("Please enter you password");
		} else if (credential !== repeatCrd) {
			setError("Passwords do not match");
		} else {
			auth.signUp(identifier, credential, firstName, lastName, res => {
				props.history.push("/");
			});
		}
	};

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
							{error && (
								<Alert
									style={{ margin: "8px 0" }}
									type="error"
									content={error}
								/>
							)}
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
									{error && (
										<Alert
											style={{ margin: "8px 0" }}
											type="error"
											content={error}
										/>
									)}
									<Input
										size="large"
										placeholder="First Name"
										value={firstName}
										onChange={e => setFirstName(e.target.value)}
									/>
									<Input
										size="large"
										placeholder="Last Name"
										value={lastName}
										onChange={e => setLastName(e.target.value)}
									/>
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
										onClick={onSignUp}
									>
										Sign up
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
