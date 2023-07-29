import { ArticleDetail, ArticleList } from "models";
import { axios } from "utils/axios";

export const getArticleList = async (offset: number, limit: number) => {
  return axios
    .get<ArticleList>(`/articles?offset=${offset}&limit=${limit}`)
    .then((res) => res.data);
};

export const getArticle = (articleId?: string) =>
  axios.get<ArticleDetail>(`/articles/${articleId}`).then((res) => res.data);
