import axios from "axios"

const BASE_URL = "http://localhost/8080";

export const registerUser = () => axios.post(`${BASE_URL}/auth/user/register`);