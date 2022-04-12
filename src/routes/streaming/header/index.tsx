import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Input } from "antd";
import { BellOutlined, PlusCircleOutlined } from "@ant-design/icons";
import "./style.less";

import { Logo } from "../../../components";
import Avatar from "./avatar";
import Plus from "./plus";

// const { Option } = Select;
const Header: React.FC<any> = props => {
	return (
		<div className="strm-header">
			<Logo href="/" />

			<div className="strm-header-search">
				{/* <Input.Group compact>
					<Select defaultValue="All" style={{ width: 100 }}>
						<Option value="All">All</Option>
						<Option value="Events">Events</Option>
					</Select> */}
				<Input.Search placeholder="Search"/>
				{/* </Input.Group> */}
			</div>
			<div className="strm-header-icons">
				<Plus />
				<BellOutlined className="strm-header-icon" />
				<Avatar logout={props.logout} />
			</div>
		</div>
	);
};

export default withRouter(Header);
