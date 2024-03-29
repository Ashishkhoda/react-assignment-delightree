import React, { useContext, useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { FormData } from "../../types";
import { FormDataContext } from "../../context/FormContex";
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  IconButton,
  InputRightElement,
  InputGroup,
  Box,
  Spacer,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  CheckIcon,
  AddIcon,
  CloseIcon,
} from "@chakra-ui/icons";

const InputFormComponent: React.FC = () => {
  const form = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      dob: "",
      techStack: [{ stack: "" }],
      email: "",
      phoneNumber: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = form;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedGender, setSelectedGender] = useState("");
  const { updateFormData } = useContext(FormDataContext);

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const { fields, append, remove } = useFieldArray({
    name: "techStack",
    control: form.control,
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    // Simulate loading for 3 seconds
    setTimeout(() => {
      setIsLoading(false);
      updateFormData(data);
      setSelectedGender("");
      reset();
    }, 3000);
  };

  return (
    <Box
      className="InputFormComponent"
      backgroundColor={"#dadada"}
      borderRadius="18px"
      minW="760px"
      padding="2rem"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text fontSize={25} fontWeight="500" paddingBottom="1rem">
          Basic Details
        </Text>

        <Stack isInline>
          <FormControl isInvalid={!!errors.firstName} paddingRight="1rem">
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <Input
              variant="filled"
              placeholder="Enter First name"
              {...register("firstName", {
                required: "First Name is required",
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "First Name is incorrect",
                },
              })}
              id="firstName"
            />
            <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.lastName} paddingLeft="1rem">
            <FormLabel htmlFor="lastName">Last Name</FormLabel>
            <Input
              variant="filled"
              placeholder="Enter Last name"
              {...register("lastName", {
                required: "Last Name is required",
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "Last Name is incorrect",
                },
              })}
              id="lastName"
            />
            <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
          </FormControl>
        </Stack>

        <Stack isInline paddingTop="1rem">
          <FormControl isInvalid={!!errors.email} paddingRight="1rem">
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              variant="filled"
              placeholder="Enter Email Address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              id="email"
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.phoneNumber} paddingLeft="1rem">
            <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
            <Input
              variant="filled"
              placeholder="Enter Phone Number (+91)"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^\+91\d{10}$/,
                  message:
                    "Invalid phone number format. Use +91 followed by 10 digits.",
                },
              })}
              id="phoneNumber"
            />
            <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
          </FormControl>
        </Stack>
        <Text fontSize={25} fontWeight="500" paddingTop="1rem">
          Other Information
        </Text>

        <Stack isInline>
          <FormControl isInvalid={!!errors.gender} mt={4} paddingRight="1rem">
            <FormLabel htmlFor="gender">Gender</FormLabel>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                width={"100%"}
              >
                {selectedGender
                  ? genderOptions.find(
                      (option) => option.value === selectedGender
                    )?.label
                  : "Select Gender"}
              </MenuButton>
              <MenuList>
                {genderOptions.map((option) => (
                  <MenuItem
                    key={option.value}
                    onClick={() => {
                      setSelectedGender(option.value);
                      setValue("gender", option.value);
                    }}
                    minH="20px"
                  >
                    <Flex justify="space-between" align="start" width="full">
                      <Text>{option.label}</Text>
                      {selectedGender === option.value && (
                        <CheckIcon color="green.500" />
                      )}
                    </Flex>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <FormErrorMessage>
              {errors.gender && "Gender is required"}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.dob} mt={4} paddingLeft="1rem">
            <FormLabel htmlFor="dob">Date of Birth</FormLabel>
            <Input
              variant="filled"
              {...register("dob", { required: "Date of birth is required" })}
              id="dob"
              type="date"
            />
            <FormErrorMessage>
              {errors.dob && "DOB is required"}
            </FormErrorMessage>
          </FormControl>
        </Stack>

        <FormControl
          isInvalid={!!errors.techStack}
          width="50%"
          padding="1rem 1rem 0rem 0rem"
        >
          <Stack direction="row" alignItems="end">
            <FormLabel>Tech Stack</FormLabel>
            <Spacer />
            <IconButton
              background="none"
              aria-label="Add Tech Stack"
              icon={<AddIcon />}
              onClick={() => append({ stack: "" })}
            />
          </Stack>

          <Stack spacing={4}>
            {fields.map((field, index) => (
              <InputGroup key={index}>
                <Input
                  variant="filled"
                  placeholder="Enter a tech stack"
                  {...register(`techStack.${index}.stack` as const, {
                    required: "Add atleast one Tech Stack",
                  })}
                />
                <InputRightElement>
                  {index > 0 && (
                    <IconButton
                      background="none"
                      aria-label="Remove Tech Stack"
                      icon={<CloseIcon />}
                      onClick={() => remove(index)}
                    />
                  )}
                </InputRightElement>
              </InputGroup>
            ))}
          </Stack>
          <FormErrorMessage>
            {errors.techStack && "Enter a tech stack"}
          </FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          isLoading={isLoading}
          loadingText="Submitting..."
          mt={4}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default InputFormComponent;
