export function utf16ToText(s: string) {
	return s.replace(/\\u[0-9a-fA-F]{4}/gi, (match: any) => {
		return String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16));
	});
}
