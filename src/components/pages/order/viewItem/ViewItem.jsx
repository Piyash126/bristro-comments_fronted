import { useLoaderData } from "react-router-dom";
import useAddToCart from "../../../hooks/useAddToCart";
import CommentSection from "../../menu/commentSection/CommentSection";

const ViewItem = () => {
  const item = useLoaderData();
  const addToCart = useAddToCart();
  return (
    <div className="mt-4 mb-4 flex gap-6">
      {/* Left side: image + comments */}
      <div>
        <img src={item.image} alt={item.name} className="w-96 h-auto" />
        <CommentSection menuId={item._id} />
      </div>

      {/* Right side: info + button */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
          <p className="text-xl mb-4">$ {item.price}</p>
        </div>
        <button
          onClick={() => addToCart(item)} // pass full item object
          className="btn btn-outline border-0 border-b-4 border-orange-500 w-40"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ViewItem;
