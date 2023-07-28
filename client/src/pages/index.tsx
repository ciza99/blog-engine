import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "context/auth-context";

import { Layout } from "./layout";
import { Home } from "./home";
import { Login } from "./login";

export const AppRoutes = () => {
  const { isLoggedIn } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {isLoggedIn ? (
            <></>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
