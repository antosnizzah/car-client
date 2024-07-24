// components/LoginForm.tsx
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLoginMutation } from '../apiservices/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../apiservices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import NavigationButtons from './backbutton';
import { Loader2 } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const LoginForm = () => {
  const { register, handleSubmit, setError } = useForm<LoginFormInputs>();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const userData = await login(data).unwrap() as AuthResponse;

      if (userData.user.role !== 'user') {
        setError('username', { type: 'manual', message: 'You do not have the necessary permissions to access this page.' });
        toast.error('You do not have the necessary permissions to access this page.');
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
      toast.success('Login successful!');
      navigate('/user-dashboard'); // Redirect to user dashboard after successful login
    } catch (err) {
      setError('username', { type: 'manual', message: 'Failed to log in.' });
      toast.error('Failed to log in.');
      console.error('Failed to log in: ', err);
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <NavigationButtons />
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-white mb-6">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 text-gray-400">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="form-input w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-2"
                placeholder="Username"
                {...register('username', { required: 'Username is required' })}
              />
            </label>
            <label className="flex items-center gap-2 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-5 w-5 text-gray-400">
                <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
              </svg>
              <input
                type="password"
                className="form-input w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-2"
                placeholder="Password"
                {...register('password', { required: 'Password is required' })}
              />
            </label>
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-gray-300">
                <input type="checkbox" className="mr-2" />
                Remember Me
              </label>
              <Link to="/forgot-password" className="text-blue-400 hover:underline text-sm">Forgot Password?</Link>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-5 w-5 text-white animate-spin" /> : 'Login'}
            </button>
          </form>
          <p className="text-gray-300 text-center mt-4">
            Don't have an account? <Link to="/register" className="text-blue-400 hover:underline">Register</Link>
          </p>
          <p className="text-gray-300 text-center mt-2">
            Login as admin? <Link to="/admin-login" className="text-blue-400 hover:underline">Admin login</Link>
          </p>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default LoginForm;
