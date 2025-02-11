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
import { initialValues, schools, caseTypes } from "../config/formFields.json";

const initState = { isLoading: false, error: "", values: initialValues };

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
        status: "success",
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
    <Container maxW="700px" mt={12}>
      <Heading mb={12}>Diebstahl/Verlust/Schadensmeldung</Heading>

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
          {schools.map((school) => (
            <option key={school.value} value={school.value}>
              {school.label}
            </option>
          ))}
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

      <FormControl isRequired mb={5} isInvalid={touched.case && !values.case}>
        <FormLabel>Vorfall wählen</FormLabel>
        <Select
          name="case"
          errorBorderColor="red.300"
          value={values.case}
          onChange={handleChange}
          onBlur={onBlur}
        >
          <option value="">Wählen Sie eine Option</option>
          {caseTypes.map((caseType) => (
            <option key={caseType.value} value={caseType.value}>
              {caseType.label}
            </option>
          ))}
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
          Gibt es einen (bekannten) Verursacher? (Bei einem Lehrelaptop:) Wurde,
          wie im Leihvertrag vereinbart, eine Versicherung abgeschlossen?
        </p>
        <Textarea
          type="text"
          name="message"
          rows={8}
          errorBorderColor="red.300"
          value={values.message}
          onChange={handleChange}
          onBlur={onBlur}
          mt={8}
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
      {error && (
        <Text color="red.300" my={4} fontSize="xl">
          {error}
        </Text>
      )}
    </Container>
  );
}
