import React, { useState, useEffect } from "react";
import { Modal, Select, Input } from "antd";

import FormItem from "components/FormItem";
import { Level } from "./skill";
import "./style.less";
import { useHistory, useLocation } from "react-router-dom";
import { useUser, UserSkillProps } from "context/user";

interface Props {
	onFinish: () => void;
}

const SkillForm: React.FC<Props> = ({ onFinish }: Props) => {
	const userContext = useUser()
	const params = new URLSearchParams(window.location.search);
	const state = useLocation().state as UserSkillProps;
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [name, setName] = useState<string>("");
	let levels: keyof typeof Level;
	const [level, setLevel] = useState<typeof levels | undefined>();
	const [status, setStatus] = useState<{code: "error", msg: string}>();
	const [errMsg, setErrMsg] = useState<string>();

	useEffect(() => {
		setName(state?.name)
		setLevel(state?.level);
	}, [state])

	const handleEdit = (pid: string) => {
		if (userContext.user?.skills.filter((item: UserSkillProps) => item.public_id !== pid && item.name === name).length > 0) {
			setStatus({code: "error", msg: "skill is duplicated"})
		} else {
			userContext.editSkill(pid, { name, level }, () => {
				setConfirmLoading(false);
				onFinish()
			})
		}

	}

	const handleAdd = () => {
		if (userContext.user?.skills.filter((s: UserSkillProps) => name === s.name).length > 0) {
			setStatus({code: "error", msg: "skill is duplicated"})
		} else {
			userContext.addSkill({ name, level }, () => {
				setConfirmLoading(false);
				onFinish()
			})
		}
	}

	const handleOk = () => {
		setStatus(undefined);
		if (!name) {
			setStatus({code: "error", msg: "empty fields"})
			return 
		}
		setConfirmLoading(true);
		const pid = params.get("id")
		pid ? handleEdit(pid) : handleAdd()
			
	};

	const handleCancel = () => {
		setStatus(undefined);
		console.log("Clicked cancel button");
		onFinish();
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
				visible={params.get("form") === 'skill'}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
			>
				<div className="main-page-form-container">
					<FormItem label="Skill / Knowledge" errorMessage={status?.msg}>
						<Input
							placeholder="Python / Natural Language Processing"
							status={status?.code}
							allowClear
							value={name}
							onChange={e => setName(e.target.value)}
						/>
					</FormItem>
					<FormItem label="Level">
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
