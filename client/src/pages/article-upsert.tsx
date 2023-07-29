import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Form,
  FormProvider,
  useController,
  useForm,
  useFormContext,
} from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { Button } from "components/button";
import { ImageField } from "components/form/image-input";
import { TextField } from "components/form/text-field";
import { ArticleDetail, ImageInfo } from "models";
import { axios } from "utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "components/spinner";
import { getArticle } from "api/api";
import MDEditor from "@uiw/react-md-editor";
import { useImage } from "hooks/use-image";

type ArticleSchema = z.infer<typeof articleSchema>;
const articleSchema = z.object({
  title: z.string().min(4),
  perex: z.string().min(4).nullable(),
  content: z.string().min(4),
  image: z.any(),
});

export const ArticleUpsert = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { data: article } = useQuery({
    queryKey: ["articles", articleId],
    queryFn: () => getArticle(articleId),
    enabled: !!articleId,
  });

  const { image } = useImage(article?.imageId);

  if (!articleId) {
    return <ArticleUpsertForm />;
  }

  if (!article || !image) {
    return (
      <div className="grow flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return <ArticleUpsertForm article={article} image={image} />;
};

const uploadImage = async (image: File) => {
  const formData = new FormData();
  formData.append("image", image);

  return axios
    .post<ImageInfo[]>("/images", formData)
    .then((res) => res.data[0].imageId);
};

export const ArticleUpsertForm = ({
  article,
  image,
}: {
  article?: ArticleDetail;
  image?: Blob;
}) => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();

  const { mutate: upsertArticle } = useMutation(
    async (data: ArticleSchema) => {
      const isNewImage = data.image !== image;
      console.log({ isNewImage });

      const imageId = isNewImage
        ? await uploadImage(data.image)
        : article?.imageId;

      const body: ArticleDetail = {
        title: data.title,
        perex: data.title,
        content: data.content,
        imageId,
      };
      const request = articleId
        ? axios.patch<ArticleDetail>(`/articles/${articleId}`, body)
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
      title: article?.title ?? "",
      perex: article?.perex ?? "",
      content: article?.content ?? "",
      image: image ?? "",
    },
    resolver: zodResolver(articleSchema),
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
        <ContentEditor />
      </FormProvider>
    </Form>
  );
};

const ContentEditor = () => {
  const { control } = useFormContext<ArticleSchema>();
  const { field } = useController({ control, name: "content" });

  return (
    <div>
      <p className="mb-2">Content</p>
      <MDEditor value={field.value} onChange={field.onChange} />
    </div>
  );
};
