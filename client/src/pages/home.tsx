import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { ArticleList } from "models";
import { axios } from "utils/axios";
import { Spinner } from "components/spinner";

const getArticleList = async (page: number) => {
  return axios
    .get<ArticleList>(`/articles?page=${page}`)
    .then((res) => res.data);
};

export const Home = () => {
  const { page: pageQuery } = useParams<{ page: string }>();
  const pageNumber = parseInt(pageQuery ?? "1");
  const page = isNaN(pageNumber) ? 1 : pageNumber;

  const { data: articleList } = useQuery({
    queryKey: ["articles", page],
    queryFn: () => getArticleList(page),
  });

  if (!articleList) {
    return (
      <div className="grow flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return <main>{articleList.items?.length === 0 && "No more articles"}</main>;
};
