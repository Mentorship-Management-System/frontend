import axios from "axios"

const url = `${process.env.REACT_APP_BACKEND_URL}/admin`;

export const admin_login = async (payload) => {
    try {
        let options = {
            method: "POST",
            url: `${url}/login`,
            data: payload
        }
        const result = await axios(options);
        return result;
    } catch (error) {
        return error;
    }
}