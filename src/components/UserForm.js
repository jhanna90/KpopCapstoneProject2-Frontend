import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserForm.css'
import settings from '../settings';

const UserForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        fav_boy_group: '',
        fav_girl_group: '',
        bias: '',
        alt_bias: '',
        bias_wrecker: '',
        fav_girl_group_song: '',
        fav_boy_group_song: ''
    });
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const { BASE_API_URL } = settings

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send registration request
            const response = await axios.post(`${BASE_API_URL}api/register`, formData);

            // Check if registration was successful
            if (response.status === 201) {
                // Set registration success state
                setRegistrationSuccess(true);
            } else {
                // Redirect to error route
                navigate('/error');
            }
        } catch (error) {
            // Redirect to error route
            navigate('/error');
        }
    };

    useEffect(() => {
        let timeout;
        if (registrationSuccess) {
            // Set timeout to redirect after 5 seconds
            timeout = setTimeout(() => {
                navigate('/login');
            }, 2000);
        }

        // Clear timeout on component unmount
        return () => clearTimeout(timeout);
    }, [registrationSuccess, navigate]);

    return (
        <div className='container'>
            <h2>Create An Account!</h2>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                />
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <label>Favorite Boy Group:</label>
                <input
                    type="text"
                    name="fav_boy_group"
                    placeholder="Favorite Boy Group"
                    value={formData.fav_boy_group}
                    onChange={handleChange}
                />
                <label>Favorite Girl Group:</label>
                <input
                    type="text"
                    name="fav_girl_group"
                    placeholder="Favorite Girl Group"
                    value={formData.fav_girl_group}
                    onChange={handleChange}
                />
                <label>Bias:</label>
                <input
                    type="text"
                    name="bias"
                    placeholder="Bias"
                    value={formData.bias}
                    onChange={handleChange} />
                <label>Alt Bias:</label>
                <input
                    type="text"
                    name="alt_bias"
                    placeholder="Alt Bias"
                    alue={formData.alt_bias}
                    onChange={handleChange} />
                <label>Bias Wrecker:</label>
                <input
                    type="text"
                    name="bias_wrecker"
                    placeholder="Bias Wrecker"
                    value={formData.bias_wrecker}
                    onChange={handleChange} />
                <label>Favorite Girl Group Song:</label>
                <input
                    type="text"
                    name="fav_girl_group_song"
                    placeholder="Favorite Girl Group Song"
                    value={formData.fav_girl_group_song}
                    onChange={handleChange} />
                <label>Favorite Boy Group Song:</label>
                <input
                    type="text"
                    name="fav_boy_group_song"
                    placeholder="Favorite Boy Group Song"
                    value={formData.fav_boy_group_song}
                    onChange={handleChange} />

                <button type="submit">Register</button>
            </form>
            {registrationSuccess && (
                <div className='success-message'>
                    <p>User registered successfully!</p>
                </div>
            )}
        </div>
    );
};

export default UserForm;

