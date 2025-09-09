// import axios from "axios";

import { MdPreview } from "react-icons/md";
import { Link } from "react-router-dom";
import useAddToCart from "../../hooks/useAddToCart";

const FoodCard = ({ item }) => {
  const { image, price, _id } = item;

  const addToCart = useAddToCart();

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <p className="absolute bg-slate-900 text-white right-3 top-3 p-4 rounded-md">
        $ {price}
      </p>
      <div className="card-actions flex justify-between items-center mt-4">
        {/* Comment Section */}
        <td>
          <Link to={`/viewItem/${_id}`}>
            <div className="flex gap-2">
              <h4>View details</h4>
              <button className="btn btn-md bg-orange-500">
                <MdPreview />
              </button>
            </div>
          </Link>
        </td>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(item)}
          className="btn btn-outline border-0 border-b-4 border-orange-500"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
