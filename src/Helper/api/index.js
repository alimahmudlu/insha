// PACKETS
import axios from "axios";

export const api = {
    user: {
        login: credentials =>
            axios.post("/api/auth/", { credentials }).then(res => res.data),
        control: () =>
            axios.get("/api/auth/").then(res => res.data).catch(() => {
                localStorage.professionJWT = "";
                localStorage.uid = ""
            })
    },
};
