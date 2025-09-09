import { Helmet } from "react-helmet-async";
import menuImg from "../../../assets/menu/banner3.jpg";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";
import drniksImg from "../../../assets/menu/drinks-bg.jpg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import soupImg from "../../../assets/menu/soup-bg.jpg";
import useMenu from "../../hooks/useMenu";
import Cover from "../../shared/cover/Cover";
import SectionTitle from "../../shared/sectionTitle/SectionTitle";
import MenuCategory from "./menuCategory/MenuCategory";

const Menu = () => {
  const [menu] = useMenu();

  const dessert = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");
  const drinks = menu.filter((item) => item.category === "drinks");
  return (
    <div>
      <Helmet>
        <title>Bistro || Menu</title>
      </Helmet>
      <Cover img={menuImg} title="our menu"></Cover>
      <SectionTitle
        subHeading="Don't MIss"
        heading="today's Offer"
      ></SectionTitle>
      <MenuCategory
        items={offered}
        title="offered"
        Coverimg={dessertImg}
      ></MenuCategory>
      <MenuCategory
        items={dessert}
        title="dessert"
        Coverimg={dessertImg}
      ></MenuCategory>
      <MenuCategory
        items={pizza}
        title="pizza"
        Coverimg={pizzaImg}
      ></MenuCategory>
      <MenuCategory
        items={salad}
        title="salad"
        Coverimg={saladImg}
      ></MenuCategory>
      <MenuCategory items={soup} title="Soup" Coverimg={soupImg}></MenuCategory>
      <MenuCategory
        items={drinks}
        title="drinks"
        Coverimg={drniksImg}
      ></MenuCategory>
    </div>
  );
};

export default Menu;
