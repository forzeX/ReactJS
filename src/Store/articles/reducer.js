import { REQUEST_STATUS } from "../../Utils/Constants";
import {
  ARTICLES_FAILURE,
  ARTICLES_REQUEST,
  ARTICLES_SUCCESS,
} from "./actions";

const initialState = {
  articlesList: [],
  request: {
    status: REQUEST_STATUS.IDLE,
    error: "",
  },
};

export const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLES_REQUEST: {
      console.log("pending");
      return {
        ...state,
        request: {
          status: REQUEST_STATUS.PENDING,
          error: "", // сброс ошибки, если производим повторный запрос
        },
      };
    }
    case ARTICLES_FAILURE: {
      return {
        ...state,
        request: {
          status: REQUEST_STATUS.FAILURE,
          error: action.error,
        },
      };
    }
    case ARTICLES_SUCCESS: {
      return {
        ...state,
        articlesList: [...action.articles],
        request: {
          status: REQUEST_STATUS.SUCCESS,
          error: "",
        },
      };
    }
    default:
      return state;
  }
};
