import axios from 'axios';

export default axios.create({
    baseURL: "https://5347-94-73-35-53.eu.ngrok.io",
    headers: {"ngrok-skip-browser-warning": "true"}
})