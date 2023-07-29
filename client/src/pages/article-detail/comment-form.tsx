import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Avatar } from "components/avatar";
import { TextField } from "components/form/text-field";
import { Comment } from "models";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { axios } from "utils/axios";
import { z } from "zod";

type CommentSchema = z.infer<typeof commentSchema>;
const commentSchema = z.object({
  articleId: z.string(),
  author: z.string().min(1),
  content: z.string().min(1),
});

const postComment = async (data: CommentSchema) =>
  axios.post<Comment>("/comments", data).then((res) => res.data);

export const CommentForm = ({ articleId }: { articleId: string }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(postComment, {
    onSuccess: () => {
      void queryClient.invalidateQueries(["article", articleId]);
    },
    onError: () => {
      toast("Error creating comment", { type: "error" });
    },
  });
  const { control, handleSubmit } = useForm({
    defaultValues: {
      articleId,
      author: "ciza99",
      content: "",
    },
    resolver: zodResolver(commentSchema),
  });

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit((data) => mutate(data))}
    >
      <Avatar />
      <div className="grow">
        <TextField
          className="w-full"
          control={control}
          showErrorMessage={false}
          name="content"
          placeholder="Join the discussion"
        />
      </div>
    </form>
  );
};
