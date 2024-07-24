import { useForm, SubmitHandler } from 'react-hook-form';
import { useLoginMutation } from '../apiservices/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../apiservices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface LoginFormInputs {
    username: string;
    password: string;
}

interface AuthResponse {
    user: {
        username: string;
        role: string;
        // Add missing properties here
        id: string;
        email: string;
        contact_phone: string;
        email_verified: boolean;
    };
    token: string;
}

const AdminLogin = () => {
    const { register, handleSubmit } = useForm<LoginFormInputs>();
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        try {
            const userData = await login(data).unwrap() as AuthResponse;

            if (userData.user.role !== 'admin') {
                setError('You do not have the necessary permissions to access this page.');
                return;
            }

            // Assuming AuthState requires all these fields:
            const userState = {
                user: {
                    id: userData.user.id,
                    username: userData.user.username,
                    email: userData.user.email,
                    contact_phone: userData.user.contact_phone,
                    email_verified: userData.user.email_verified,
                    role: userData.user.role,
                },
                token: userData.token,
            };

            dispatch(setCredentials(userState));
            navigate('/admin'); // Redirect to admin dashboard after successful login
        } catch (err) {
            setError('Failed to log in.');
            console.error('Failed to log in: ', err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-900">
            <div className="w-full max-w-sm bg-slate-600 p-6 rounded-lg shadow-md">
                <h2 className="text-red-600 text-center text-2xl mb-6">Login</h2>
                {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="input input-bordered flex items-center gap-2 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input type="text" className="grow form-input w-full" placeholder="Username" {...register('username', { required: true })} required />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                            <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                        </svg>
                        <input type="password" className="grow form-input w-full" placeholder="Password" {...register('password', { required: true })} required />
                    </label>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200" disabled={isLoading}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
