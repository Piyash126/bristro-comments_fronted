import { Helmet } from "react-helmet-async";
import Banner from "../banner/Banner";
import Boss from "../boss/Boss";
import Category from "../category/Category";
import FeaturedItem from "../featured/FeaturedItem";
import PopularMenu from "../popularMenu/PopularMenu";
import Testimonials from "../testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro || Home</title>
      </Helmet>
      <Banner />
      <Category />
      <Boss />
      <PopularMenu />
      <FeaturedItem />
      <Testimonials />
    </div>
  );
};

export default Home;
