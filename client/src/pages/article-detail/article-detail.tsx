import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getArticle, getArticleList } from "api/api";
import { Spinner } from "components/spinner";
import { useImage } from "hooks/use-image";
import { FaCircle } from "react-icons/fa6";
import { format } from "date-fns";
import { useMemo } from "react";
import MDEditor from "@uiw/react-md-editor";
import { CommentForm } from "./comment-form";
import { Comment } from "./comment";
import { USERNAME } from "constants";

export const ArticleDetail = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { data: article } = useQuery({
    queryKey: ["articles", articleId],
    queryFn: () => getArticle(articleId),
  });

  const { data: articleList } = useQuery({
    queryKey: ["articles", 1],
    queryFn: () => getArticleList(1),
  });

  const relatedArticles = useMemo(
    () =>
      articleList?.items?.filter((article) => article.articleId !== articleId),
    [articleList, articleId]
  );

  const { src } = useImage(article?.imageId);

  if (!article) {
    return (
      <div className="grow flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row py-4">
      <div className="flex-[2] flex flex-col gap-2">
        <section className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl">{article.title}</h1>
          <div className="flex items-center gap-2 text-secondary">
            <span>{USERNAME}</span> <FaCircle className="h-1 w-1" />{" "}
            <span>{format(new Date(article.createdAt!), "MM/dd/yy")}</span>
          </div>
          <img src={src} className="w-full rounded-lg" alt="article header" />
          <MDEditor.Markdown source={article.content!} />
        </section>
        <section>
          <h2 className="font-bold text-lg mb-4">
            Comments ({article.comments?.length ?? 0})
          </h2>
          <CommentForm articleId={article.articleId!} />
          {article.comments?.map((comment) => (
            <Comment key={comment.commentId} comment={comment} />
          ))}
        </section>
      </div>
      <aside className="flex-1 sticky md:self-start top-16 border-t border-gray pt-4 mt-4 md:border-l md:border-t-0 md:pl-4 md:ml-4 md:pt-0 md:mt-0">
        <h2 className="font-bold text-lg mb-4">Related articles</h2>
        {!articleList && (
          <div className="flex w-full justify-center">
            <Spinner />
          </div>
        )}
        {relatedArticles?.map((article) => (
          <div key={article.articleId}>
            <h3 className="font-bold">{article.title}</h3>
            <p>{article.perex}</p>
          </div>
        ))}
      </aside>
    </div>
  );
};
