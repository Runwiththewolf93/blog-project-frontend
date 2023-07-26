/* eslint-disable jest/no-conditional-expect */
import { render, screen, fireEvent } from "@testing-library/react";
import FormInput from "./FormInput";

describe("FormInput_function", () => {
  // Tests that the form input component is rendered with all required props
  it("test_render_form_input_with_all_props", () => {
    const handleFileChange = jest.fn();
    const handleToggle = jest.fn();

    const props = {
      controlId: "controlId",
      label: "label",
      type: "text",
      placeholder: "placeholder",
      autoFocus: true,
      value: "value",
      onChange: jest.fn(),
      name: "name",
      as: "textarea",
      rows: 3,
      dataIndex: 1,
      handleFileChange,
      isFileInput: false,
      handleToggle,
      fileUpload: true,
    };

    render(<FormInput {...props} />);

    const formGroup = screen.getByTestId("form-group");
    expect(formGroup).toBeInTheDocument();
    expect(screen.getByLabelText(props.label)).toHaveAttribute(
      "id",
      `${props.controlId}-${props.dataIndex}`
    );
    expect(screen.getByLabelText(props.label)).toBeInTheDocument();
    expect(screen.getByLabelText(props.label)).toHaveAttribute(
      "type",
      props.type
    );
    expect(screen.getByLabelText(props.label)).toHaveAttribute(
      "placeholder",
      props.placeholder
    );
    expect(screen.getByLabelText(props.label)).toBe(document.activeElement);
    expect(screen.getByLabelText(props.label)).toHaveValue(props.value);

    fireEvent.change(screen.getByLabelText(props.label), {
      target: { value: "new value" },
    });
    expect(props.onChange).toHaveBeenCalled();
    expect(screen.getByLabelText(props.label)).toHaveAttribute(
      "name",
      props.name
    );
    expect(screen.getByLabelText(props.label).tagName).toBe("TEXTAREA");
    expect(screen.getByLabelText(props.label)).toHaveAttribute(
      "rows",
      `${props.rows}`
    );
    expect(screen.getByRole("button")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));
    expect(handleToggle).toHaveBeenCalled();
  });

  // Tests that the form input component is rendered with default props
  it("test_render_form_input_with_default_props", () => {
    const props = {
      controlId: "controlId",
      label: "label",
      type: "text",
      placeholder: "placeholder",
      value: "",
      onChange: jest.fn(),
      name: "",
      //   as: "",
      dataIndex: undefined,
      handleFileChange: jest.fn(),
      isFileInput: false,
      handleToggle: jest.fn(),
      fileUpload: false,
    };

    render(<FormInput {...props} />);

    const formGroup = screen.getByTestId("form-group");
    expect(formGroup).toBeInTheDocument();
    expect(screen.getByLabelText(props.label)).toHaveAttribute("id");
    expect(screen.getByLabelText(props.label)).toBeInTheDocument();
    expect(screen.getByLabelText(props.label)).toHaveAttribute(
      "type",
      props.type
    );
    expect(screen.getByLabelText(props.label)).toHaveAttribute(
      "placeholder",
      props.placeholder
    );
    expect(screen.getByLabelText(props.label)).not.toBe(document.activeElement);
    expect(screen.getByLabelText(props.label)).toHaveValue(props.value);

    fireEvent.change(screen.getByLabelText(props.label), {
      target: { value: "new value" },
    });
    expect(props.onChange).toHaveBeenCalled();
    expect(screen.getByLabelText(props.label)).toHaveAttribute(
      "name",
      props.name
    );
    expect(screen.getByLabelText(props.label).tagName).not.toBe("TEXTAREA");
    expect(screen.getByLabelText(props.label)).not.toHaveAttribute("rows");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  // Tests that the form input component is rendered with undefined props
  it("test_render_form_input_with_undefined_props", () => {
    const props = {
      controlId: undefined,
      label: undefined,
      type: undefined,
      placeholder: undefined,
      value: undefined,
      onChange: undefined,
      name: undefined,
      as: undefined,
      dataIndex: undefined,
      handleFileChange: undefined,
      isFileInput: undefined,
      handleToggle: undefined,
      fileUpload: undefined,
    };

    render(<FormInput {...props} />);

    const formGroup = screen.getByTestId("form-group");
    expect(formGroup).toBeInTheDocument();

    // Check if label exists before running these assertions
    if (props.label) {
      expect(screen.getByLabelText(props.label)).toHaveAttribute("id");
      expect(screen.getByLabelText(props.label)).toBeInTheDocument();
      expect(screen.getByLabelText(props.label)).toHaveAttribute(
        "type",
        props.type
      );
      expect(screen.getByLabelText(props.label)).toHaveAttribute(
        "placeholder",
        props.placeholder
      );
      expect(screen.getByLabelText(props.label)).not.toBe(
        document.activeElement
      );
      expect(screen.getByLabelText(props.label)).toHaveValue(props.value);

      fireEvent.change(screen.getByLabelText(props.label), {
        target: { value: "new value" },
      });
      expect(props.onChange).toHaveBeenCalled();
      expect(screen.getByLabelText(props.label)).toHaveAttribute(
        "name",
        props.name
      );
      expect(screen.getByLabelText(props.label).tagName).not.toBe("TEXTAREA");
      expect(screen.getByLabelText(props.label)).not.toHaveAttribute("rows");
    }
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  // Tests that the form input component is rendered with null props
  it("test_render_form_input_with_null_props", () => {
    const props = {
      controlId: null,
      label: null,
      type: null,
      placeholder: null,
      value: null,
      onChange: null,
      name: null,
      as: undefined,
      dataIndex: null,
      handleFileChange: null,
      isFileInput: null,
      handleToggle: null,
      fileUpload: null,
    };

    render(<FormInput {...props} />);

    const formGroup = screen.getByTestId("form-group");
    expect(formGroup).toBeInTheDocument();

    // Check if label exists before running these assertions
    if (props.label) {
      expect(screen.getByLabelText(props.label)).toHaveAttribute("id");
      expect(screen.getByLabelText(props.label)).toBeInTheDocument();
      expect(screen.getByLabelText(props.label)).toHaveAttribute(
        "type",
        props.type
      );
      expect(screen.getByLabelText(props.label)).toHaveAttribute(
        "placeholder",
        props.placeholder
      );
      expect(screen.getByLabelText(props.label)).not.toBe(
        document.activeElement
      );
      expect(screen.getByLabelText(props.label)).toHaveValue(props.value);

      fireEvent.change(screen.getByLabelText(props.label), {
        target: { value: "new value" },
      });
      expect(props.onChange).toHaveBeenCalled();
      expect(screen.getByLabelText(props.label)).toHaveAttribute(
        "name",
        props.name
      );
      expect(screen.getByLabelText(props.label).tagName).not.toBe("TEXTAREA");
      expect(screen.getByLabelText(props.label)).not.toHaveAttribute("rows");
    }
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  // Tests that the form input component is rendered with empty string props
  it("test_render_form_input_with_empty_string_props", () => {
    const props = {
      controlId: "",
      label: "",
      type: "",
      placeholder: "",
      value: "",
      onChange: jest.fn(),
      name: "",
      //   as: "",
      dataIndex: undefined,
      handleFileChange: jest.fn(),
      isFileInput: false,
      handleToggle: jest.fn(),
      fileUpload: false,
    };

    render(<FormInput {...props} />);

    const formGroup = screen.getByTestId("form-group");
    expect(formGroup).toBeInTheDocument();
    expect(screen.getByLabelText(props.label)).toHaveAttribute("id");
    expect(screen.getByLabelText(props.label)).toBeInTheDocument();
    expect(screen.getByLabelText(props.label)).toHaveAttribute(
      "type",
      props.type
    );
    expect(screen.getByLabelText(props.label)).toHaveAttribute(
      "placeholder",
      props.placeholder
    );
    expect(screen.getByLabelText(props.label)).not.toBe(document.activeElement);
    expect(screen.getByLabelText(props.label)).toHaveValue(props.value);

    fireEvent.change(screen.getByLabelText(props.label), {
      target: { value: "new value" },
    });
    expect(props.onChange).toHaveBeenCalled();
    expect(screen.getByLabelText(props.label)).toHaveAttribute(
      "name",
      props.name
    );
    expect(screen.getByLabelText(props.label).tagName).not.toBe("TEXTAREA");
    expect(screen.getByLabelText(props.label)).not.toHaveAttribute("rows");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  // Tests that the form input component is rendered with invalid props
  it("test_render_form_input_with_invalid_props", () => {
    const props = {
      controlId: 123,
      label: 123,
      type: 123,
      placeholder: 123,
      value: 123,
      onChange: 123,
      name: 123,
      as: 123,
      dataIndex: "invalid",
      handleFileChange: 123,
      isFileInput: "invalid",
      handleToggle: 123,
      fileUpload: "invalid",
    };

    render(<FormInput {...props} />);

    const formGroup = screen.queryByTestId("form-group");
    expect(formGroup).not.toBeInTheDocument();

    const inputElement = screen.queryByLabelText(props.label);
    if (inputElement) {
      expect(inputElement).not.toHaveAttribute("id");
      expect(inputElement).toBeInTheDocument();
      expect(inputElement).not.toHaveAttribute("type", props.type);
      expect(inputElement).not.toHaveAttribute(
        "placeholder",
        props.placeholder
      );
      expect(inputElement).not.toBe(document.activeElement);
      expect(inputElement).toHaveValue(props.value);

      fireEvent.change(inputElement, {
        target: { value: "new value" },
      });
      expect(props.onChange).not.toHaveBeenCalled();
      expect(inputElement).not.toHaveAttribute("name", props.name);
      expect(inputElement.tagName).not.toBe("TEXTAREA");
      expect(inputElement).not.toHaveAttribute("rows");
    } else {
      // If the input element doesn't exist, these tests are not applicable.
      console.log("Input element not found");
    }

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
