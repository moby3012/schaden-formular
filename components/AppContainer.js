import { Container } from "@chakra-ui/react";

const AppContainer = ({ children }) => {
  return (
    <Container textAlign="center" p="1em">
      {children}
    </Container>
  );
};
export default AppContainer;
