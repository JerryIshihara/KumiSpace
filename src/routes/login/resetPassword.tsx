import React, { useState, useEffect, useMemo } from "react";
import "./style.less";

import { Button, Input, Space } from "antd";
import {
	CheckCircleTwoTone,
	LoadingOutlined,
	ArrowLeftOutlined,
} from "@ant-design/icons";
import { Alert } from "@arco-design/web-react";
import {
	withRouter,
	RouteComponentProps,
	useParams,
	useLocation,
	useHistory,
	Redirect,
} from "react-router-dom";
import { FIREBASE_ERROR_CODE } from 'firebase';
import Navbar from "./navbar";
import OAuth from "./oauth";
// import { AuthProps } from "../../redux/lib/auth.type";
import { useAuth } from "context/auth";

const SIGNIN = "sign-in";
const SIGNUP = "sign-up";
const EMAIL_VERIFICATION = "email-verification";

interface Props extends RouteComponentProps {}

const ResetPassword: React.FC<Props> = props => {
	const auth = useAuth();
	const state = useLocation().state as { email: string; password: string };
	const [email, setEmail] = useState<string>();
	const [error, setError] = useState<string>();
	const [loading, setLoading] = useState<boolean>(false);
	const [done, setDone] = useState<boolean>(false);
	const [checkAgain, setCheckAgain] = useState<boolean>(false);
	const Title = useMemo(
		() => (done ? "Instruction sent" : "Reset password"),
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
			props.history.push("/page-not-found");
		} else {
			setEmail(state.email);
		}
	}, [state]);

	const resetPassword = () => {
		setLoading(true);
		setTimeout(() => {
			email &&
				auth.resetPassword(email,
					(error) => {
						setLoading(false);
						if (error.code === FIREBASE_ERROR_CODE.AUTH.USER_NOT_FOUND) {
							console.warn(error);
							setError("Email not registered")
						}
					},
					() => {
					setLoading(false);
					setDone(true);
				});
		}, 500);
	};

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
							{error && (
								<Alert
									style={{ margin: "8px 0" }}
									type="error"
									content={error}
								/>
							)}
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
						{/* {Message} */}
						{done ? (
							<p>
								Reset instruction has been sent to <b>{email}</b>
							</p>
						) : (
							<Input
								style={{ width: 400 }}
								size="large"
								placeholder="Email Address"
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						)}

						{!done && (
							<Button
								className="login-form-submit"
								// size="large"
								type="primary"
								// style={{ width: "100%" }}
								disabled={loading || done}
								onClick={resetPassword}
							>
								Send instruction
							</Button>
						)}
						{done && (
							<p style={{ color: "GrayText" }}>
								Didn't get an email?{" "}
								<Button
									style={{ margin: 0, padding: 0 }}
									size="small"
									type="link"
									onClick={resetPassword}
								>
									Send again
								</Button>
							</p>
						)}
						<Button
							type="text"
							style={{ color: "GrayText" }}
							icon={<ArrowLeftOutlined />}
							onClick={() => {props.history.goBack()}}
						>
							Back to log in
						</Button>
					</Space>
				</div>
			</div>
		</div>
	);
};

export default withRouter(ResetPassword);
