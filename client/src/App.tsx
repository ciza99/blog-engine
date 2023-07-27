import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/home";
import { Layout } from "./pages/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/", element: <Home /> }],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
