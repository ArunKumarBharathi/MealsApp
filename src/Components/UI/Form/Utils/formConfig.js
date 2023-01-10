import { Input } from "../Input/Input";
import {
  maximumValidation,
  minimumValidation,
  requiredValidation,
} from "./FormValidation";

function createFormConfig(label, name, type, placeholder, defaultValue = "") {
  return {
    renderInput: (handleChange, value, error) => {
      return (
        <Input
          key={label}
          handleChange={handleChange}
          label={label}
          name={name}
          type={type}
          value={value}
          error={error}
          placeholder={placeholder}
        />
      );
    },
    error: "",
    value: defaultValue,
  };
}

export const SignUpForm = {
  name: {
    ...createFormConfig(
      "Name",
      "name",
      "text",
      "Enter your name",
      "Arun Kumar"
    ),
    validation: [
      requiredValidation("Name"),
      minimumValidation("Name", 4),
      maximumValidation("Name", 10),
    ],
  },
  address: {
    ...createFormConfig("Address", "address", "text", "Enter your address"),
    validation: [
      requiredValidation("Address"),
      minimumValidation("Address", 8),
      maximumValidation("Address", 15),
    ],
  },
  phone: {
    ...createFormConfig(
      "Phone number",
      "phone",
      "number",
      "Enter your Phone number"
    ),
    validation: [
      requiredValidation("Phone number"),
      minimumValidation("Phone number", 10),
      maximumValidation("Phone number", 10),
    ],
  },
  // paymentType: {},
};
