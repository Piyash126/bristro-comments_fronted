import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../authentication/context/providers/AuthProvider";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const CommentItem = ({ comment, allComments, refetch }) => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const [replyText, setReplyText] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);

  // ✅ reply পোস্ট করা
  const handleReplySubmit = async () => {
    if (!user) {
      Swal.fire("You must login to reply");
      return;
    }
    if (!replyText.trim()) return;

    await axiosPublic.post("/comments", {
      menuId: comment.menuId,
      userEmail: user.email,
      comment: replyText,
      createdAt: new Date(),
      parentId: comment._id, // ✅ reply হলে parentId সেট হবে
    });

    setReplyText("");
    setShowReplyBox(false);
    refetch();
  };

  // ✅ reply বের করা
  const childReplies = allComments.filter((c) => c.parentId === comment._id);

  return (
    <div className="ml-4 mt-2">
      <div className="flex gap-3">
        <img
          src={`https://i.pravatar.cc/40?u=${comment.userEmail}`}
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
        <div className="bg-gray-100 px-3 py-2 rounded-lg max-w-md">
          <p className="text-sm font-semibold">{comment.userEmail}</p>
          <p>{comment.comment}</p>
          <p className="text-xs text-gray-500">
            {new Date(comment.createdAt).toLocaleString()}
          </p>

          <button
            onClick={() => setShowReplyBox(!showReplyBox)}
            className="text-blue-500 text-xs mt-1"
          >
            {showReplyBox ? "Cancel" : "Reply"}
          </button>

          {showReplyBox && (
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="flex-1 border rounded-full px-2 py-1 text-sm"
              />
              <button
                onClick={handleReplySubmit}
                className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Recursive reply rendering */}
      {childReplies.length > 0 && (
        <div className="ml-6">
          {childReplies.map((child) => (
            <CommentItem
              key={child._id}
              comment={child}
              allComments={allComments}
              refetch={refetch}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
