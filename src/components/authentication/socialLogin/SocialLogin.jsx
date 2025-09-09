import { useContext } from "react";
import { FaGoogle } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../context/providers/AuthProvider";

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const hadlaeGoogleSignIn = () => {
    googleSignIn().then((res) => {
      console.log(res.user);
      const userInfo = {
        email: res.user.email,
        name: res.user.displayName,
      };

      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        navigate("/");
      });
    });
  };
  return (
    <div className="p-8">
      <div className="divider"></div>
      <div>
        <button className="btn" onClick={hadlaeGoogleSignIn}>
          <FaGoogle className="mr-4"></FaGoogle>
          Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
