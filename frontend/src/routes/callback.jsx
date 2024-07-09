import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Root() {

    const navigate = useNavigate();

    useEffect(() => {
        //console.log(window.location.href)
        let code = unescape(window.location.href.split("?")[1].split("code")[1].split("&")[0].split("=")[1])
        //console.log(code)
        fetch('http://localhost:8080/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ key: code }),
        }).then(resp => resp.text()).then(text => {
            try {
                let json = JSON.parse(text);
                //console.log(json)
                let profile = {
                    uuid: json["uuid"],
                    email: json["email"],
                    name: json["name"],
                    userId: json["email"].split("@")[0],
                }

                if (json["exists"] === true) {
                    profile["status"] = true;
                    //console.log("cndjcdn");
                    localStorage.setItem("profile", JSON.stringify(profile))
                    navigate('/');
                } else {
                    profile["status"] = false;
                    localStorage.setItem("profile", JSON.stringify(profile))
                    navigate('/register');
                }

            } catch (e) {
                //console.log(e);
            }
        })
    }, []);
}