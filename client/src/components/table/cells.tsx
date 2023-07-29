export const textCell =
  <TRow extends {}>(key: keyof TRow) =>
  (row: TRow) => <span>{row[key]}</span>;
