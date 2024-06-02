import axios from "axios"

const url = `${process.env.REACT_APP_BACKEND_URL}/student`;

export const student_login = async (payload) => {
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

export const all_students = async (token) => {
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

export const get_student = async (token, roll) => {
    try {
        let options = {
            method: "GET",
            url: `${url}/${roll}`,
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

export const get_students_by_mentor_id = async (token, mentor_id) => {
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

export const updated_student = async (token, rollno, payload) => {
    try {
        let options = {
            method: "PUT",
            url: `${url}/${rollno}`,
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

export const get_sgpa = async (token, enrollment_no) => {
    try {
        let options = {
            method: "GET",
            url: `${url}/sgpa/${enrollment_no}`,
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

export const save_sgpa = async (token, payload) => {
    try {
        let options = {
            method: "POST",
            url: `${url}/save-sgpa`,
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

export const delete_students = async (token, payload) => {
    try {
        let options = {
            method: "DELETE",
            url: `${url}/delete-students-profile`,
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
