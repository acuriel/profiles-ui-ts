import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Box, Button, Heading, Input, Stack } from "@chakra-ui/core";
import { Profile } from "../../../models/Profile";
import DatePicker from "react-datepicker";

type ProfileFormParams = {
  profile?: Profile;
  onSubmitForm?: (profile: Profile) => Promise<void>;
};

const ProfileForm = ({ profile, onSubmitForm }: ProfileFormParams) => {
  const [editingProfile, setEditingProfile] = useState<Profile>(
    profile || Profile.getEmpty()
  );
  const onFieldChange = (field: string, value: any) => {
    setEditingProfile(new Profile({ ...editingProfile, [field]: value }));
  };

  const saveProfile = async () => {
    if (onSubmitForm) {
      await onSubmitForm(editingProfile);
    }
    setEditingProfile(Profile.getEmpty());
  };

  return (
    <Box w={200}>
      <Stack>
        <Heading size="md">
          {editingProfile.id ? "Edit" : "New"} Profile:
        </Heading>
        <Input
          isRequired
          placeholder="First Name"
          name="firstName"
          defaultValue={editingProfile.firstName}
          onChange={(e: React.ChangeEvent<any>) =>
            onFieldChange(e.target.name, e.target.value)
          }
        />
        <Input
          isRequired
          placeholder="Last Name"
          name="lastName"
          value={editingProfile.lastName}
          onChange={(e: React.ChangeEvent<any>) =>
            onFieldChange(e.target.name, e.target.value)
          }
        />
        <DatePicker
          required
          name="birthDate"
          selected={editingProfile.birthDate}
          maxDate={new Date(Date.now())}
          showYearDropdown
          yearDropdownItemNumber={15}
          scrollableYearDropdown
          onChange={(date) => onFieldChange("birthDate", date)}
        />
        <Button
          isFullWidth
          leftIcon="add"
          variantColor="teal"
          variant="solid"
          onClick={saveProfile}
        >
          {" "}
          Save{" "}
        </Button>
      </Stack>
    </Box>
  );
};

export default observer(ProfileForm);
