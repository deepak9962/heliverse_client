import axios from "axios";

const BASE_URL = "https://api-heliverse.onrender.com/api/users"

function baseUrl() {
    return BASE_URL
}

async function getUsers(data) {
    return await axios.get(data.url, {
        headers: {
            'Content-Type': 'application/json'
        },
        params: data.params,
        cancelToken: data.cancelToken.token
    })
}

async function getUser(data, cancelToken) {
    return await axios.get(BASE_URL, {
        params: data.params,
        cancelToken: cancelToken.token,
    })
}

async function postUser(data, cancelToken) {
    return await axios.post(data.url, data.data, {
        cancelToken: cancelToken.token
    })
}

async function putUser(data) {
    return await axios.put(BASE_URL + '/' + data.id, data.data)
}

async function deleteUser(data, cancelToken) {
    return await axios.delete(BASE_URL, {
        params: data.params,
        cancelToken: cancelToken.token
    })
}

export {baseUrl, getUsers, getUser, postUser, putUser, deleteUser }