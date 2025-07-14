import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState<'signup' | 'login'>('signup');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async () => {
        setErrorMsg('');
        try {
            const res = await fetch('http://localhost:3001/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: email, password }),
            });
            if (!res.ok) {
                const data = await res.text();
                throw new Error(data || 'Sign up failed');
            }
            alert('sign up succesfull, please login')
            setMode('login');
        } catch (err: any) {
            setErrorMsg(err.message);
        }
    };

    const handleLogin = async () => {
        setErrorMsg('');
        try {
            const res = await fetch('http://localhost:3001/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: email, password }),
            });
            if (!res.ok) {
                const data = await res.text();
                throw new Error(data || 'Login failed');
            }
            const data = await res.json();
            localStorage.setItem('token', data.token); // Save the token!
            navigate('/');
        } catch (err: any) {
            setErrorMsg(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-gray-100">
            <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-800">
                <h1 className="text-3xl font-bold mb-6 text-center">Welcome</h1>
                <div className="flex justify-center mb-6 gap-4"></div>
                {errorMsg && (
                    <div className="mb-4 text-center text-red-400 font-semibold">
                        {errorMsg}
                    </div>
                )}
                <div className="mb-8">
                    {mode === 'signup' ? (
                        <>
                            <h2 className="text-xl font-semibold mb-2">Sign Up</h2>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full mb-3 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            />
                            <button
                                onClick={handleSignUp}
                                className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition mb-2"
                            >
                                Sign Up
                            </button>
                            <div className="text-center mt-2">
                                <span className="text-gray-400 text-sm">Already have an account? </span>
                                <button
                                    className="text-blue-400 hover:underline text-sm bg-transparent border-none outline-none cursor-pointer"
                                    onClick={() => setMode('login')}
                                >
                                    Login here.
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className="text-xl font-semibold mb-2">Login</h2>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full mb-3 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                            />
                            <button
                                onClick={handleLogin}
                                className="w-full py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow transition"
                            >
                                Login
                            </button>
                            <div className="text-center mt-2">
                                <span className="text-gray-400 text-sm">New user? </span>
                                <button
                                    className="text-green-400 hover:underline text-sm bg-transparent border-none outline-none cursor-pointer"
                                    onClick={() => setMode('signup')}
                                >
                                    Sign up here.
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}