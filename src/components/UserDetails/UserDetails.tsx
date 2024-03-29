import React, { useContext } from "react";
import {
  Box,
  Text,
  Stack,
  Flex,
} from "@chakra-ui/react";
import { FormDataContext } from "../../context/FormContex";

const UserDetails: React.FC = () => {

  const context = useContext(FormDataContext)

  if(!context || !context.formData){
    return <div></div>
  }

  const { formData } = context;

  return (
    <Box
      backgroundColor={"#dadada"}
      borderRadius="18px"
      minW="760px"
      padding="2rem"
      mt="1rem"
    >
      <Stack spacing={2}>
        <Flex alignItems="center">
          <Text fontWeight="bold">First Name:</Text>
          <Text ml={2}>{formData.firstName}</Text>
        </Flex>
        <Flex alignItems="center">
          <Text fontWeight="bold">Last Name:</Text>
          <Text ml={2}>{formData.lastName}</Text>
        </Flex>
        <Flex alignItems="center">
          <Text fontWeight="bold">Email:</Text>
          <Text ml={2}>{formData.email}</Text>
        </Flex>
        <Flex alignItems="center">
          <Text fontWeight="bold">Phone Number:</Text>
          <Text ml={2}>{formData.phoneNumber}</Text>
        </Flex>
        <Flex alignItems="center">
          <Text fontWeight="bold">Gender:</Text>
          <Text ml={2}>{formData.gender}</Text>
        </Flex>
        <Flex alignItems="center">
          <Text fontWeight="bold">Date of Birth:</Text>
          <Text ml={2}>{formData.dob}</Text>
        </Flex>
        {formData.techStack.length > 0 && (
          <Flex alignItems="center">
            <Text fontWeight="bold" mr={2}>Tech Stack:</Text>
            <Text>
              {formData.techStack.map((stack, index) => (
                <span key={index}>
                  {stack.stack}
                  {index < formData.techStack.length - 1 ? ", " : ""}
                </span>
              ))}
            </Text>
          </Flex>
        )}
      </Stack>
    </Box>
  );
};

export default UserDetails;
