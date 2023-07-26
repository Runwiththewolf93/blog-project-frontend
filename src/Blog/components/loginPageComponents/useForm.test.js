import { act, renderHook } from "@testing-library/react";
import useForm from "./useForm";

describe("useForm_function", () => {
  // Tests that the initial state is set correctly
  it("test_initial_state", () => {
    const initialState = { email: "", password: "", name: "", isMember: false };
    const { result } = renderHook(() =>
      useForm(initialState, jest.fn(), {}, jest.fn(), jest.fn())
    );
    expect(result.current.values).toEqual(initialState);
  });

  // Tests that handleChange updates the values state correctly
  it("test_handle_change_updates_values_state", () => {
    const initialState = { email: "", password: "", name: "", isMember: false };

    const { result } = renderHook(() =>
      useForm(initialState, jest.fn(), {}, jest.fn(), jest.fn())
    );

    const event = { target: { name: "email", value: "test@test.com" } };

    act(() => {
      result.current.handleChange(event);
    });

    expect(result.current.values.email).toEqual("test@test.com");
  });

  // Tests that checkFormValidity sets formValid to true when all required fields are filled
  it("test_check_form_validity_sets_form_valid_to_true", () => {
    const initialState = { email: "", password: "", name: "", isMember: true };

    const { result } = renderHook(() =>
      useForm(initialState, jest.fn(), {}, jest.fn(), jest.fn())
    );

    const event = { target: { name: "email", value: "test@test.com" } };

    act(() => {
      result.current.handleChange(event);
    });

    const event2 = { target: { name: "password", value: "password" } };

    act(() => {
      result.current.handleChange(event2);
    });

    expect(result.current.formValid).toEqual(true);
  });

  // Tests that handleSubmit calls onSubmit with the correct values when formValid is true
  it("test_handle_submit_calls_on_submit_with_correct_values", () => {
    const initialState = { email: "", password: "", name: "", isMember: true };
    const onSubmit = jest.fn();

    const { result } = renderHook(() =>
      useForm(initialState, onSubmit, {}, jest.fn(), jest.fn())
    );

    const event = { target: { name: "email", value: "test@test.com" } };
    act(() => {
      result.current.handleChange(event);
    });

    const event2 = { target: { name: "password", value: "password" } };
    act(() => {
      result.current.handleChange(event2);
    });

    act(() => {
      result.current.handleSubmit({ preventDefault: jest.fn() });
    });

    expect(onSubmit).toHaveBeenCalledWith({
      email: "test@test.com",
      password: "password",
      name: "",
      isMember: true,
    });
  });

  // Tests that handleChange does not update the values state when the input name is not recognized
  it("test_handle_change_does_not_update_values_state_when_input_name_not_recognized", () => {
    const initialState = { email: "", password: "", name: "", isMember: false };

    const { result } = renderHook(() =>
      useForm(initialState, jest.fn(), {}, jest.fn(), jest.fn())
    );

    const event = { target: { name: "invalid", value: "test" } };

    act(() => {
      result.current.handleChange(event);
    });

    expect(result.current.values).toEqual(initialState);
  });

  // Tests that checkFormValidity sets formValid to false when required fields are not filled
  it("test_check_form_validity_sets_form_valid_to_false", () => {
    const initialState = { email: "", password: "", name: "", isMember: false };

    const { result } = renderHook(() =>
      useForm(initialState, jest.fn(), {}, jest.fn(), jest.fn())
    );

    const event = { target: { name: "email", value: "test@test.com" } };

    act(() => {
      result.current.handleChange(event);
    });

    expect(result.current.formValid).toEqual(false);
  });
});
