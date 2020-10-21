// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {createContext, useContext} from "react";
import ProfileListStore from "../layouts/ProfilesView/stores/ProfileListStore";
import ProfileService from "../services/ProfileService";

export const ProfileContext = createContext<ProfileListStore|null>(null)

export const useProfileStore = () => {
  return useContext(ProfileContext) || (new ProfileListStore(ProfileService));
}