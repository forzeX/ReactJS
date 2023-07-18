import {
  ADD_MESSAGE,
  DATA_ERROR,
  DATA_REQUEST,
  DATA_SUCCESS,
  DELETE_MESSAGE,
} from "./actions";
import { AUTHORS, REQUEST_STATUS } from "../../Utils/Constants";
import { TOGGLE_VISIBILITY } from "../chats/actions";

const initialState = {
  messagesList: {},
  requestStatus: {
    status: REQUEST_STATUS.IDLE,
    error: "",
  },
  isActive: false,
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_REQUEST:
      return {
        ...state,
        requestStatus: {
          status: REQUEST_STATUS.PENDING,
          error: "",
        },
      };
    case DATA_ERROR:
      return {
        ...state,
        requestStatus: {
          status: REQUEST_STATUS.FAILURE,
          error: action.error,
        },
      };
    case DATA_SUCCESS:
      return {
        ...state,
        messagesList: { ...action.data },
        requestStatus: {
          status: REQUEST_STATUS.SUCCESS,
          error: "",
        },
      };
    case TOGGLE_VISIBILITY: {
      return {
        ...state,
        isActive: !state.isActive,
      };
    }
    default:
      return state;
  }
};
