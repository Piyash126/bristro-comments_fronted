import { Link } from "react-router-dom";
import Cover from "../../../shared/cover/Cover";
import MenuItem from "../../../shared/menuItem/MenuItem";

const MenuCategory = ({ items, Coverimg, title }) => {
  return (
    <div className="pt-8">
      {title && Coverimg && <Cover img={Coverimg} title={title}></Cover>}
      <div className="grid md:grid-cols-2 gap-4 mt-10">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <Link to={`/order/${title}`}>
        <button className="btn btn-outline border-0 border-b-4 mt-4">
          Order Now
        </button>
      </Link>
    </div>
  );
};

export default MenuCategory;
