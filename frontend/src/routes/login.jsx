import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Root() {
    const navigate = useNavigate();

    useEffect(() => {
        try {
            let profile = JSON.parse(localStorage.getItem("profile"))
            if (profile.status === true) {
                navigate('/');
            } else {
                navigate('/register');
            }
        } catch (e) {
            let scope = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
            let client_id = "693745589525-bjckfl34kha6igj4bed9ofa0t9qqbpdc.apps.googleusercontent.com";
            let redirect_uri = "http://localhost:5173/callback";

            window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}`;
        }
    })
}