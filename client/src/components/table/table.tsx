export type Column<TRow> = {
  key: string;
  label: string | (() => JSX.Element);
  render: (row: TRow) => JSX.Element;
};

export const Table = <TRow,>({
  ActionBar,
  title,
  data,
  columns,
}: {
  ActionBar?: JSX.Element;
  title?: string;
  data: TRow[];
  columns: Column<TRow>[];
}) => {
  return (
    <div className="p-4">
      <div className="flex items-center gap-4">
        {title && <span className="font-bold text-2xl">{title}</span>}
        {ActionBar}
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                align="left"
                className="p-2 border-b-2 border-secondary font-bold"
                key={column.key}
              >
                {column.label instanceof Function
                  ? column.label()
                  : column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr className="w-full p-2">
              <td colSpan={columns.length} className="p-2 text-center">
                No data ...
              </td>
            </tr>
          )}
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td
                  className="p-2 border-b border-gray first:border-none"
                  key={column.key}
                >
                  {column.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
