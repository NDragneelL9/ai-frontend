import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { CiLogin } from "react-icons/ci";
import { currentUser } from "../signals/signals"
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useSignal, useSignalEffect } from '@preact/signals-react';

const UserAuthPage = () => {
    const user = useSignal(null);
    const navigate = useNavigate();

    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => {
            user.value = codeResponse;
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    useSignalEffect(() => {
        if (user.value) {
            fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${user.value.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.value.access_token}`
                }
            })
            .then((response) => response.json())
            .then(user => {
                currentUser.value = {
                    firstName: user.given_name,
                    lastName: user.family_name,
                    address: {
                        country: 'Country',
                        city: 'City',
                        street: '123 Main St',
                    },
                    creditCardInfo: '**** **** **** 1234',
                    profileImage: user.picture,
                }
                navigate("/profile")
            })
            .catch((error) => console.log(error));
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // demo login process
        currentUser.value = {
            firstName: 'John',
            lastName: 'Doe',
            address: {
                country: 'Country',
                city: 'City',
                street: '123 Main St',
            },
            creditCardInfo: '**** **** **** 1234',
            profileImage: "https://media.istockphoto.com/id/475950468/photo/cat-holding-a-banner-offender-on-white-background.jpg?s=612x612&w=0&k=20&c=FEbVbXr_4MGBvzppM3DwPq54mOnLucnhHbLDQTV8Exw=",
        }
        navigate("/profile")
    }

    return (
        <div className="min-h-[71vh] flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in or Create an Account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <CiLogin size={25} /> Sign in
                        </button>
                    </div>
                </form>
                <div className="flex justify-center">
                    <button
                        onClick={googleLogin}
                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-md text-base font-medium text-gray-800 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        <FcGoogle size={25} />
                        Sign in with Google
                    </button>
                </div>
                <div className="mt-2">
                    <p className="text-center text-sm text-gray-600">
                        Don't have an account? <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Create one</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default UserAuthPage;
