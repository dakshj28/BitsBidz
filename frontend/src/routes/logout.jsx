import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Root() {
    const navigate = useNavigate();

    useEffect(() => {
        var profile = JSON.parse(localStorage.getItem("profile"))
        try {
            if (profile.status === true) {
                localStorage.removeItem("profile")
            }
        } catch (e) {
            navigate('/')
        }
        navigate('/')
    });

}