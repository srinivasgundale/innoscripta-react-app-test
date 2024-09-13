import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService"; // Import the auth service
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
      // Optionally show an error message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto p-4">
      <div>
        <label>Email</label>
        <input
          {...register("email", { required: true })}
          className="input input-bordered w-full"
        />
        {errors.email && <span>Email is required</span>}
      </div>
      <div>
        <label>Password</label>
        <input
          {...register("password", { required: true })}
          type="password"
          className="input input-bordered w-full"
        />
        {errors.password && <span>Password is required</span>}
      </div>
      <button type="submit" className="btn btn-primary mt-4">
        Login
      </button>
    </form>
  );
};

export default Login;
