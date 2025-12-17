// import axios from "axios";
// import { baseUrlHandler } from "../utils/baseUrlHandeller";


// export default function api () {
//     return axios.create({
//         baseURL: baseUrlHandler(),
//     });
// }


import axios from "axios";
import { baseUrlHandler } from "../utils/baseUrlHandeller";

const api = axios.create({
  baseURL: baseUrlHandler(),
});

export default api;
