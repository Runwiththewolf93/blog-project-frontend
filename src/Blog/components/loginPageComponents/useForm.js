import { useState } from "react";

/**
 * Creates a custom form hook that manages form state and validation.
 *
 * @param {Object} initialState - The initial state of the form.
 * @param {Function} onSubmit - The function to be called when the form is submitted.
 * @param {Object} error - The error object.
 * @param {Function} resetUserError - The function to reset user errors.
 * @param {Function} resetUserSuccess - The function to reset user success messages.
 * @return {Object} An object containing the form values, event handlers, form validity, and setValues function.
 */
export const useForm = (
  initialState,
  onSubmit,
  error,
  resetUserError,
  resetUserSuccess
) => {
  const [values, setValues] = useState(initialState);
  const [formValid, setFormValid] = useState(false);

  /**
   * Checks the validity of the form based on the values of email, password, and name.
   *
   * @return {void}
   */
  const checkFormValidity = values => {
    const { email, password } = values;
    if (values.isMember) {
      if (email && password) {
        setFormValid(true);
      } else {
        setFormValid(false);
      }
    } else {
      const { name } = values;
      if (name && email && password) {
        setFormValid(true);
      } else {
        setFormValid(false);
      }
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    const validNames = ["email", "password", "name", "isMember"];
    if (validNames.includes(name)) {
      const newValues = { ...values, [name]: value };
      setValues(newValues);
      checkFormValidity(newValues);
      if (error && value) {
        resetUserError();
        resetUserSuccess();
      }
    }
  };

  /**
   * The handleSubmit function prevents the default form submission, checks if the form is valid, and
   * calls the onSubmit function with the form values if it is valid.
   * @returns If the form is not valid, the function will return early and display a window alert
   * message. If the form is valid, the function will call the `onSubmit` function with the `values` as
   * an argument.
   */
  const handleSubmit = e => {
    e.preventDefault();
    if (!formValid) {
      window.alert("Please provide all values");
      return;
    }
    onSubmit(values);
  };

  return { values, handleChange, handleSubmit, formValid, setValues };
};

export default useForm;
