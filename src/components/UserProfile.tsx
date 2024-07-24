import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/usersAPI.reducer';
import { updateUserProfile } from '../apiservices/authSlice';
import { useGetUserDetailsQuery, useUploadProfileImageMutation } from '../apiservices/users';

interface ProfileFormInputs {
    email: string;
    contact_phone: number;
    email_verified: boolean;
    address: string;
    profile_image?: string; // Handle file input
}
export interface User {
    id: number;
    username: string;
    email: string;
    contact_phone: number;
    email_verified: boolean;
    address: string;
    user_id: number; // Ensure this field exists
    profile_image?: string;
}

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const userId = user?.id;
    const [uploadProfileImage] = useUploadProfileImageMutation();
    const { data: userDetails, error, isLoading } = useGetUserDetailsQuery(userId || 0);
    const { register, handleSubmit, setValue, watch } = useForm<ProfileFormInputs>();
    const profileImage = watch('profile_image'); // Watch for file changes

    useEffect(() => {
        if (userDetails) {
            setValue('email', userDetails.email);
            setValue('contact_phone', userDetails.contact_phone);
            setValue('address', userDetails.address);
            setValue('profile_image', userDetails.profile_image); // Set image URL
        }
    }, [userDetails, setValue]);

    const onSubmit: SubmitHandler<ProfileFormInputs> = async (data) => {
        if (data.profile_image && data.profile_image[0]) {
            const formData = new FormData();
            formData.append('image', data.profile_image[0]);

            const response = await uploadProfileImage(formData);
            if (response.data) {
                // Update user profile with new image URL
                dispatch(updateUserProfile({ profile_image: response.data.imageUrl } as Partial<User>));
                setValue('profile_image', response.data.imageUrl); // Update the form value
            }
        } else {
            dispatch(updateUserProfile(data as Partial<User>));
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-600">
            <div className="relative bg-white shadow-md rounded-lg p-6 max-w-md w-full">
                {userDetails && (
                    <div className="absolute top-0 right-0 mt-2 mr-2">
                        <img
                            src={userDetails.profile_image || 'https://i.pinimg.com/564x/83/77/f1/8377f17844da890929365781c4f761a2.jpg'}
                            alt="Profile"
                            className="w-24 h-24 rounded-full border-4 border-white"
                        />
                    </div>
                )}
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
                        <input type="number" {...register('contact_phone', { required: true })} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Address:</label>
                        <input type="text" {...register('address', { required: true })} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Profile Image:</label>
                        <input type="file" {...register('profile_image')} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
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
