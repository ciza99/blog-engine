import { useMutation } from "@tanstack/react-query";
import { Button } from "components/button";
import { ImageField } from "components/form/image-input";
import { TextArea } from "components/form/text-area";
import { TextField } from "components/form/text-field";
import { ArticleDetail, ImageInfo } from "models";
import { Form, FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { axios } from "utils/axios";
import { z } from "zod";

type ArticleSchema = z.infer<typeof articleSchema>;
const articleSchema = z.object({
  title: z.string().min(4),
  content: z.string().min(4),
  image: z.any(),
});

export const ArticleUpsert = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const { mutate: upsertArticle } = useMutation(
    async (data: ArticleSchema) => {
      const formData = new FormData();
      formData.append("image", data.image);

      const imageInfo = await axios
        .post<ImageInfo>("/images", formData)
        .then((res) => res.data);
      console.log({ imageInfo });

      const body: ArticleDetail = {
        title: data.title,
        perex: data.title,
        content: data.content,
        imageId: imageInfo.imageId,
      };
      const request = articleId
        ? axios.patch<ArticleDetail>(`/articles${articleId}`, body)
        : axios.post<ArticleDetail>("/articles", body);
      return request.then((res) => res.data);
    },
    {
      onSuccess: () => {
        navigate("/articles");
      },
      onError: () => {
        toast("Failed to save article", { type: "error" });
      },
    }
  );

  const methods = useForm({
    defaultValues: {
      title: "",
      perex: "",
      content: "",
      image: "",
    },
  });

  return (
    <Form control={methods.control} className="pt-4 flex flex-col gap-4">
      <FormProvider {...methods}>
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-2xl">
            {articleId ? "Edit article" : "Create new article"}
          </h1>
          <Button
            type="submit"
            onClick={methods.handleSubmit((data) => upsertArticle(data))}
          >
            Publish article
          </Button>
        </div>
        <TextField
          label="Article Title"
          placeholder="My First Article"
          control={methods.control}
          name="title"
        />
        <ImageField
          label="Featured Image"
          placeholder="Upload an image"
          control={methods.control}
          name="image"
        />
        <TextField
          label="Perex"
          placeholder="My first article is about..."
          control={methods.control}
          className="w-full"
          name="perex"
        />
        <TextArea
          label="Content"
          placeholder="Supports markdown. Yay!"
          className="w-full"
          control={methods.control}
          name="content"
          rows={25}
        />
      </FormProvider>
    </Form>
  );
};
