// TODO: Mock API
const fakeDelay = 1000;
const PARTICIPATIONS = [...Array(3).keys()].map((i, j) => {
	return { name: `U of T Clubs ${i}`, id: `club ${j}` };
});
const FOLLOWS = [...Array(20).keys()].map((i, j) => {
	return { name: `U of T Clubs ${i}`, id: `follow ${j}` };
});

const ClubService = {
	fetchClubsNameAndAvatar: async function (
		type: "PARTICIPATIONS" | "FOLLOWS"
	): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			setTimeout(() => {
				switch (type) {
					case "PARTICIPATIONS":
						resolve({ data: PARTICIPATIONS });
						break;
					case "FOLLOWS":
						resolve({ data: FOLLOWS });
						break;
					default:
						break;
				}
			}, fakeDelay);
		});
	},
	fetchClubs: async function (token?: any): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			setTimeout(() => {
				if (token !== undefined) {
                    resolve({data: [...PARTICIPATIONS, ...FOLLOWS]});
				} else {
					reject("fail");
				}
			}, fakeDelay);
		});
    },
	fetchClubDetail: async function (id: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            // if (initCall !== undefined) {
            //     console.log("init call")
            //     initCall();
            // }
			setTimeout(() => {
				if (id !== undefined) {
                    const club = [...PARTICIPATIONS, ...FOLLOWS].find(club => club.id === id);
                    resolve({data: club});
				} else {
					reject("fail");
				}
			}, fakeDelay);
		});
    },
};

export default ClubService;
