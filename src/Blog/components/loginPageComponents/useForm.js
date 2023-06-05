import { useState } from "react";

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
