import React, { useMemo } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Input, Badge } from "antd";
import { BellOutlined } from "@ant-design/icons";
import "./style.less";

import { Logo } from "components";
import Avatar from "./avatar";
import Plus from "./plus";
import { useAuth } from "context/auth";
import { Link } from "react-router-dom";
import { useNotification } from "context/notification";

// const { Option } = Select;

const Header: React.FC<any> = props => {
	const auth = useAuth();
	const notification = useNotification();
	const show = useMemo(() => (auth.token ? true : false), [auth.token]);
	return (
		<div className="header">
			<Logo href="/" />

			<div className="header-search">
				{/* <Input.Group compact>
					<Select defaultValue="All" style={{ width: 100 }}>
						<Option value="All">All</Option>
						<Option value="Events">Events</Option>
					</Select> */}
				<Input.Search placeholder="Search" />
				{/* </Input.Group> */}
			</div>
			<div className="header-icons">
				{/* <Plus /> */}
				{show && (
					<Link
						to={"/notifications"}
						style={{ color: "InfoText", lineHeight: 0 }}
					>
						<Badge count={notification.unread.length}>
							<BellOutlined
								className="header-icon"
								style={{ marginRight: 0 }}
							/>
						</Badge>
					</Link>
				)}
				<Avatar show={show} />
			</div>
		</div>
	);
};

export default withRouter(Header);
