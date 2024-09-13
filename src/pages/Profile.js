import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form'; 
import { useSelector, useDispatch } from 'react-redux';
import { updateProfileAction } from '../store/actions/profileActions'; 
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth); 
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      bio: '',
    },
  });

  useEffect(() => {
    if (user) {
      setValue('name', user.name || '');
      setValue('email', user.email || '');
      setValue('bio', user.bio || '');
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(updateProfileAction(data));
      if (response.success) {
        toast.success('Profile updated successfully!');
      } else {
        toast.error('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An error occurred while updating the profile.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Your Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
              type="text"
              placeholder="Enter your name"
            />
            {errors.name && (
              <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>
            )}
          </div>

          {/* Email Field (Not editable) */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              {...register('email', { required: 'Email is required' })}
              className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
              type="email"
              disabled
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>
            )}
          </div>

          {/* Bio Field */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Bio</label>
            <textarea
              {...register('bio')}
              className="textarea textarea-bordered w-full"
              placeholder="Tell us something about yourself"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button type="submit" className="btn btn-primary w-full">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
