import { useCallback } from "react";
import { useState } from "react";

export const useForm = (formObj) => {
  const [form, setForm] = useState(formObj);

  function createForm() {
    return Object.values(form).map((input) => {
      const { renderInput, error, value, label } = input;
      return renderInput(onChangeHandler, value, error, label);
    });
  }

  const isvalid = useCallback((input) => {
    for (const value of input.validation) {
      if (!value.validate(input.value)) {
        input.error = value.error;
        return false;
      }
    }
    input.error = "";
    return true;
  }, []);

  const onChangeHandler = useCallback(
    (event) => {
      const { value, name } = event.target;
      const input = { ...form[name] };
      input.value = value;
      isvalid(input);
      setForm((form) => {
        return { ...form, [name]: input };
      });
    },
    [form, isvalid]
  );

  return { createForm, form };
};

export default useForm;
