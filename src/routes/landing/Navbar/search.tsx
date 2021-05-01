import React from "react";
import "./style.less";

import { Input } from 'antd';

const { Search } = Input;

const NavBarSearch: React.FC = () => {
	return (
        <Input placeholder="Search" allowClear style={{ width: 200 }}/>
	);
};

export default NavBarSearch;
