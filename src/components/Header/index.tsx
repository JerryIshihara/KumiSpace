import React, { useMemo } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Input } from "antd";
import { BellOutlined, PlusCircleOutlined } from "@ant-design/icons";
import "./style.less";

import { Logo } from "components";
import Avatar from "./avatar";
import Plus from "./plus";
import { useAuth } from "context/auth";
import { Link, useHistory } from "react-router-dom";

// const { Option } = Select;

const Header: React.FC<any> = props => {
	const auth = useAuth();
	const history = useHistory();
	const show = useMemo(() => (auth.token ? true : false), [auth.token]);
	return (
		<div className="strm-header">
			<Logo href="/" />

			<div className="strm-header-search">
				{/* <Input.Group compact>
					<Select defaultValue="All" style={{ width: 100 }}>
						<Option value="All">All</Option>
						<Option value="Events">Events</Option>
					</Select> */}
				<Input.Search placeholder="Search" />
				{/* </Input.Group> */}
			</div>
			<div className="strm-header-icons">
				{/* <Plus /> */}
				{show && (
					<Link to={"/notifications"} style={{color: "InfoText", lineHeight: 0}}>
					<BellOutlined
							className="strm-header-icon" />
						</Link>
				)}
				<Avatar show={show} />
			</div>
		</div>
	);
};

export default withRouter(Header);
