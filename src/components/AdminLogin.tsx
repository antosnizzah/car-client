import { useForm, SubmitHandler } from 'react-hook-form';
import { useLoginMutation } from '../apiservices/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../apiservices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import NavigationButtons from './backbutton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User, Lock, Loader2 } from 'lucide-react';

interface LoginFormInputs {
    username: string;
    password: string;
}

interface AuthResponse {
    user: {
        username: string;
        role: string;
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
                toast.error('You do not have the necessary permissions to access this page.');
                return;
            }

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
            toast.success('Login successful!');
            navigate('/admin');
        } catch (err) {
            setError('Failed to log in.');
            toast.error('Failed to log in.');
            console.error('Failed to log in: ', err);
        }
    };

    return (
        <>
            <Header />
            <div className="flex items-center justify-center min-h-screen bg-slate-900">
                <NavigationButtons/>
                <div className="w-full max-w-sm bg-slate-600 p-6 rounded-lg shadow-md">
                    <h2 className="text-red-600 text-center text-2xl mb-6">Login</h2>
                    {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className="flex items-center gap-2 mb-4 p-2 border border-slate-400 rounded-lg">
                            <User className="text-slate-400" />
                            <input type="text" className="grow form-input w-full bg-slate-700 text-white placeholder-gray-400 border-none rounded-lg p-2" placeholder="Username" {...register('username', { required: true })} required />
                        </label>
                        <label className="flex items-center gap-2 mb-4 p-2 border border-slate-400 rounded-lg">
                            <Lock className="text-slate-400" />
                            <input type="password" className="grow form-input w-full bg-slate-700 text-white placeholder-gray-400 border-none rounded-lg p-2" placeholder="Password" {...register('password', { required: true })} required />
                        </label>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center justify-center">
                            {isLoading ? <Loader2 className="animate-spin h-5 w-5 text-white" /> : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </>
    );
};

export default AdminLogin;
