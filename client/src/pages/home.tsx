import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router-dom";

import { Spinner } from "components/spinner";
import { getArticleList } from "api/api";
import { ArticleDetail } from "models";
import { BASE_URL } from "constants";
import { FaCircle } from "react-icons/fa6";

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

const Article = ({ article }: { article: ArticleDetail }) => {
  return (
    <div className="flex gap-2">
      <img
        className="h-32 object-contain rounded-lg"
        src={`${BASE_URL}/images/${article.imageId}`}
        alt="article main"
      />
      <div className="flex flex-col ">
        <h2 className="font-bold text-lg">{article.title}</h2>
        <div className="flex items-center gap-2 text-secondary">
          <span>user</span> <FaCircle className="h-1 w-1" />{" "}
          <span>{article.createdAt as unknown as string}</span>
        </div>
        <p>{article.perex}</p>
        <div className="mt-auto">
          <NavLink
            to={`/article/${article.articleId}`}
            className="text-primary"
          >
            Read whole article
          </NavLink>
        </div>
      </div>
    </div>
  );
};
