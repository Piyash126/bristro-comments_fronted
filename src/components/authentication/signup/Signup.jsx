import Lottie from "lottie-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import loginLottieData from "../../../assets/login/login.json";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../context/providers/AuthProvider";
import SocialLogin from "../socialLogin/SocialLogin";

const Signup = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.email, data.photoURL)
        .then(() => {
          console.log("User Profile Updated");
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user added to the database");
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User Created SUccessfully!!",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        })
        .catch((error) => console.log(error));
    });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content lg:flex w-full px-5 gap-10">
        {/* Left Side (Text) */}
        <div className="text-center lg:text-left flex-1 text-cenetr">
          <Lottie animationData={loginLottieData} className="w-4/5"></Lottie>
        </div>

        {/* Right Side (Form) */}
        <div className="card flex-1 w-full shadow-2xl bg-base-100 ">
          {/* <div className="card w-full shadow-2xl bg-base-100 flex-1"> */}

          <form
            className="card-body flex flex-col items-start w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-control w-4/5">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                name="name"
                placeholder="Name"
                className="input input-bordered w-full"
              />
              {errors.name?.type === "required" && (
                <span className="text-red-600">Name is required</span>
              )}
            </div>

            <div className="form-control w-4/5">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                {...register("photoURL", { required: true })}
                name="photoURL"
                placeholder="Photo URL"
                className="input input-bordered w-full"
              />
              {errors.photoURL?.type === "required" && (
                <span className="text-red-600">photoURL is required</span>
              )}
            </div>

            <div className="form-control w-4/5">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                name="email"
                placeholder="Email"
                className="input input-bordered w-full"
              />
              {errors.email?.type === "required" && (
                <span className="text-red-600">Email is required</span>
              )}
            </div>

            <div className="form-control w-4/5">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern:
                    /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}/,
                })}
                name="password"
                placeholder="Password"
                className="input input-bordered w-full"
              />
              {errors.password?.type === "required" && (
                <span className="text-red-600">Password is required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-600">
                  Password must be at least 6 characters
                </span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="text-red-600">
                  Password must not exceed 20 characters
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-600">
                  Password must include one uppercase letter, one lowercase
                  letter, and one special character
                </span>
              )}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            <div className="form-control mt-6 w-4/5">
              <input
                type="submit"
                value="SignUp"
                className="btn btn-primary w-full"
              />
            </div>
          </form>

          <p>
            <small>
              ALready have an account?<Link to="/login">Login</Link>
            </small>
          </p>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Signup;
