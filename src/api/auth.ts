import axios from "axios";
const baseUrl = "http://192.168.2.12:8000";

const withUrl = (suffix: string) => `${baseUrl}${suffix}`

// see flagger API documentation for specification
export const IdentityType = {
    email: "email",
    wechat: "wechat",
    phone: "phone"
}

export const login = async (email: string, password: string) => {
    const response = await axios({
        method: "PUT",
        url: withUrl("/users/login"),
        data: {
            identity_type: IdentityType.email,
            identifier: email.toLowerCase(),
            credential: password,
        }
    })
    return response;
}

export const signup = async (email: string, password: string) => {
    const response = await axios({
        method: "POST",
        url: withUrl("/users/signup"),
        data: {
            identity_type: IdentityType.email,
            identifier: email.toLowerCase(),
            credential: password,
        }
    })
    return response;
}