import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "context/auth-context";

import { Layout } from "./layout";
import { Home } from "./home/home";
import { Login } from "./login";
import { Articles } from "./articles";
import { ArticleUpsert } from "./article-upsert";

export const AppRoutes = () => {
  const { isLoggedIn } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/articles/:articleId" element={<Articles />} />
          {isLoggedIn ? (
            <>
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/new" element={<ArticleUpsert />} />
              <Route
                path="/articles/:articleId/edit"
                element={<ArticleUpsert />}
              />
            </>
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
