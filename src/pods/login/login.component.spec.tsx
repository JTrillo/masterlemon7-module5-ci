import * as React from 'react';
import { render, act, fireEvent, getByLabelText } from '@testing-library/react';
import { LoginComponent } from "./login.component";

describe('Login component specs', () => {
  it('should display a card with 1 form with 2 text fields and 1 button', () => {
    // Arrange
    const props = {
      onLogin: jest.fn(),
      initialLogin: {
        login: '',
        password: '',
      },
    };

    // Act
    const { getByTestId, getByText } = render(<LoginComponent {...props} />);
    const card = getByTestId("card");
    const form = getByTestId("form")
    const loginField = getByText("Name");
    const passwordField = getByText("Password");
    const button = getByTestId("button");

    // Assert
    expect(card).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    expect(loginField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should modify both fields', () => {
    // Arrange
    const props = {
      onLogin: jest.fn(),
      initialLogin: {
        login: 'Pedro',
        password: '12345',
      },
    };

    // Act
    const { getByDisplayValue } = render(<LoginComponent {...props} />);
    const loginField = getByDisplayValue("Pedro") as HTMLInputElement;
    const passwordField = getByDisplayValue("12345") as HTMLInputElement;

    fireEvent.change(loginField, {
      target: {
        value: "Juan"
      }
    });

    fireEvent.change(passwordField, {
      target: {
        value: "54321"
      }
    });

    // Assert
    expect(loginField).toBeInTheDocument();
    expect(loginField.value).toStrictEqual("Juan");
    expect(passwordField).toBeInTheDocument();
    expect(passwordField.value).toStrictEqual("54321");
  });

  /*it('should trigger onLogin function when button is pressed', () => {
    // Arrange
    const onLoginSpy = jest.fn();
    const props = {
      onLogin: onLoginSpy,
      initialLogin: {
        login: 'Pedro',
        password: '12345',
      },
    };

    // Act
    const { getByTestId } = render(<LoginComponent {...props} />);
    const form = getByTestId("form") as HTMLFormElement;

    fireEvent.submit(form);

    // Assert
    expect(onLoginSpy).toHaveBeenCalled();
  });*/
});