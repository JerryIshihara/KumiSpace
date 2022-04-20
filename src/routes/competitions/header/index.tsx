import React, {useMemo} from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Input } from "antd";
import { BellOutlined, PlusCircleOutlined } from "@ant-design/icons";
import "./style.less";

import { Logo } from "../../../components";
import Avatar from "./avatar";
import Plus from "./plus";
import { useAuth } from "context/auth";

// const { Option } = Select;

const Header: React.FC<any> = props => {
	const auth = useAuth()
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
				<Input.Search placeholder="Search"/>
				{/* </Input.Group> */}
			</div>
			<div className="strm-header-icons">
				{/* <Plus /> */}
				{show && <BellOutlined className="strm-header-icon" />}
				<Avatar show={show}/>
			</div>
		</div>
	);
};

export default withRouter(Header);
