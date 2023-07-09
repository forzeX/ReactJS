import React, { useState } from "react";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
// import { sendProfileName } from "../../../Store/actions";
import { changeProfile, getProfileData } from "../../../Store/profile/actions";
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
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import { REQUEST_STATUS } from "../../../Utils/Constants";

const Profile = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profile.profileData);
  const error = useSelector((state) => state.profile.requestStatus.error);
  const status = useSelector((state) => state.profile.requestStatus.status);

  useEffect(() => getProfileData(dispatch), []);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // dispatch(sendProfileName(value));
  //   dispatch(changeProfile(value));
  //   setValue("");
  // };

  if (error) {
    return <h2>Failure! {error}</h2>;
  }

  if (status === REQUEST_STATUS.PENDING) {
    return <h2>Loading...</h2>;
  }

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
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">Имя</InputLabel>
            <Input
              id="input-with-icon-adornment"
              defaultValue={`${profileData.name} ${profileData.lastName}`}
              startAdornment={
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              }
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
            />
          </FormControl>
        </Box>
      </div>
    </>
  );
};

export default Profile;
