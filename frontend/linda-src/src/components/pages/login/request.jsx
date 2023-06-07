// import {api} from "../../utils/api"
import axios from "axios"


export default async function loginRequest (loginData) {
    // console.log(api)
    const header = {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
    try {
        const response = await axios.post(``, loginData, {header});
        return await response.json();
    } catch (error) {
        return error;
    }
}

