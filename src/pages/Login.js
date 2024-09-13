import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService"; 
import toast from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await authService.login(data);
      if (response.success) {
        toast.success("Login Successful!");
        dispatch(loginSuccess({ user: response.user, token: response.token }));
        navigate("/articles");
      }
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-base-200">
      <div className="w-full max-w-xs">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
              type="email"
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
