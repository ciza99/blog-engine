import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Avatar } from "components/avatar";
import { TextField } from "components/form/text-field";
import { Comment } from "models";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { axios } from "utils/axios";
import { z } from "zod";

const commentSchema = z.object({
  articleId: z.string(),
  author: z.string().min(1),
  content: z.string().min(1),
});

export const CommentForm = ({ articleId }: { articleId: string }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (data: Comment) => axios.post("/comments", data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["article", articleId]);
      },
      onError: () => {
        toast("Error creating comment", { type: "error" });
      },
    }
  );
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
      <TextField
        control={control}
        name="content"
        placeholder="Join the discussion"
      />
    </form>
  );
};
