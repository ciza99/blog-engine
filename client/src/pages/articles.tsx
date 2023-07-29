import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getArticleList } from "api/api";
import { Button } from "components/button";
import { Pagination } from "components/pagination";
import { textCell } from "components/table/cells";
import { Column, Table } from "components/table/table";
import { USERNAME } from "constants";
import { usePagination } from "hooks/use-pagination";
import { Article } from "models";
import { useMemo } from "react";
import { FaPen, FaTrash } from "react-icons/fa6";
import { NavLink, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { paginationQuerySchema } from "schemas";
import { axios } from "utils/axios";

const deleteArticleRequest = (articleId: string) =>
  axios.delete(`/articles/${articleId}`);

const useColumns = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteArticle } = useMutation(
    (articleId: string) => deleteArticleRequest(articleId),
    {
      onSuccess: () => {
        void queryClient.invalidateQueries(["articles"]);
      },
      onError: () => {
        toast("Failed to delete article", { type: "error" });
      },
    }
  );

  return useMemo<Column<Article>[]>(
    () => [
      {
        key: "selection",
        label: () => <input type="checkbox" />,
        render: () => <input type="checkbox" />,
      },
      {
        key: "title",
        label: "Article title",
        render: textCell("title"),
      },
      {
        key: "perex",
        label: "Perex",
        render: textCell("perex"),
      },
      {
        key: "author",
        label: "Author",
        render: () => <span>{USERNAME}</span>,
      },
      {
        key: "#comments",
        label: "# of comments",
        render: () => <span>???</span>,
      },
      {
        key: "actions",
        label: "Actions",
        render: (article) => (
          <div className="flex gap-2 items-center">
            <NavLink to={`/articles/${article.articleId}/edit`}>
              <FaPen className="text-primary" />
            </NavLink>
            <Button
              variant="icon"
              onClick={() => deleteArticle(article.articleId!)}
            >
              <FaTrash className="text-red-500" />
            </Button>
          </div>
        ),
      },
    ],
    [deleteArticle]
  );
};

export const Articles = () => {
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

  const columns = useColumns();

  return (
    <div className="py-4">
      <Table
        title="My articles"
        ActionBar={
          <NavLink
            to="/articles/new"
            className="px-2 py-1 bg-primary rounded-lg text-white"
          >
            Create Article
          </NavLink>
        }
        data={articleList?.items ?? []}
        columns={columns}
      />
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
    </div>
  );
};
