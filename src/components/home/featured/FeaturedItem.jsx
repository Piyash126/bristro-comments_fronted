import featuredImg from "../../../assets/home/featured.jpg";
import SectionTitle from "../../shared/sectionTitle/SectionTitle";
import "./Featured.css";

const FeaturedItem = () => {
  return (
    <div>
      <div className="featured-item text-white pt-8 my-10 bg-fixed">
        <SectionTitle
          subHeading="Check it out"
          heading="featured item"
        ></SectionTitle>
        <div className="flex justify-center items-center bg-slate-500 bg-opacity-60 px-12 py-8">
          <div className="flex-1">
            <img src={featuredImg} alt="featuredImg" />
          </div>
          <div className="flex-1 md:ml-10">
            <p>Aug 20, 2029</p>
            <p className="uppercase">Where can i get some?</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              distinctio perspiciatis reiciendis a perferendis amet doloribus
              laborum voluptas adipisci deserunt!
            </p>
            <button className="btn btn-outline border-0 border-b-4 mt-4">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedItem;
