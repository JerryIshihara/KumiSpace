import React, { useState } from "react";
import "./style.less";

import { Button, Input, Space } from "antd";
import { withRouter, RouteComponentProps, useParams } from "react-router-dom";

import Navbar from "./navbar";
import OAuth from "./oauth";
import { AuthProps } from "../../redux/lib/auth.type";



const SIGNIN = "sign-in";
const SIGNUP = "sign-up";

interface Props extends RouteComponentProps, AuthProps {}

const LoginPage: React.FC<Props> = (props) => {
	const { authMode } = useParams<{ authMode: string }>();
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
									<Input size="large" placeholder="Email Address" />
									<Input.Password size="large" placeholder="Passworld" />
									<Button
										className="login-form-submit"
										size="large"
										type="primary"
										style={{ width: "100%" }}
										loading={props.requesting}
										onClick={() => { props.login(",", "a", () => props.history.push("/"))} }
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
									<Input size="large" placeholder="Email Address" />
									<Input.Password size="large" placeholder="Passworld" />
									<Input.Password
										size="large"
										placeholder="Confirm Passworld"
									/>
									<Button
										className="login-form-submit"
										size="large"
										type="primary"
										style={{ width: "100%" }}
										loading={props.requesting}
										onClick={() => { props.login(",", "a", () => props.history.push("/"))} }
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
