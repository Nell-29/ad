import axios from "axios";

export const axiosUtil = async (options) => {
    return await axios.request(options).them ((res) => res.data);
};