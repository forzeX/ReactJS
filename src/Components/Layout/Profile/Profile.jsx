import React, { useState, useEffect, useCallback } from "react";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileData,
  changeProfileData,
} from "../../../Store/profile/actions";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Box,
} from "@mui/material";
import { API_URL, REQUEST_STATUS } from "../../../Utils/Constants";

const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getProfileData(dispatch);
  }, []);

  const profileData = useSelector((state) => state.profile.profileData);

  const [values, setValues] = useState(profileData);

  useEffect(() => {
    fetch(API_URL.PROFILE, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((profileData) => setValues(profileData))
      .catch((error) => console.error(error));
  }, []);

  const error = useSelector((state) => state.profile.requestStatus.error);
  const status = useSelector((state) => state.profile.requestStatus.status);

  if (error) {
    return <h2>Failure! {error}</h2>;
  }

  if (status === REQUEST_STATUS.PENDING) {
    return <h2>Loading...</h2>;
  }

  const keys = Object.keys(profileData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleBlur = (e) => {
    changeProfileData(dispatch, values);
  };

  return (
    <>
      <div className="profile">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="80vh"
          rowGap={3}
        >
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">Логин</InputLabel>
            <Input
              id="input-with-icon-adornment"
              defaultValue={profileData.login}
              startAdornment={
                <InputAdornment position="start">
                  <AlternateEmailIcon />
                </InputAdornment>
              }
              onBlur={handleBlur} //+
              name={keys[0]}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">Имя</InputLabel>
            <Input
              id="input-with-icon-adornment"
              defaultValue={`${profileData.name}`}
              startAdornment={
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              }
              onBlur={handleBlur}
              name={keys[1]}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">Фамилия</InputLabel>
            <Input
              id="input-with-icon-adornment"
              defaultValue={`${profileData.lastName}`}
              startAdornment={
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              }
              onBlur={handleBlur}
              name={keys[2]}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">
              Номер телефона
            </InputLabel>
            <Input
              id="input-with-icon-adornment"
              defaultValue={`${profileData.phone}`}
              startAdornment={
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              }
              onBlur={handleBlur}
              name={keys[3]}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">
              Дата рождения
            </InputLabel>
            <Input
              id="input-with-icon-adornment"
              defaultValue={`${profileData.birthDate}`}
              startAdornment={
                <InputAdornment position="start">
                  <CalendarMonthIcon />
                </InputAdornment>
              }
              onBlur={handleBlur}
              name={keys[4]}
              onChange={handleChange}
            />
          </FormControl>
        </Box>
      </div>
    </>
  );
};

export default Profile;
