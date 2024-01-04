import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  Select,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { sendContactForm } from "../lib/api";

const initValues = {
  name: "",
  school: "",
  email: "",
  phone: "",
  option: "",
  subject: "",
  serial: "",
  message: "",
};

const initState = { isLoading: false, error: "", values: initValues };

export default function Home() {
  const toast = useToast();
  const [state, setState] = useState(initState);
  const [touched, setTouched] = useState({});

  const { values, isLoading, error } = state;

  const onBlur = ({ target }) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));

  const handleChange = ({ target }) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

  const onSubmit = async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    try {
      await sendContactForm(values);
      setTouched({});
      setState(initState);
      toast({
        title: "Nachricht versendet.",
        status: "Erfolgreich",
        duration: 2000,
        position: "top",
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
    }
  };

  return (
    <Container maxW="550px" mt={12}>
      <Heading>Diebstahl/Verlust/Schadensmeldung</Heading>
      {error && (
        <Text color="red.300" my={4} fontSize="xl">
          {error}
        </Text>
      )}

      <FormControl isRequired isInvalid={touched.name && !values.name} mb={5}>
        <FormLabel>Name des Betroffenen/Ansprechpartners</FormLabel>
        <Input
          type="text"
          name="name"
          errorBorderColor="red.300"
          value={values.name}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage>Erforderlich</FormErrorMessage>
      </FormControl>

      <FormControl
        isRequired
        mb={5}
        isInvalid={touched.school && !values.school}
      >
        <FormLabel>Schule auswählen</FormLabel>
        <Select
          name="school"
          errorBorderColor="red.300"
          value={values.school}
          onChange={handleChange}
          onBlur={onBlur}
        >
          <option value="">Wählen Sie eine Option</option>
          <option value="option1">Kleist </option>
          <option value="option2">Gym1</option>
        </Select>
        <FormErrorMessage>Erforderlich</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={touched.email && !values.email} mb={5}>
        <FormLabel>Kontaktmöglichkeit per Email</FormLabel>
        <Input
          type="email"
          name="email"
          errorBorderColor="red.300"
          value={values.email}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage>Erforderlich</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={touched.phone && !values.phone} mb={5}>
        <FormLabel>Kontaktmöglichkeit per Telefon</FormLabel>
        <Input
          type="phone"
          name="phone"
          errorBorderColor="red.300"
          value={values.phone}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage>Erforderlich</FormErrorMessage>
      </FormControl>

      <FormControl
        isRequired
        mb={5}
        isInvalid={touched.option && !values.option}
      >
        <FormLabel>Option wählen</FormLabel>
        <Select
          name="option"
          errorBorderColor="red.300"
          value={values.option}
          onChange={handleChange}
          onBlur={onBlur}
        >
          <option value="">Wählen Sie eine Option</option>
          <option value="option1">Diebstahl</option>
          <option value="option2">Verlust</option>
        </Select>
        <FormErrorMessage>Erforderlich</FormErrorMessage>
      </FormControl>

      <FormControl
        mb={5}
        isRequired
        isInvalid={touched.subject && !values.subject}
      >
        <FormLabel>Betroffene Sache</FormLabel>
        <Input
          type="text"
          name="subject"
          errorBorderColor="red.300"
          value={values.subject}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage>Erforderlich</FormErrorMessage>
      </FormControl>

      <FormControl
        mb={5}
        isRequired
        isInvalid={touched.serial && !values.serial}
      >
        <FormLabel>Seriennummer oder Inventarnummer</FormLabel>
        <Input
          type="text"
          name="serial"
          errorBorderColor="red.300"
          value={values.serial}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage>Erforderlich</FormErrorMessage>
      </FormControl>

      <FormControl
        isRequired
        isInvalid={touched.message && !values.message}
        mb={5}
      >
        <FormLabel>Hergang des Vorfalls</FormLabel>
        <p>
          Bitte gehen Sie unter Anderem auf folgende Fragen ein: <br />
          Wann und unter welchen Umständen wurde der Vorfall festgestellt?{" "}
          <br />
          Wer hat ihn festgestellt? <br />
          Welche Handlungen wurden bereits vorgenommen? <br />
          Gibt es einen (bekannten) Verursacher?
        </p>
        <Textarea
          type="text"
          name="message"
          rows={4}
          errorBorderColor="red.300"
          value={values.message}
          onChange={handleChange}
          onBlur={onBlur}
        />
        <FormErrorMessage>Erforderlich</FormErrorMessage>
      </FormControl>

      <Button
        variant="outline"
        colorScheme="blue"
        isLoading={isLoading}
        disabled={
          !values.name || !values.email || !values.subject || !values.message
        }
        onClick={onSubmit}
      >
        Absenden
      </Button>
    </Container>
  );
}
