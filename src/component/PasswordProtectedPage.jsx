import React, { useState } from "react";
import Certificate from "../Certificate";

const PasswordProtectedPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");

    const correctPassword = "aci"; // सही पासवर्ड सेट करें

    const handleSubmit = (e) => {
        e.preventDefault(); // फॉर्म रीलोड को रोकें
        if (passwordInput === correctPassword) {
            setIsAuthenticated(true); // ऑथेंटिकेटेड सेट करें
        } else {
            alert("Incorrect password!"); // पासवर्ड गलत होने पर अलर्ट
            setPasswordInput(""); // इनपुट साफ करें
        }
    };

    return (
        <div>
            {!isAuthenticated ? (
                <div style={{ textAlign: "center", marginTop: "100px" }}>
                    <h1>Please Enter Password</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            style={{ padding: "10px", fontSize: "16px" }}
                        />
                        <button type="submit" style={{ marginLeft: "10px", padding: "10px", fontSize: "16px" }}>
                            Submit
                        </button>
                    </form>
                </div>
            ) : (
                <div style={{ textAlign: "center", marginTop: "100px" }}>
                    <Certificate />
                </div>
            )}
        </div>
    );
};

export default PasswordProtectedPage;
