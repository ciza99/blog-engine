import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Home, loader as homeLoader } from "./pages/home";
import { Layout } from "./pages/layout";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home />, loader: homeLoader(queryClient) },
    ],
  },
]);

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
