export const textCell = <TRow extends object>(key: keyof TRow) =>
  function renderFunction(row: TRow) {
    return <span>{row[key]}</span>;
  };
