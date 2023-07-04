import { CHANGE_PROFILE } from "./actions";

const initialState = {
  profileData: {
    login: "User1",
    name: "Артем",
    lastName: "Горбачев",
    phone: "+7123456789",
    birthDate: "23.12.1990",
  },
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PROFILE:
      return {
        ...state,
        profileData: {
          login: action.payload.login,
          name: action.payload.name,
          lastName: action.payload.lastName,
          phone: action.payload.phone,
          birthDate: action.payload.birthDate,
        },
      };
    default:
      return state;
  }
};
