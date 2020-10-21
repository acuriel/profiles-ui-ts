import React, { useState } from "react";
import { observer } from "mobx-react";
import { Box, Flex } from "@chakra-ui/core";
import { Profile } from "../../../models/Profile";
import ProfileCard from "./ProfileCard";
import { useProfileStore } from "../../../common/stores";
import ProfileForm from "./ProfileForm";

type ProfileListParams = {
  profiles: Profile[];
  prevToList?: JSX.Element;
  afterList?: JSX.Element;
};

const ProfileList = ({
  profiles,
  prevToList,
  afterList,
  ...props
}: ProfileListParams) => {
  const store = useProfileStore();
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);

  const renderProfileSection = (profile: Profile) => {
    return (
      <Box m={5}>
        {editingProfile?.id === profile.id ? (
          <ProfileForm
            profile={profile}
            onSubmitForm={async (profile: Profile) => {
              await store.save(profile);
              setEditingProfile(null);
            }}
          />
        ) : (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onEditClick={() => setEditingProfile(profile)}
            onDeleteClick={() => store.delete(profile)}
          />
        )}
      </Box>
    );
  };

  return (
    <Flex direction="row" wrap="wrap">
      {prevToList}
      {profiles.map((profile) => renderProfileSection(profile))}
      {afterList}
    </Flex>
  );
};

export default observer(ProfileList);
