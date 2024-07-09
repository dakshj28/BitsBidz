import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import "../assets/css/register.css";

export default function Root() {
    const [profile, setProfile] = useState("");
    const [phone, setPhone] = useState("");
    const [hostel, setHostel] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        try {
            let profile = JSON.parse(localStorage.getItem("profile"));
            setProfile(profile);
            if (profile.status === true) {
                navigate("/home");
            }
        } catch (e) {
            navigate("/login");
        }
    }, []);

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
        //console.log("cdncjd");
    };

    const handleHostelChange = (event) => {
        setHostel(event.target.value);
        //console.log("cdncjd");
    };

    const handleSubmit = (event) => {
        fetch("http://localhost:8080/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: profile.name,
                email: profile.email,
                phone: phone,
                hostel: hostel,
                sessionId: profile.sessionId,
            }),
        }).then(resp => resp.text()).then(text => {
            if (text === "Success") {
                profile["status"] = true;
                profile["userId"] = profile["email"].split("@")[0];
                localStorage.setItem("profile", JSON.stringify(profile))
                navigate("/home");
            }
        })
    }

    return (
        <>
            <div className="register-box">
                <div className="register-body">
                    <div className="register-regtex">Registration</div>
                    <div className="register-register">
                        <div id="register-flex-container">
                            <div className="register-flex-item-3">
                                <div className="register-flex-1">
                                    <div className="register-text-wrapper">Name:</div>
                                    <input
                                        placeholder="Max 50 characters"
                                        className="register-text-input-name"
                                        value={profile?.name}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="register-flex-item-3">
                                <div className="register-flex-1">
                                    <div className="register-text-wrapper">Email:</div>
                                    <input
                                        placeholder="Max 50 characters"
                                        className="register-text-input-name"
                                        value={profile?.email}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="register-flex-item-3">
                                <div className="register-flex-1">
                                    <div className="register-text-wrapper">Phone:</div>
                                    <input
                                        type="text"
                                        maxlength="10"
                                        placeholder="Max 10 characters"
                                        className="register-text-input-name"
                                        onChange={handlePhoneChange}
                                        value={phone}
                                    />
                                </div>
                            </div>
                            <div className="register-flex-item-3">
                                <div className="register-flex-1">
                                    <div className="register-text-wrapper">Hostel:</div>
                                    <input
                                        type="text"
                                        maxlength="6"
                                        placeholder="Max 10 characters (eg. VK-399)"
                                        className="register-text-input-name"
                                        onChange={handleHostelChange}
                                        value={hostel}
                                    />
                                </div>
                            </div>
                            <div className="register-flex-item-3">
                                <div className="register-flex-submit">
                                    <div className="register-submit">
                                        <div role="button" tabIndex="0" onClick={handleSubmit} className="register-submit-text-wrapper">Submit</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
