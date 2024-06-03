import axios from "axios"

const url = `${process.env.REACT_APP_BACKEND_URL}/chat`;


export const get_chat_for_mentor = async (token, mentor_id) => {
    try {
        let options = {
            method: "GET",
            url: `${url}/sent-to/${mentor_id}`,
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


export const ack_reply_chat = async (token, payload, chat_id) => {
    try {
        let options = {
            method: "PUT",
            url: `${url}/acknowledge-reply/${chat_id}`,
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

export const get_chat_for_student = async (token, student_id) => {
    try {
        let options = {
            method: "GET",
            url: `${url}/sent-from/${student_id}`,
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

export const send_chat_by_student = async (token, payload) => {
    try {
        let options = {
            method: "POST",
            url: `${url}/add`,
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

export const set_meeting_message = async (token, payload, chat_id) => {
    try {
        let options = {
            method: "PUT",
            url: `${url}/acknowledge/add_meeting/${chat_id}`,
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