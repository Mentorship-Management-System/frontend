import axios from "axios"

const url = `${process.env.REACT_APP_BACKEND_URL}/student`;

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