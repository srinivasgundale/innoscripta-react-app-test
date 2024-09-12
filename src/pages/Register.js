import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService'; // Import the auth service

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await authService.register(data);
      if (response.success) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration failed', error);
      // Optionally show an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto p-4">
      <div>
        <label>Name</label>
        <input {...register('name', { required: true })} className="input input-bordered w-full" />
        {errors.name && <span>Name is required</span>}
      </div>
      <div>
        <label>Email</label>
        <input {...register('email', { required: true })} className="input input-bordered w-full" />
        {errors.email && <span>Email is required</span>}
      </div>
      <div>
        <label>Password</label>
        <input {...register('password', { required: true })} type="password" className="input input-bordered w-full" />
        {errors.password && <span>Password is required</span>}
      </div>
      <button type="submit" className="btn btn-primary mt-4">Register</button>
    </form>
  );
};

export default Register;
