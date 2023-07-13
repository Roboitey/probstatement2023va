import React from 'react'
import { useState } from 'react';
import { LoginSystem } from '../services/LoginService';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [isCaptchaValid, setIsCaptchaValid] = useState(false);
    const [captchaImage, setCaptchaImage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isCaptchaValid) {
            // Perform login logic here
            console.log('Correct captcha');
            LoginSystem(username, password);
        } else {
            console.log('Invalid captcha');
        }
    };

    const handleCaptchaChange = (event) => {
        setCaptcha(event.target.value);
    };

    const handleCaptchaBlur = () => {
        // Simulate captcha validation (e.g., make an API call)
        const isCaptchaValid = captcha === 'ja5tyi02'; // Replace '1234' with the correct captcha value
        setIsCaptchaValid(isCaptchaValid);
    };

    const handleShowCaptchaImage = () => {
        // Simulate fetching the captcha image URL
        const captchaImage = 'images/Captcha.png'; // Replace with the actual captcha image URL
        setCaptchaImage(captchaImage);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Login Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        style={{
                            backgroundColor: '#93a0ad',
                            outlineColor: '#0d0d0d'
                        }}
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="Username"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        style={{
                            backgroundColor: '#93a0ad',
                            outlineColor: '#0d0d0d'
                        }}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Password"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="captcha" className="form-label">Captcha:</label>
                    <input
                        type="text"
                        id="captcha"
                        className="form-control"
                        style={{
                            backgroundColor: '#93a0ad',
                            outlineColor: '#0d0d0d'
                        }}
                        value={captcha}
                        onChange={handleCaptchaChange}
                        onBlur={handleCaptchaBlur}
                        placeholder="Captcha"
                    />
                </div>

                <div className="mb-3">
                    <button type="button" className="btn btn-secondary" onClick={handleShowCaptchaImage}>
                        Show Captcha
                    </button>
                </div>

                {captchaImage && (
                    <div className="mb-3">
                        <img src={captchaImage} alt="Captcha" className="img-fluid" />
                    </div>
                )}

                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}
export default Login