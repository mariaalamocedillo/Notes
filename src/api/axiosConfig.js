import axios from 'axios';

export default axios.create({
    baseURL: "https://3650-94-73-35-53.eu.ngrok.io",
    headers: {"ngrok-skip-browser-warning": "true"}
})