import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { Spinner } from "components/spinner";
import { getArticleList } from "api/api";
import { Article } from "./article";
import { Pagination } from "components/pagination";
import { usePagination } from "hooks/use-pagination";
import { paginationQuerySchema } from "schemas";

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { offset = 0, limit = 5 } = useMemo(
    () =>
      paginationQuerySchema.parse(Object.fromEntries(searchParams.entries())),
    [searchParams]
  );

  const { data: articleList } = useQuery({
    queryKey: ["articles", offset, limit],
    queryFn: () => getArticleList(offset, limit),
  });

  const { page, totalPages } = usePagination({
    offset,
    limit,
    total: articleList?.pagination?.total ?? 0,
  });

  if (!articleList) {
    return (
      <div className="grow flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="pt-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-2">Recent articles</h1>
      {articleList.items?.length === 0 && "No more articles"}
      {articleList.items?.map((article) => (
        <Article key={article.articleId} article={article} />
      ))}
      <div className="flex justify-center">
        <Pagination
          page={page}
          totalPages={totalPages}
          onClick={(page) => {
            const offset = (page - 1) * limit;
            setSearchParams({ offset: offset.toString() });
          }}
        />
      </div>
    </section>
  );
};
