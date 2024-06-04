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

export const get_all_admins = async (token) => {
    try {
        let options = {
            method: "GET",
            url: `${url}/all`,
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

export const delete_admins = async (token, payload) => {
    try {
        let options = {
            method: "DELETE",
            url: `${url}/delete-admins-profile`,
            headers: {
                "authorization": `Bearer ${token}`
            },
            data: payload
        }
        const result = await axios(options);
        return result;
    } catch (error) {
        return error;
    }
}

export const register_admin = async (token, payload) => {
    try {
        let options = {
            method: "POST",
            url: `${url}/register`,
            headers: {
                "authorization": `Bearer ${token}`
            },
            data: payload
        }
        const result = await axios(options);
        return result;
    } catch (error) {
        return error;
    }
}

export const manul_assign_mentees = async (token, payload) => {
    try {
        let options = {
            method: "POST",
            url: `${url}/manual-allocate`,
            headers: {
                "authorization": `Bearer ${token}`
            },
            data: payload
        }
        const result = await axios(options);
        return result;
    } catch (error) {
        return error;
    }
}

export const auto_assign_mentees = async (token) => {
    try {
        let options = {
            method: "POST",
            url: `${url}/auto-allocate`,
            headers: {
                "authorization": `Bearer ${token}`
            }
        }
        const result = await axios(options);
        return result;
    } catch (error) {
        return error;
    }
}