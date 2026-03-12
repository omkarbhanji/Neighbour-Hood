import api from "./api";

export const registerNewUser = (data) => {
    console.log(data);
    const result = api.post('/register', data);
    return result
}

export const loginUser = (data) => {
    console.log(data);
    const result = api.post('/login', data);
    return result;
}

