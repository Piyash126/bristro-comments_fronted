import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../authentication/context/providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import useCart from "./useCart";

const useAddToCart = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const [, refetchCart] = useCart();

  const addToCart = async (item) => {
    if (!user?.email) {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please login to add items to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
      return;
    }

    const cartItem = {
      menuId: item._id,
      email: user.email,
      name: item.name,
      image: item.image,
      price: item.price,
    };

    try {
      const res = await axiosSecure.post("/carts", cartItem);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${item.name} added to the cart`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetchCart(); // cart update
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add item to cart", "error");
    }
  };

  return addToCart;
};

export default useAddToCart;
