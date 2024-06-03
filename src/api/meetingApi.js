import axios from "axios"

const url = `${process.env.REACT_APP_BACKEND_URL}/meeting`;

export const get_meetings_by_mentor_id = async (token, mentor_id) => {
    try {
        let options = {
            method: "GET",
            url: `${url}/mentor/${mentor_id}`,
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

export const get_meetings_by_student_id = async (token, student_id) => {
    try {
        let options = {
            method: "GET",
            url: `${url}/students/${student_id}`,
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

export const approve_meeting = async (token, mentor_id, meeting_id) => {
    try {
        let options = {
            method: "PUT",
            url: `${url}/${meeting_id}/${mentor_id}/approve`,
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

export const create_meeting = async (token, meeting) => {
    try {
        let options = {
            method: "POST",
            url: `${url}/add`,
            headers: {
                "authorization": `Bearer ${token}`
            },
            data: meeting
        }
        const result = await axios(options);
        return result;
    } catch (error) {
        return error;
    }
}

export const update_feedback = async (token, meeting_id, payload) => {
    try {
        let options = {
            method: "PATCH",
            url: `${url}/feedback/${meeting_id}`,
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

export const delete_meeting = async (token, meeting_id) => {
    try {
        let options = {
            method: "DELETE",
            url: `${url}/${meeting_id}`,
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

export const update_meeting = async (token, meeting_id, payload) => {
    try {
        let options = {
            method: "PUT",
            url: `${url}/${meeting_id}`,
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