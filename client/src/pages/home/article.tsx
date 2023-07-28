import { FaCircle } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

import { ArticleDetail } from "models";
import { format } from "date-fns";
import { useImage } from "hooks/use-image";

export const Article = ({ article }: { article: ArticleDetail }) => {
  const src = useImage(article.imageId);

  return (
    <div className="flex gap-4">
      <img
        className="h-44 w-44 object-cover rounded-lg"
        src={src}
        alt="article main"
      />
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-lg">{article.title}</h2>
        <div className="flex items-center gap-2 text-secondary">
          <span>user</span> <FaCircle className="h-1 w-1" />{" "}
          <span>{format(new Date(article.createdAt!), "MM/dd/yy")}</span>
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
