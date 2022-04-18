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
