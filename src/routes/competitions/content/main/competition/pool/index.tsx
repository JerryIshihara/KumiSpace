import './style.less'
import { UserItem } from "components";

const Pool: React.FC = () => {
	const numMember = Math.max(1, Math.min(4, Math.floor(Math.random() * 10)));
	return (
		<div className="pool-container">
			{[...Array(numMember)].fill("").map(_ => (
				<UserItem />
			))}
		</div>
	);
};

export default Pool;
