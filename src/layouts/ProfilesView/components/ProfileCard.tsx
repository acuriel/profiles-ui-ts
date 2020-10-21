import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/core";
import { Profile } from "../../../models/Profile";

type ProfileCardProps = {
  profile: Profile;
  onEditClick?: () => void;
  onDeleteClick?: (profile: Profile) => Promise<void>;
};

const ProfileCard = ({
  profile,
  onEditClick,
  onDeleteClick,
  ...props
}: ProfileCardProps) => {
  return (
    <Box w={220} h={200} pl={5} pr={5} shadow="md" borderWidth="1px" {...props}>
      <Stack>
        <Heading fontSize="xl">
          {profile.firstName} {profile.lastName}
        </Heading>
        <Text mt={4}>{profile.birthDate.toDateString()}</Text>
        <ButtonGroup spacing={4}>
          {onEditClick && (
            <Button
              leftIcon="edit"
              variantColor="green"
              variant="outline"
              onClick={() => onEditClick()}
            >
              Edit
            </Button>
          )}
          {onDeleteClick && (
            <Button
              leftIcon="close"
              variantColor="red"
              variant="solid"
              onClick={() => onDeleteClick(profile)}
            >
              Delete
            </Button>
          )}
        </ButtonGroup>
      </Stack>
    </Box>
  );
};

export default ProfileCard;
