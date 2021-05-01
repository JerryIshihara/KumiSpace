import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Input } from "antd";
import "./style.less";

import { Logo } from "../../../components";
import { logoutType } from "../../../redux/lib/auth.action";
import Avatar from "./avatar";


// const { Option } = Select;

interface Props extends RouteComponentProps{
	logout: logoutType;
}

const Header: React.FC<Props> = props => {
	return (
		<div className="strm-header">
			<Logo href="/" />

			<div>
				{/* <Input.Group compact>
					<Select defaultValue="All" style={{ width: 100 }}>
						<Option value="All">All</Option>
						<Option value="Events">Events</Option>
					</Select> */}
					<Input.Search placeholder="Search" style={{ width: 400 }} />
				{/* </Input.Group> */}
			</div>
			<Avatar logout={props.logout} />
		</div>
	);
};

export default withRouter(Header)
