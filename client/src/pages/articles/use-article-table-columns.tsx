import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "components/button";
import { textCell } from "components/table/cells";
import { Column } from "components/table/table";
import { USERNAME } from "constants";
import { Article } from "models";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { FaPen, FaTrash } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteArticleRequest } from "./api";

export const useArticleTableColumns = ({
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
