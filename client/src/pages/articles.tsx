import { Button } from "components/button";
import { Column, Table } from "components/table";
import { Article } from "models";
import { FaPen, FaTrash } from "react-icons/fa6";

const textCell =
  <TRow extends {}>(key: keyof TRow) =>
  (row: TRow) => <span>{row[key]}</span>;

const columns: Column<Article>[] = [
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
    render: () => <span>???</span>,
  },
  {
    key: "#comments",
    label: "# of comments",
    render: () => <span>???</span>,
  },
  {
    key: "actions",
    label: "Actions",
    render: () => (
      <div className="flex gap-2 items-center">
        <Button>
          <FaPen />
        </Button>
        <Button>
          <FaTrash />
        </Button>
      </div>
    ),
  },
];

export const Articles = () => {
  return (
    <Table
      title="My articles"
      ActionBar={<Button>Create Article</Button>}
      data={[]}
      columns={columns}
    />
  );
};
