import { Box, IconButton } from "@chakra-ui/core";
import React, { useState } from "react";
import ProfileForm from "./ProfileForm";

const AddProfileForm = ({ onSubmitForm }: { onSubmitForm: any }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <Box m={5}>
      {" "}
      {showForm ? (
        <ProfileForm onSubmitForm={onSubmitForm} />
      ) : (
        <IconButton
          h={200}
          w={200}
          variant="outline"
          variantColor="teal"
          aria-label="Add Profile"
          fontSize="20px"
          icon="add"
          onClick={() => setShowForm(true)}
        />
      )}
    </Box>
  );
};

export default AddProfileForm;
