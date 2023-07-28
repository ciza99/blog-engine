import { ArticleList } from "models";
import { axios } from "utils/axios";

export const getArticleList = async (page: number) => {
  return axios
    .get<ArticleList>(`/articles?page=${page}`)
    .then((res) => res.data);
};
