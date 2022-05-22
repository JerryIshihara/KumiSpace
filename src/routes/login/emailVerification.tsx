import React, { useState, useEffect, useMemo } from "react";
import "./style.less";

import { getAuth, sendEmailVerification } from "firebase/auth";
import { Button, Input, Space } from "antd";
import {
	CheckCircleTwoTone,
	LoadingOutlined,
	ExclamationCircleTwoTone,
} from "@ant-design/icons";
import { Alert } from "@arco-design/web-react";
import {
	useLocation,
	useNavigate,
} from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";
import OAuth from "./oauth";
// import { AuthProps } from "../../redux/lib/auth.type";
import { useAuth } from "context/auth";


interface Props {}

const EmailVerification: React.FC<Props> = props => {
	const navigate = useNavigate()
	const auth = useAuth();
	const state = useLocation().state as { email: string; password: string };
	const [email, setEmail] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [loading, setLoading] = useState<boolean>(false);
	const [done, setDone] = useState<boolean>(false);
	const [checkAgain, setCheckAgain] = useState<boolean>(false);
	const Title = useMemo(
		() => (done ? "Email verified!" : "Verify your e-mail"),
		[done]
	);
	const Message = useMemo(
		() =>
			checkAgain ? (
				<p style={{ textAlign: "center" }}>
					Sorry, we haven't received your verification. A new verification link
					has been sent to <b>{email}</b>, please check again.
				</p>
			) : (
				<p style={{ textAlign: "center" }}>
					We already have sent a verification link to the email <b>{email}</b>,
					please check your inbox, and do not refresh this page.
				</p>
			),
		[checkAgain, email]
	);

	useEffect(() => {
		console.log("reloaded: ", state);
		if (!state) {
			navigate("/page-not-found");
		} else {
			setEmail(state.email);
			setPassword(state.password);
		}
	}, [state]);

	return (
		<div className="login-form">
			<div className="login-form-content">
				<div className="login-form-fields">
					<Space
						direction="vertical"
						size={20}
						style={{ width: "100%" }}
						className="vertical-center"
					>
						<span className="login-form-title">
							{loading && <LoadingOutlined style={{ marginRight: "16px" }} />}
							{!loading && done && (
								<CheckCircleTwoTone
									twoToneColor="#52c41a"
									style={{ marginRight: "16px" }}
								/>
							)}{" "}
							{/* {!loading && checkAgain && (
									<ExclamationCircleTwoTone
										twoToneColor="gold"
										style={{ marginRight: "16px" }}
									/>
								)} */}
							{Title}
						</span>
						{Message}

						<Button
							className="login-form-submit"
							// size="large"
							type="primary"
							// style={{ width: "100%" }}
							disabled={loading || done}
							onClick={() => {
								setLoading(true);
								setTimeout(() => {
									email &&
										password &&
										auth.signInWithEmailAndPassword(
											email,
											password,
											// onNotVerified
											user => {
												setLoading(false);
												setCheckAgain(true);
											},
											(error) => {
												console.warn(error);
												
											},
											// callback
											() => {
												setLoading(false);
												setDone(true);
												setTimeout(() => {
													navigate("/");
												}, 1000);
											}
										);
								}, 1000);
							}}
						>
							Done
						</Button>
						<p style={{ color: "GrayText" }}>
							Didn't get an email?{" "}
							<Button
								disabled={loading || done}
								style={{ margin: 0, padding: 0 }}
								size="small"
								type="link"
								onClick={() => {
									setLoading(true);
									email &&
										password &&
										auth.signInWithEmailAndPassword(
											email,
											password,
											user => {
												sendEmailVerification(user).then(() => {
													setLoading(false);
													setCheckAgain(false);
												});
											},
											() => {
												navigate("/");
											}
										);
								}}
							>
								Send again
							</Button>
						</p>
					</Space>
				</div>
			</div>
		</div>
	);
};

export default EmailVerification;
