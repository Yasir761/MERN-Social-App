import React, { useState } from 'react';
import Logo from '../../Img/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, signUp } from '../../actions/AuthAction.js';

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(true);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.authReducer.loading);

    const [data, setData] = useState({ firstname: "", lastname: "", email: "", password: "", confirmpass: "" });
    const [confirmPass, setConfirmPass] = useState(true);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handlSubmit = (e) => {
        e.preventDefault();

        if (isSignUp) {
            data.password === data.confirmpass ? dispatch(signUp(data)) : setConfirmPass(false);
        } else {
            dispatch(logIn(data));
        }
    };

    const resetForm = () => {
        setConfirmPass(true);
        setData({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmpass: "",
        });
    };

    return (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gray-100">
            {/* Left Side */}
            <div className="flex flex-col items-center p-8 bg-white shadow-lg rounded-lg md:mr-8">
                {/* <img src={Logo} alt="Logo" className="w-24 mb-4" /> */}
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-2">Welcome!</h2>
                    <p className="text-gray-500">
                        Explore the ideas throughout <br /> the world.
                    </p>
                </div>
            </div>

            {/* Right Side */}
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <form className="space-y-4" onSubmit={handlSubmit}>
                    <h2 className="text-xl font-bold mb-4">{isSignUp ? "Sign Up" : "Log In"}</h2>

                    {isSignUp && (
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name="firstname"
                                onChange={handleChange}
                                value={data.firstname}
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name="lastname"
                                onChange={handleChange}
                                value={data.lastname}
                            />
                        </div>
                    )}

                    <input
                        type="email"
                        placeholder="Email"
                        className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        name="email"
                        onChange={handleChange}
                        value={data.email}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="password"
                            placeholder="Password"
                            className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                        />
                        {isSignUp && (
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                name="confirmpass"
                                onChange={handleChange}
                                value={data.confirmpass}
                            />
                        )}
                    </div>

                    {!confirmPass && (
                        <span className="text-red-500 text-sm">
                            * Confirm Password is not the same
                        </span>
                    )}

                    <div className="text-sm text-blue-500 cursor-pointer" onClick={() => { setIsSignUp(!isSignUp); resetForm(); }}>
                        {isSignUp ? "Already have an account? Login here" : "Don't have an account?  Sign up here"}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600 disabled:opacity-50"
                    >
                        {loading ? "Loading..." : isSignUp ? "Sign Up" : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Auth;
