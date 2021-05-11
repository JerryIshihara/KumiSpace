export const tab_constants = [
	{
		key: "Home",
        path: "",
        isActive: (tab: string | undefined) => { console.log(!tab); return !tab}
	},
	{
		key: "Moments",
        path: "/moments",
        isActive: (tab: string | undefined) => tab === "moments"
	},
	{
		key: "Clubs",
        path: "/clubs",
        isActive: (tab: string | undefined) => tab === "clubs"
	},
	{
		key: "Events",
        path: "/events",
        isActive: (tab: string | undefined) => tab === "events"
	},
	{
		key: "Follows",
        path: "/follows",
        isActive: (tab: string | undefined) => tab === "follows"
	},
];
