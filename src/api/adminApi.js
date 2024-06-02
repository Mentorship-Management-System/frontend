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

export const get_count = async (token) => {
    try {
        let options = {
            method: "GET",
            url: `${url}/counts`,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        const result = await axios(options);
        return result;
    } catch (error) {
        return error;
    }
}

export const reset_password = async (token, payload) => {
    try {
        let options = {
            method: "POST",
            url: `${url}/reset-password`,
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: payload
        }
        const result = await axios(options);
        return result;
    } catch (error) {
        return error;
    }
}