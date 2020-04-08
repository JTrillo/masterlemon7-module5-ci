import * as React from "react";
import { render } from "@testing-library/react";
import { FieldInputProps } from 'react-final-form';
import { TextField } from "./text-field";

describe('Text Field common component specs', () => {
  it('should display the Material UI component with no error when meta.error and meta.touched are false', () => {
    // Arrange
    const props = {
      input: {
        name: "inputText",
        value: "",
        onBlur: jest.fn(),
        onChange: jest.fn(),
        onFocus: jest.fn()
      } as FieldInputProps<any,any>,
      meta: "",
      testIdDiv: "muiDiv",
      testIdInput: "muiInput",
    };

    // Act
    const { getByTestId } = render(<TextField {...props} />);
    const divElement = getByTestId("muiDiv") as HTMLDivElement;
    const inputElement = getByTestId("muiInput") as HTMLInputElement;

    // Assert
    expect(divElement).toBeInTheDocument();
    expect(divElement.childElementCount).toStrictEqual(1);
    expect(inputElement).toBeInTheDocument();
  });

  it('should display the Material UI component with an error when meta.error and meta.touched are true', () => {
    // Arrange
    const props = {
      input: {
        name: "inputText",
        value: "",
        onBlur: jest.fn(),
        onChange: jest.fn(),
        onFocus: jest.fn()
      } as FieldInputProps<any,any>,
      meta: {
        error: true,
        touched: true,
      },
      testIdDiv: "muiDiv",
      testIdInput: "muiInput",
    };

    // Act
    const { getByTestId } = render(<TextField {...props} />);
    const divElement = getByTestId("muiDiv") as HTMLDivElement;
    const inputElement = getByTestId("muiInput") as HTMLInputElement;
    const errorElement = divElement.childNodes[1] as HTMLParagraphElement;

    // Assert
    expect(divElement).toBeInTheDocument();
    expect(divElement.childElementCount).toStrictEqual(2);
    expect(errorElement.className).toStrictEqual("MuiFormHelperText-root Mui-error");
    expect(inputElement).toBeInTheDocument();
  });
});