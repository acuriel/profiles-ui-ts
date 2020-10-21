import React from "react";
import { theme, ThemeProvider } from "@chakra-ui/core";
import Profiles from "./layouts/ProfilesView";
import ProfileListStore from "./layouts/ProfilesView/stores/ProfileListStore";
import ProfileService from "./services/ProfileService";
import { ProfileContext } from "./common/stores";


function App() {
  return (
    <ProfileContext.Provider value={new ProfileListStore(ProfileService)}>
      <ThemeProvider theme={theme}>
        <Profiles />
      </ThemeProvider>
    </ProfileContext.Provider>
  );
}

export default App;
