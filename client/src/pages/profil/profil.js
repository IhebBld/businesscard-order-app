import React, { useState, useEffect } from "react";
import "./profil.css";
import axios from "axios";
function Profil() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userImages, setUserImages] = useState([]);
    useEffect(() => {
        fetch("/login")
            .then((response) => response.json())
            .then((data) => {
                setIsLoggedIn(data.loggedIn);
                setUserId(data.user[0].id);
                setUserName(data.user[0].username);
                setUserEmail(data.user[0].useremail);
                axios
                    .get(`http://localhost:5000/user-images/${userId}`)
                    .then((res) => setUserImages(res.data))
                    .catch((err) => console.error(err));
            });
    }, []);

    return (
        <div id="profil">
            <div className="container emp-edit">
                {isLoggedIn ? (

                    <div>
                        <a href="/">Home</a>
                        <h4>You are logged in!</h4>
                        <p>
                            Your user ID is: {userId}
                            <br />
                            Your name is: {userName}
                            <br />
                            Your email is:{userEmail}
                        </p>
                        <h4>your Orders:</h4>
                        <div>
                            {userImages.map((image) => (
                                <img
                                    key={image.id}
                                    src={`http://localhost:5000/images/${image.image}`}
                                    style={{ width: "300px", height: "300px" }}
                                    alt="Order"
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <a href="/">You are not logged in.</a>

                )}
            </div>
        </div>
    );
}

export default Profil;
