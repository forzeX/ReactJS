import { API_URL } from "../../Utils/Constants";

export const ARTICLES_REQUEST = "ARTICLES::REQUEST";
export const ARTICLES_SUCCESS = "ARTICLES::SUCCESS";
export const ARTICLES_FAILURE = "ARTICLES::FAILURE";

export const articlesRequest = () => ({
  type: ARTICLES_REQUEST,
});

export const articlesSuccess = (articles) => ({
  type: ARTICLES_SUCCESS,
  articles,
});

export const articlesFailure = (error) => ({
  type: ARTICLES_FAILURE,
  error,
});

export const getArticles = (dispatch) => {
  dispatch(articlesRequest());
  fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`request failed with: ` + response.status);
      }
      return response.json();
    })
    .then((data) => {
      dispatch(articlesSuccess(data.results));
    })
    .catch((error) => dispatch(articlesFailure(error.message)));
};
