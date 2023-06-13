// import {api} from "../../utils/api"
import axios from "axios"


export default async function loginRequest (loginData) {
    // console.log(api)
    const header = {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
    try {
        const response = await axios.post('http://localhost:5000/api/users/login', loginData, {header});
        return await response.json();
    } catch (error) {
        return error;
    }
}

