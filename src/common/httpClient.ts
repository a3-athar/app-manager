import axios from "axios";

const baseUrl = 'https://engineering-task.elancoapps.com/api'

export const get = (url: string) => {
    return axios.get(baseUrl+url)
}