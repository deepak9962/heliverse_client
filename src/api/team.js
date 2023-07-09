import axios from "axios";

const BASE_URL = "https://api-heliverse.onrender.com/api/team"

function baseUrl() {
    return BASE_URL
}

async function getTeams(data) {
    return await axios.get(BASE_URL, {
        headers: {
            'Content-Type': 'application/json'
        },
        cancelToken: data.cancelToken.token
    })
}

async function getTeam(data) {
    return await axios.get(BASE_URL + '/' + data.id, {
        headers: {
            'Content-Type': 'application/json'
        },
        cancelToken: data.cancelToken.token
    })
}

async function postTeam(data) {
    return await axios.post(BASE_URL, data.data)
}

export { baseUrl, getTeams, getTeam, postTeam }