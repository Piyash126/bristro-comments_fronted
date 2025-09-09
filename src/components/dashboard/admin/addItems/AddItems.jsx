import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../shared/sectionTitle/SectionTitle";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddItems = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axisoSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    console.log(data);
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // now send the menu item data to the server with the image
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };

      // data send to the database
      const menuRes = await axisoSecure.post("/menu", menuItem);
      console.log(menuRes.data);
      if (menuRes.data.insertedId) {
        // show success popup
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} added successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    console.log(res.data);
  };
  return (
    <div>
      <SectionTitle heading="Add an item" subHeading="Whats new"></SectionTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Recipe Name</span>
          </label>

          <input
            type="text"
            placeholder="Type here"
            {...register("name", { required: true })}
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex gap-5">
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Category Name</span>
            </label>
            <select
              {...register("category", { required: true })}
              className="select select-bordered w-full"
              defaultValue="default"
            >
              <option disabled value="default">
                Select a Category
              </option>
              <option value="salad">Salad</option>
              <option value="pizza">Pizza</option>
              <option value="soup">Soup</option>
              <option value="dessert">Dessert</option>
              <option value="drinks">Drinks</option>
            </select>
          </div>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Price</span>
            </label>

            <input
              type="text"
              placeholder="Type here"
              {...register("price", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
        </div>
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Recipe Details</span>
          </label>

          <textarea
            {...register("recipe")}
            className="textarea textarea-bordered h-24 w-full"
            placeholder="Bio"
          ></textarea>
        </div>
        <div>
          <input
            type="file"
            className="file-input w-full max-w-xs"
            {...register("image", { required: true })}
          />
        </div>

        <button className="btn mt-3">
          Add Items <FaUtensils></FaUtensils>
        </button>
      </form>
    </div>
  );
};

export default AddItems;
