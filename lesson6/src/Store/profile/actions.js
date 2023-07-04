export const CHANGE_PROFILE = "PROFILE::CHANGE_PROFILE";

export const changeProfile = (newProfileData) => ({
  type: CHANGE_PROFILE,
  payload: newProfileData,
});
