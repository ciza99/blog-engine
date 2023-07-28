import { Form, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { Button } from "components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "components/form/text-field";
import { axios } from "utils/axios";
import { toast } from "react-toastify";
import { tokenHandler } from "utils/token-handler";

type LoginSchema = z.infer<typeof loginSchema>;
const loginSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(4),
});

const postSession = async (data: LoginSchema) => {
  return axios
    .post<{ access_token: string }>("/login", data)
    .then((res) => res.data);
};

export const Login = () => {
  const { mutate: login } = useMutation(postSession, {
    onSuccess: (sessionInfo) => {
      console.log({ sessionInfo });
      if (!sessionInfo.access_token) {
        return;
      }

      tokenHandler.setToken(sessionInfo.access_token);
    },
    onError: () => {
      toast("Failed to login", { type: "error" });
    },
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="grow flex items-center justify-center">
      <Form
        className="flex flex-col gap-4 p-6 shadow-lg rounded-lg"
        control={control}
      >
        <h1 className="text-2xl font-bold">Log In</h1>
        <TextField
          name="username"
          control={control}
          label="Username"
          placeholder="johndoe123"
        />
        <TextField
          name="password"
          control={control}
          label="Password"
          type="password"
          placeholder="********"
        />
        <Button
          className="self-end"
          type="submit"
          onClick={handleSubmit((data) => login(data))}
        >
          Log In
        </Button>
      </Form>
    </div>
  );
};
