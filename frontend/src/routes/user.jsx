import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Root() {
    var [user, setUser] = useState(null);
    var [bal, setBal] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/user', {
        })
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
                setBal(data.balance);
            });
    }, []);

    const handleChange = event => {
        setBal(event.target.value);
    };

    const handleSubmit = event => {
        fetch('http://localhost:8080/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ search: "1" }),
        })
            .then((res) => res.json())
            .then((data) => {
                navigate('/items', { state: { data: data } });
            });
    }

    let scope = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
    let client_id = "464230696462-ocvd9o953lrn31bmf62kjcnu1fr6vcuu.apps.googleusercontent.com";
    let redirect_uri = "http://localhost:5173/callback";

    const handleLogin = event => {
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}`;
    }

    return (
        <main>
            {user && <h1>Hello {user.name}</h1>}
            {user && <h1>Balance {user.balance}</h1>}
            {user && <input value={bal} onChange={handleChange} type="number" />}
            <button onClick={handleSubmit} >Deposit</button>
            <button onClick={handleLogin} >Login</button>
        </main>
    )
}
