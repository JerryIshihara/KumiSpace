export function timeToDeadline(deadline: Date) {
	const date = new Date(deadline);
	const today = Date.now();
	const diffTime = date.getTime() - today;
	const diffDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	const diffMonth = Math.floor(diffDay / 30);
	if (today > date.getTime()) {
		return "closed";
	}
	return diffMonth > 0
		? diffMonth > 2
			? "ongoing"
			: `${diffMonth} month${diffMonth === 1 ? "" : "s"} to go`
		: `${diffDay} days to go`;
}

export function timePassed(time: Date) {
	const date = new Date(time);
	const today = Date.now();
	const diffTime = today - date.getTime();
	const diffMinute = Math.ceil(diffTime / (1000 * 60));
	const diffHour = Math.floor(diffTime / (1000 * 60 * 60));
	const diffDay = Math.floor(diffTime / (1000 * 60 * 60 * 24));
	const diffMonth = Math.floor(diffDay / 30);
	if (diffMonth > 0) {
		return `${diffMonth} month${diffMonth === 1 ? "" : "s"} ago`;
	} else if (diffDay > 0) {
		return `${diffDay} day${diffDay === 1 ? "" : "s"} ago`;
	} else if (diffHour > 0) {
		return `${diffHour} hour${diffHour === 1 ? "" : "s"} ago`;
	}
	return `${diffMinute} minute${diffMinute === 1 ? "" : "s"} ago`;
}
