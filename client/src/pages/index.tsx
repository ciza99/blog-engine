import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "context/auth-context";

import { Layout } from "./layout";
import { Home } from "./home/home";
import { Login } from "./login";
import { Articles } from "./articles/articles";
import { ArticleUpsert } from "./article-upsert";
import { ArticleDetail } from "./article-detail/article-detail";
import { About } from "./about";

export const AppRoutes = () => {
  const { isLoggedIn } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/articles/:articleId" element={<ArticleDetail />} />
          {isLoggedIn ? (
            <>
              <Route path="/articles" element={<Articles />} />
              <Route
                path="/articles/new"
                element={<ArticleUpsert key="new" />}
              />
              <Route
                path="/articles/:articleId/edit"
                element={<ArticleUpsert key="edit" />}
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
