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

export const upload_students = async (token, payload) => {
    try {
        let options = {
            method: "POST",
            url: `${url}/upload-students`,
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

export const get_students_count_by_year = async (token, mentorId) => {
    try {
        let options = {
            method: "GET",
            url: `${url}/count-by-year/${mentorId}`,
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

export const all_count_by_year = async (token) => {
    try {
        let options = {
            method: "GET",
            url: `${url}/all-count-by-year`,
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

export const year_gender_count = async (token) => {
    try {
        let options = {
            method: "GET",
            url: `${url}/year/gender-count`,
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