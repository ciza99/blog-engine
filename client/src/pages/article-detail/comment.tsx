import { Avatar } from "components/avatar";
import { format } from "date-fns";
import { Comment as CommentType } from "models";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

export const Comment = ({ comment }: { comment: CommentType }) => {
  const score = comment.score ?? 0;

  return (
    <div className="flex gap-2">
      <Avatar />
      <div>
        <div className="flex items-center gap-2">
          <span className="font-bold">{comment.author}</span>
          <span className="text-secondary">
            {format(new Date(comment.postedAt!), "MM/dd/yy")}
          </span>
        </div>
        <p>{comment.content}</p>
        <div className="flex items-center gap-2">
          <span>
            {score > 0 ? "+" : score < 0 ? "-" : ""}
            {score}
          </span>
          <FaArrowUp className="cursor-pointer" />
          <FaArrowDown className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
