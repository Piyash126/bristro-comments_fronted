import useMenu from "../../hooks/useMenu";
import MenuItem from "../../shared/menuItem/MenuItem";
import SectionTitle from "../../shared/sectionTitle/SectionTitle";

const PopularMenu = () => {
  const [menu] = useMenu();
  const popularItems = menu.filter((item) => item.category === "popular");
  return (
    <div className="mb-12">
      <SectionTitle
        subHeading="popular menu"
        heading="from our menu"
      ></SectionTitle>
      <div className="grid md:grid-cols-2 gap-4">
        {popularItems.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
    </div>
  );
};

export default PopularMenu;
