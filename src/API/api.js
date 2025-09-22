import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const registerUser = (user) => axios.post(`${BASE_URL}/auth/user/register`, user);

export const loginUser = (user) => axios.post(`${BASE_URL}/auth/user/login`, user);

export const loginAdmin = (admin) => axios.post(`${BASE_URL}/auth/admin/login`,admin);

export const setMarker = (marker) => axios.post(`${BASE_URL}/location/setMarker`,marker);