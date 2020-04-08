import * as React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { render, fireEvent, waitFor, waitForElement } from '@testing-library/react';
import { LoginContainer } from "./login.container";
import { HotelCollectionScene } from 'scenes';
import * as api from "./login.api";
import * as apiHotels from "../hotel-collection/hotel-collection.api";

const renderWithRouter = component => {
  return {
    ...render(
      <HashRouter>
        <Switch>
          <Route path="/hotel-collection" component={HotelCollectionScene} />
        </Switch>
        {component}
      </HashRouter>
    ),
  };
};

describe('Login container specs', () => {
  it("should trigger validation when both fields are filled and user press the button", async () => {
    // Arrange
    const validateCredentialsStub = jest
      .spyOn(api, "validateCredentials");

    const login = "Pedro";
    const password = "12345"

    // Act
    const { getByTestId } = renderWithRouter(<LoginContainer />);
    const button = getByTestId("button");
    const form = getByTestId("form");
    const nameField = form.childNodes[0].childNodes[1].childNodes[0];
    const passwordField = form.childNodes[1].childNodes[1].childNodes[0];
    await waitFor(() => {
      fireEvent.change(nameField, {
        target: {
          value: login
        }
      });
      fireEvent.change(passwordField, {
        target: {
          value: password
        }
      });
      fireEvent.click(button);
    });

    // Assert
    expect(validateCredentialsStub).toHaveBeenCalled();
    expect(validateCredentialsStub).toHaveBeenCalledWith(login, password);
  });

  it("should not navigate to hotel collection when login is invalid", async () => {
    // Arrange
    const validateCredentialsStub = jest
      .spyOn(api, "validateCredentials",)
      .mockResolvedValue(false);
    const getHotelCollectionStub = jest
      .spyOn(apiHotels, "getHotelCollection")
      .mockResolvedValue([]);

    const login = "Pedro";
    const password = "12345"

    // Act
    const { getByTestId, queryByTestId } = renderWithRouter(<LoginContainer />);
    const button = getByTestId("button");
    const form = getByTestId("form");
    const nameField = form.childNodes[0].childNodes[1].childNodes[0];
    const passwordField = form.childNodes[1].childNodes[1].childNodes[0];
    await waitFor(() => {
      fireEvent.change(nameField, {
        target: {
          value: login
        }
      });
      fireEvent.change(passwordField, {
        target: {
          value: password
        }
      });
      fireEvent.click(button);
    });

    const buttonAfterClick = getByTestId("button");
    const hotelCollectionDiv = queryByTestId("list-div");

    // Assert
    expect(validateCredentialsStub).toHaveBeenCalledWith("Pedro", "12345");
    expect(getHotelCollectionStub).not.toHaveBeenCalled();
    expect(hotelCollectionDiv).not.toBeInTheDocument();
    expect(buttonAfterClick).toBeInTheDocument();
  });

  it("should navigate to hotel collection when login is valid", async () => {
    // Arrange
    const validateCredentialsStub = jest
      .spyOn(api, "validateCredentials")
      .mockResolvedValue(true);
    const getHotelCollectionStub = jest
      .spyOn(apiHotels, "getHotelCollection")
      .mockResolvedValue([]);

    const login = "admin";
    const password = "test";

    // Act
    const { getByTestId, queryByTestId } = renderWithRouter(<LoginContainer />);
    const button = getByTestId("button");
    const form = getByTestId("form");
    const nameField = form.childNodes[0].childNodes[1].childNodes[0];
    const passwordField = form.childNodes[1].childNodes[1].childNodes[0];
    const hotelCollectionDivBeforeClick = queryByTestId("list-div");
    await waitFor(() => {
      fireEvent.change(nameField, {
        target: {
          value: login
        }
      });
      fireEvent.change(passwordField, {
        target: {
          value: password
        }
      });
      fireEvent.click(button);
    });

    const hotelCollectionDiv = await waitForElement(() => getByTestId("list-div"));

    // Assert
    expect(hotelCollectionDivBeforeClick).not.toBeInTheDocument();
    expect(validateCredentialsStub).toHaveBeenCalledWith(login, password);
    expect(getHotelCollectionStub).toHaveBeenCalled();
    expect(hotelCollectionDiv).toBeInTheDocument();
  });
});