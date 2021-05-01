// TODO: Mock API

const AuthService = {
	login: async function (email: string, password: string): Promise<any> {
		return new Promise<any>((resolve, reject) => {
            setTimeout(() => {
                if (email !== undefined && password !== undefined) {
                    console.log("AuthService sucess")
                    resolve("success");
                } else {
                    console.error("AuthService fail", email, password)
                    reject("fail");
                }
            }, 1000); 
        }) 
    }
};


export default AuthService;
