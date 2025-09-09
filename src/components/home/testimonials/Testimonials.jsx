import SectionTitle from "../../shared/sectionTitle/SectionTitle";
// Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules"; // ✅ Important

// Icons & Rating
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css"; // ✅ Required for Rating to display properly
import { useQuery } from "@tanstack/react-query";
import { FaColonSign } from "react-icons/fa6";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Testimonials = () => {
  //   const [reviews, setReviews] = useState([]);
  //   useEffect(() => {
  //     fetch("reviews.json")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setReviews(data);
  //       });
  //   }, []);

  const axiosPublic = useAxiosPublic();
  const {
    // refetch,
    data: reviews = [],
    // isPending: loading,
  } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const res = await axiosPublic.get("/reviews");
      return res.data;
    },
  });
  //   return [menu, loading, refetch];
  // };
  return (
    <div>
      <SectionTitle
        subHeading="What our client say"
        heading="Testimonials"
      ></SectionTitle>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="m-16 flex flex-col items-center gap-4 text-center">
              <div className="flex gap-1">
                <FaColonSign />
                <FaColonSign />
              </div>
              <Rating
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
              />
              <p className="text-gray-600">{review.details}</p>
              <h3 className="text-2xl text-orange-400 font-semibold">
                {review.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
