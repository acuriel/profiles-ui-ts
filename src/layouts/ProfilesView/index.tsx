import { Stack } from "@chakra-ui/core";
import React, { useEffect } from "react";
import { observer } from "mobx-react";
import ProfileList from "./components/ProfileList";
import { useProfileStore } from "../../common/stores";
import AddProfileForm from "./components/AddProfileForm";

const Profiles = () => {
  const store = useProfileStore();

  useEffect(() => {
    store.fetchProfiles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack>
      <ProfileList
        profiles={store.profiles}
        prevToList={<AddProfileForm onSubmitForm={store.save} />}
      />
    </Stack>
  );
};

export default observer(Profiles);
