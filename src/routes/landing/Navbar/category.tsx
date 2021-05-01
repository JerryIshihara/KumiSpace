import { Menu, Button, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

// import { OutsideDetector } from "../index";

const { SubMenu } = Menu;

const menu = (
	<Menu>
		<Menu.ItemGroup title="Group title">
			<Menu.Item>1st menu item</Menu.Item>
			<Menu.Item>2nd menu item</Menu.Item>
		</Menu.ItemGroup>
		<SubMenu title="sub menu">
			<Menu.Item>3rd menu item</Menu.Item>
			<Menu.Item>4th menu item</Menu.Item>
		</SubMenu>
		<SubMenu title="disabled sub menu" disabled>
			<Menu.Item>5d menu item</Menu.Item>
			<Menu.Item>6th menu item</Menu.Item>
		</SubMenu>
	</Menu>
);

const NavBarCategory: React.FC = () => {
	return (
		<Dropdown placement="bottomLeft"  overlay={menu}>
			<Button type="text" size="large" style={{padding: "0"}}>
				Categories <DownOutlined />
			</Button>
		</Dropdown>
	);
};

export default NavBarCategory;
