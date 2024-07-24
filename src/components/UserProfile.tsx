import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/usersAPI.reducer';
import { updateUserProfile } from '../apiservices/authSlice';
import { useGetUserDetailsQuery } from '../apiservices/users';

interface ProfileFormInputs {
    email: string;
    contact_phone: string;
    email_verified: boolean;
    address: string;
}

export interface User {
    id: string; // Ensure this is consistent
    username: string;
    email: string;
    contact_phone: string;
    email_verified: boolean;
    address: string;
    user_id: number; // Ensure this field exists
}

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const userId = user?.id || ''; // Ensure userId is always a string
    const { data: userDetails, error, isLoading } = useGetUserDetailsQuery(parseInt(userId) || 0);
    const { register, handleSubmit, setValue } = useForm<ProfileFormInputs>();

    useEffect(() => {
        if (userDetails) {
            setValue('email', userDetails.email);
            setValue('contact_phone', userDetails.contact_phone.toString());
            setValue('address', userDetails.address);
        }
    }, [userDetails, setValue]);

    const onSubmit: SubmitHandler<ProfileFormInputs> = (data) => {
        dispatch(updateUserProfile(data as Partial<User>));
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-600">
            <div className="relative bg-white shadow-md rounded-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-4">Profile</h2>
                {userDetails && (
                    <div className="mb-4 text-center">
                        <h3 className="text-lg font-medium">Full Name: {userDetails.full_name}</h3>
                    </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email:</label>
                        <input type="email" {...register('email', { required: true })} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Contact Phone:</label>
                        <input type="text" {...register('contact_phone', { required: true })} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Address:</label>
                        <input type="text" {...register('address', { required: true })} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                        Update Profile
                    </button>
                </form>
                {isLoading && <p className="mt-4 text-blue-500">Loading...</p>}
                {error && <p className="mt-4 text-red-500">Error fetching user details.</p>}
            </div>
        </div>
    );
};

export default Profile;
