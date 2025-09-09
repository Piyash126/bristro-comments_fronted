import Lottie from "lottie-react";
import { useContext, useEffect, useState } from "react";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";

import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import loginLottieData from "../../../assets/login/login.json";
import { AuthContext } from "../context/providers/AuthProvider";
import SocialLogin from "../socialLogin/SocialLogin";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  console.log("state in the location login page", location.state);
  //   const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    loadCaptchaEnginge(6);
  });

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password).then((result) => {
      const user = result.user;
      console.log(user);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User Logged In Successfully!!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    });
  };

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
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
            className="card-body flex flex-col items-center"
            onSubmit={handleLogin}
          >
            <div className="form-control w-4/5">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control w-4/5">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control w-4/5">
              <label className="label">
                <LoadCanvasTemplate />
              </label>
              <input
                onBlur={handleValidateCaptcha}
                type="text"
                // ref={captchaRef}
                placeholder="type captcha avobe"
                name="captcha"
                className="input input-bordered w-full"
                required
              />
              {/* <button
                onClick={handleValidateCaptcha}
                className="btn btn-outline btn-xs w-full mt-2"
              >
                Validate Captcha
              </button> */}
            </div>

            <div className="form-control mt-6 w-4/5">
              <button className="btn btn-primary w-full" disabled={disabled}>
                Login
              </button>
            </div>
          </form>
          <p>
            <small>
              New Here? <Link to="/signup">Create an Account</Link>
            </small>
          </p>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;
