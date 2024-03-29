import React from "react";
import InputFormComponent from "./components/InputFormComponent/InputFormComponent";
import { Center, Stack, Text } from "@chakra-ui/react";
import { FormDataProvider } from "./context/FormContex";
import UserDetails from "./components/UserDetails/UserDetails";

const App: React.FC = () => {
  return (
    <Center className="App">
      <Stack >
        <Center>
        <Text as="b" fontSize="3xl">User Details</Text>
        </Center>
        <FormDataProvider>
          <InputFormComponent />
          <UserDetails />
        </FormDataProvider>
      </Stack>
    </Center>
  );
};

export default App;
