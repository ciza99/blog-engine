import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { Spinner } from "components/spinner";
import { getArticleList } from "api/api";
import { Article } from "./article";

export const Home = () => {
  const { page: pageQuery } = useParams<{ page: string }>();
  const pageNumber = parseInt(pageQuery ?? "1");
  const page = isNaN(pageNumber) ? 1 : pageNumber;

  const { data: articleList } = useQuery({
    queryKey: ["articles", page],
    queryFn: () => getArticleList(page),
  });

  if (!articleList) {
    return (
      <div className="grow flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <main className="pt-4">
      <h1 className="text-2xl font-bold mb-4">Recent articles</h1>
      {articleList.items?.length === 0 && "No more articles"}
      {articleList.items?.map((article) => (
        <Article key={article.articleId} article={article} />
      ))}
    </main>
  );
};
