import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Avatar } from "components/avatar";
import { formatDistance } from "date-fns";
import { Comment as CommentType } from "models";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { toast } from "react-toastify";
import { axios } from "utils/axios";

const postCommentVote = async ({
  id,
  vote,
}: {
  id: string;
  vote: "up" | "down";
}) => {
  return axios
    .post<CommentType>(`/comments/${id}/vote/${vote}`)
    .then((res) => res.data);
};

export const Comment = ({
  comment,
  articleId,
}: {
  comment: CommentType;
  articleId: string;
}) => {
  const queryClient = useQueryClient();
  const score = comment.score ?? 0;

  const { mutate: vote } = useMutation(postCommentVote, {
    onSuccess: () => {
      void queryClient.invalidateQueries(["articles", articleId]);
    },
    onError: () => {
      toast("Failed to vote", { type: "error" });
    },
  });

  return (
    <div className="flex gap-4">
      <Avatar />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold">{comment.author}</span>
          <span className="text-secondary">
            {formatDistance(new Date(comment.postedAt!), new Date())} ago
          </span>
        </div>
        <p>{comment.content}</p>
        <div className="flex items-center gap-2">
          <span>
            {score > 0 ? "+" : score < 0 ? "-" : ""}
            {score}
          </span>
          <div className="w-0.5 self-stretch bg-gray" />
          <FaChevronUp
            className="cursor-pointer"
            onClick={() => vote({ id: comment.commentId!, vote: "up" })}
          />
          <div className="w-0.5 self-stretch bg-gray" />
          <FaChevronDown
            className="cursor-pointer"
            onClick={() => vote({ id: comment.commentId!, vote: "down" })}
          />
        </div>
      </div>
    </div>
  );
};
