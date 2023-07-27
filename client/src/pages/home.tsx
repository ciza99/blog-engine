import { FetchQueryOptions, QueryClient } from "@tanstack/react-query";
import { LoaderFunction, useLoaderData } from "react-router-dom";

import { ArticleList } from "models";
import { axios } from "utils/axios";

const getArticles = async (page: number) => {
  return axios
    .get<ArticleList>(`/articles?page=${page}`)
    .then((res) => res.data);
};

const articlesQuery = (page: number): FetchQueryOptions<ArticleList> => {
  return { queryKey: ["articles", page], queryFn: () => getArticles(page) };
};

export const loader =
  (queryClient: QueryClient): LoaderFunction =>
  async ({ request }) => {
    const url = new URL(request.url);
    const pageString = url.searchParams.get("page") ?? "1";
    const page = parseInt(pageString, 10);
    return queryClient.fetchQuery(articlesQuery(page));
  };

export const Home = () => {
  const articleList = useLoaderData() as ArticleList;

  return <main>{articleList.items?.length === 0 && "No more articles"}</main>;
};
