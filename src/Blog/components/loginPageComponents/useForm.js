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

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
    checkFormValidity();
    if (error && e.target.value) {
      resetUserError();
      resetUserSuccess();
    }
  };

  /**
   * Checks the validity of the form based on the values of email, password, and name.
   *
   * @return {void}
   */
  const checkFormValidity = () => {
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
