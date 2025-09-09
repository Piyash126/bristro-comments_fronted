import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaComment } from "react-icons/fa";
import Swal from "sweetalert2";

import { AuthContext } from "../../../authentication/context/providers/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import CommentItem from "./commentItem/CommentItem";

const CommentSection = ({ menuId }) => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  // সব কমেন্ট লোড
  const {
    data: comments = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["comments", menuId],
    queryFn: async () => {
      const res = await axiosPublic.get(`/comments/${menuId}`);
      return res.data;
    },
    enabled: !!menuId,
  });

  // নতুন মূল কমেন্ট পোস্ট
  const onSubmit = async (data) => {
    if (!user) {
      Swal.fire("You must login to comment");
      return;
    }

    const commentItem = {
      menuId,
      userEmail: user?.email,
      comment: data.comment,
      createdAt: new Date(),
      parentId: null, // ✅ মূল কমেন্ট
    };

    const commentRes = await axiosPublic.post("/comments", commentItem);
    if (commentRes.data.insertedId) {
      reset();
      refetch();
      Swal.fire({
        icon: "success",
        title: "Your comment is added successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  if (isLoading) return <p>Loading comments...</p>;

  // শুধু parentId null = মূল কমেন্ট
  const rootComments = comments.filter((c) => !c.parentId);

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3">Comments</h2>

        <div className="space-y-4">
          {rootComments.length > 0 ? (
            rootComments.map((c) => (
              <CommentItem
                key={c._id}
                comment={c}
                allComments={comments}
                refetch={refetch}
              />
            ))
          ) : (
            <p className="text-gray-500">No comments yet. Be the first!</p>
          )}
        </div>
      </div>

      {/* নতুন কমেন্ট ইনপুট */}
      <h2 className="text-lg font-semibold mb-2">Please give your opinion</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-2">
          <img
            src={user?.photoURL || "/profile.jpg"}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <input
            type="text"
            placeholder="Write a comment..."
            {...register("comment", { required: true })}
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
          >
            <FaComment className="inline mr-1" /> Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentSection;
