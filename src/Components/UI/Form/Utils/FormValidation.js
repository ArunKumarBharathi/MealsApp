function createValidation(rule, message, validateFn) {
  return {
    name: rule,
    error: message,
    validate: validateFn,
  };
}

export const requiredValidation = (input) => {
  return createValidation(
    "required",
    `${input} required`,
    (inputVal) => inputVal.length !== 0
  );
};

export const minimumValidation = (input, minimum) => {
  return createValidation(
    "minimum",
    `${input} should contain minimum ${minimum} letters`,
    (inputVal) => inputVal.length >= minimum
  );
};

export const maximumValidation = (input, maximum) => {
  return createValidation(
    "maximum",
    `${input} cannot contain more than ${maximum} letters`,
    (inputVal) => inputVal.length <= maximum
  );
};
