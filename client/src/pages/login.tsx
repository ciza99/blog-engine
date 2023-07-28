import { Form, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "components/form/text-field";

type LoginSchema = z.infer<typeof loginSchema>;
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const Login = () => {
  const { control } = useForm({
    defaultValues: {
      email: "",
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
          name="email"
          control={control}
          label="Email"
          type="email"
          placeholder="me@example.com"
        />
        <TextField
          name="password"
          control={control}
          label="Password"
          type="password"
          placeholder="********"
        />
        <Button className="self-end" type="submit">
          Log In
        </Button>
      </Form>
    </div>
  );
};
