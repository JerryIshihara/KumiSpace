import { Input } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";
import { Button } from "antd";
import Message from "./message";

const Messages: React.FC<any> = () => {
	const num_message = Math.floor(Math.random() * 10);
	return (
		<div>
			<Input.TextArea
				style={{ width: 500 }}
				autoSize={{ minRows: 2, maxRows: 6 }}
				allowClear
				placeholder="Please Enter something"
			/>
			<Button size="small" style={{ margin: "4px 0 20px 0" }}>
				Post Comment
			</Button>
			<p>{num_message} messages</p>
			<div className="messages-container">
				{[
					...Array(num_message)
						.fill("")
						.map(_ => <Message />),
				]}
			</div>
		</div>
	);
};

export default Messages;
