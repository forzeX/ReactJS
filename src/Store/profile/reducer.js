import { REQUEST_STATUS } from "../../Utils/Constants";
import { DATA_ERROR, DATA_REQUEST, DATA_SUCCESS } from "./actions";

const initialState = {
  profileData: {
    login: "User1",
    name: "Артем",
    lastName: "Горбачев",
    phone: "+7123456789",
    birthDate: "23.12.1990",
  },
  requestStatus: {
    status: REQUEST_STATUS.IDLE,
    error: "",
  },
};

export const profileReducer = (state = initialState, action) => {
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
        profileData: { ...action.data },
        requestStatus: {
          status: REQUEST_STATUS.SUCCESS,
          error: "",
        },
      };
    default:
      return state;
  }
};
