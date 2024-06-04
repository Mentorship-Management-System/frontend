import axios from "axios"

const url = `${process.env.REACT_APP_BACKEND_URL}/mentor`;

export const mentor_login = async (payload) => {
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

export const all_mentors = async (token) => {
    try {
        let options = {
            method: "GET",
            url: `${url}/all`,
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

export const get_mentor = async (token, mentor_id) => {
    try {
        let options = {
            method: "GET",
            url: `${url}/${mentor_id}`,
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

export const update_mentor = async (token, mentor_id, payload) => {
    try {
        let options = {
            method: "PUT",
            url: `${url}/update/${mentor_id}`,
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

export const delete_mentors = async (token, payload) => {
    try {
        let options = {
            method: "DELETE",
            url: `${url}/delete-mentors-profile`,
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

export const register_mentor = async (payload) => {
    try {
        let options = {
            method: "POST",
            url: `${url}/register`,
            data: payload
        }
        const result = await axios(options);
        return result;
    } catch (error) {
        return error;
    }
}