import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getArticleList } from "api/api";
import { Button } from "components/button";
import { Pagination } from "components/pagination";
import { textCell } from "components/table/cells";
import { Column, Table } from "components/table/table";
import { USERNAME } from "constants";
import { usePagination } from "hooks/use-pagination";
import { usePopover } from "hooks/use-popover";
import { Article } from "models";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { FaPen, FaTrash } from "react-icons/fa6";
import { NavLink, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { paginationQuerySchema } from "schemas";
import { axios } from "utils/axios";

const deleteArticleRequest = (articleId: string) =>
  axios.delete(`/articles/${articleId}`);

const useColumns = ({
  checkedRows,
  setCheckedRows,
  rows,
}: {
  checkedRows: Set<number>;
  setCheckedRows: Dispatch<SetStateAction<Set<number>>>;
  rows: Article[];
}) => {
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

  const handleCheckAll = useCallback(() => {
    setCheckedRows((prev) => {
      if (prev.size === rows.length) {
        return new Set();
      }

      return new Set(rows.map((_, i) => i));
    });
  }, [setCheckedRows, rows]);

  const handleCheckChange = useCallback(
    (rowIndex: number) => (e: ChangeEvent<HTMLInputElement>) => {
      setCheckedRows((prev) => {
        const newSet = new Set(prev);
        const action = e.target.checked
          ? (value: number) => newSet.add(value)
          : (value: number) => newSet.delete(value);

        action(rowIndex);
        return newSet;
      });
    },
    [setCheckedRows]
  );

  return useMemo<Column<Article>[]>(
    () => [
      {
        key: "selection",
        label: () => (
          <input
            type="checkbox"
            onChange={handleCheckAll}
            checked={checkedRows.size === rows.length && rows.length !== 0}
          />
        ),
        render: (_, rowIndex) => (
          <input
            type="checkbox"
            onChange={handleCheckChange(rowIndex)}
            checked={checkedRows.has(rowIndex)}
          />
        ),
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
    [deleteArticle, handleCheckChange, handleCheckAll, checkedRows, rows.length]
  );
};

export const Articles = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const { offset = 0, limit = 5 } = useMemo(
    () =>
      paginationQuerySchema.parse(Object.fromEntries(searchParams.entries())),
    [searchParams]
  );

  const [checkedRows, setCheckedRows] = useState(new Set<number>());

  const { mutate: deleteRows } = useMutation(
    (rows: Set<number>) => {
      const articleIds = Array.from(rows).reduce<string[]>((acc, rowIndex) => {
        const articleId = articleList?.items?.[rowIndex]?.articleId;
        if (articleId) {
          acc.push(articleId);
        }
        return acc;
      }, []);
      return Promise.all(
        articleIds.map((articleId) => deleteArticleRequest(articleId))
      );
    },
    {
      onSettled: () => {
        void queryClient.invalidateQueries(["articles", offset, limit]);
      },
    }
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

  const columns = useColumns({
    checkedRows,
    setCheckedRows,
    rows: articleList?.items ?? [],
  });

  const { refs, floatingStyles, getReferenceProps, getFloatingProps } =
    usePopover({
      open: checkedRows.size > 0,
      onOpenChange: () => {},
      placement: "bottom-start",
    });

  return (
    <div className="py-4">
      <div ref={refs.setReference} {...getReferenceProps} className="w-full" />
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

      {checkedRows.size > 0 && (
        <div
          style={floatingStyles}
          ref={refs.setFloating}
          className="flex items-center gap-4 bg-white z-10 p-2 shadow-lg border border-light rounded-lg"
          {...getFloatingProps()}
        >
          <span>{checkedRows.size} selected</span>
          <div className="self-stretch w-0.5 bg-gray" />
          <Button
            variant="clear"
            className="hover:bg-light transition-colors"
            startNode={<FaTrash className="text-red-500" />}
            onClick={() => {
              deleteRows(checkedRows);
              setCheckedRows(new Set());
            }}
          >
            Delete
          </Button>
        </div>
      )}

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
