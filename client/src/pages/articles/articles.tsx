import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getArticleList } from "api/api";
import { Button } from "components/button";
import { Pagination } from "components/pagination";
import { Table } from "components/table/table";
import { usePagination } from "hooks/use-pagination";
import { usePopover } from "hooks/use-popover";
import { useMemo, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { NavLink, useSearchParams } from "react-router-dom";
import { paginationQuerySchema } from "schemas";
import { useArticleTableColumns } from "./use-article-table-columns";
import { deleteArticleRequest } from "./api";

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

  const columns = useArticleTableColumns({
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
