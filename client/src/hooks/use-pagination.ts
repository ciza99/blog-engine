import { useMemo } from "react";

export const usePagination = ({
  offset,
  limit,
  total,
}: {
  offset: number;
  limit: number;
  total: number;
}) => {
  const page = useMemo(() => Math.ceil(offset / limit) + 1, [offset, limit]);
  const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit]);

  return { page, totalPages };
};
