import { API_URL } from "../../Utils/Constants";

export const DATA_REQUEST = "PROFILE::DATA_REQUEST";
export const DATA_SUCCESS = "PROFILE::DATA_SUCCESS";
export const DATA_ERROR = "PROFILE::DATA_ERROR";

export const profileDataRequest = () => ({
  type: DATA_REQUEST,
});

export const profileDataSuccess = (data) => {
  return {
    type: DATA_SUCCESS,
    data,
  };
};
export const profileDataError = (error) => ({
  type: DATA_ERROR,
  error,
});

export const getProfileData = (dispatch) => {
  dispatch(profileDataRequest());
  fetch(API_URL.PROFILE, {
    // fetch("http://localhost:3000/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        // Свойство "ok" полученного объекта response становится true, если HTTP-статус находится в диапазоне 200-299
        throw new Error(`Ошибка ` + response.status);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      dispatch(profileDataSuccess(data));
    })
    .catch((error) => {
      dispatch(profileDataError(error.message));
      console.log(error);
    });
};

export const changeProfileData = (dispatch, data) => {
  dispatch(profileDataRequest());
  fetch(API_URL.PROFILE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        // Свойство "ok" полученного объекта response становится true, если HTTP-статус находится в диапазоне 200-299
        throw new Error(`Ошибка ` + response.status);
      }
      return response.json();
    })
    .then((data) => {
      dispatch(profileDataSuccess(data));
    })
    .catch((error) => {
      dispatch(profileDataError(error.message));
      console.log(error);
    });
};

// export const changeName = (name) => ({
//   type: CHANGE_NAME,
//   payload: name,
// });

// export const changeLastName = (lastName) => ({
//   type: CHANGE_LAST_NAME,
//   payload: lastName,
// });

// export const changePhone = (phone) => ({
//   type: CHANGE_PHONE,
//   payload: phone,
// });

// export const changeBirthDate = (birthDate) => ({
//   type: CHANGE_BIRTH_DATE,
//   payload: birthDate,
// });
