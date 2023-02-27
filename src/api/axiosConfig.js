import axios from 'axios';

export default axios.create({
    baseURL: "https://4368-66-81-174-110.eu.ngrok.io",
    headers: {"ngrok-skip-browser-warning": "true"}
})