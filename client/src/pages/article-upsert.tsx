import { Button } from "components/button";
import { ImageField } from "components/form/image-input";
import { TextArea } from "components/form/text-area";
import { TextField } from "components/form/text-field";
import { Form, FormProvider, useForm } from "react-hook-form";

export const ArticleUpsert = ({ articleId }: { articleId?: string }) => {
  const methods = useForm({
    defaultValues: {
      title: "",
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
            onClick={() => {
              // TODO
            }}
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
