import { axios } from "utils/axios";

export const deleteArticleRequest = (articleId: string) =>
  axios.delete(`/articles/${articleId}`);
