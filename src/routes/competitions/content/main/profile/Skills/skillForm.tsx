import React, { useState, useEffect } from "react";
import { Modal, Select, Input } from "antd";

import FormItem from "components/FormItem";
import { SkillType, Level } from "./skill";
import "./style.less";
import { useHistory, useLocation } from "react-router-dom";

interface Props {
	onCancel: () => void;
	onSubmit: (skill: SkillType) => Promise<any>;
}

const SkillForm: React.FC<Props> = ({ onCancel, onSubmit }: Props) => {
	
	const params = new URLSearchParams(window.location.search);
	const state = useLocation().state as SkillType;
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [name, setName] = useState<string>("");
	let levels: keyof typeof Level;
	const [level, setLevel] = useState<typeof levels | undefined>();
	const [status, setStatus] = useState<{code: "error", msg: string}>();
	const [errMsg, setErrMsg] = useState<string>();

	useEffect(() => {
		console.log("changed state: ", state);
		setName(state?.name)
		setLevel(state?.level);
	}, [state])

	const handleOk = () => {
		setStatus(undefined);
		if (!name || !level) {
			setStatus({code: "error", msg: "empty fields"})
			return 
		}
		setConfirmLoading(true);
		onSubmit({ name, level } as SkillType)
			.then((res: any) => {
				setTimeout(() => {
					setConfirmLoading(false);
					onCancel();
				}, 2000);
			})
			.catch((err: any) => {
				console.warn(err);
				setStatus({code: "error", msg: "skill is duplicated"})
				setConfirmLoading(false);
			});
	};

	const handleCancel = () => {
		setStatus(undefined);
		console.log("Clicked cancel button");
		onCancel();
	};

	function handleChange(value: any) {
		setStatus(undefined);
		console.log(`selected ${value}`);
		setLevel(value);
	}

	return (
		<>
			<Modal
				// title="Add skill"
				visible={params.get("form") !== null}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
			>
				<div className="main-page-form-container">
					<FormItem label="Skill name" errorMessage={status?.msg}>
						<Input
							status={status?.code}
							allowClear
							value={name}
							onChange={e => setName(e.target.value)}
						/>
					</FormItem>
					<FormItem label="Skill level">
						<Select
							// showSearch
							// optionFilterProp="children"
							onChange={handleChange}
							value={level}
							// onSearch={onSearch}
							// filterOption={(input, option) =>
							//   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							// }
						>
							{Object.keys(Level).map(key => (
								<Select.Option key={key} value={key}>
									{key.charAt(0).toUpperCase() + key.slice(1)}
								</Select.Option>
							))}
						</Select>
					</FormItem>
				</div>
			</Modal>
		</>
	);
};

export default SkillForm;
