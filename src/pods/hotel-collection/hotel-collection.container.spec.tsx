import * as React from 'react';
import { render, waitForElement } from "@testing-library/react";
import { HotelCollectionContainer } from "./hotel-collection.container";
import { basePicturesUrl } from "core";
import * as hooks from './hotel-collection.hook';

describe("Hotel collection container specs", () => {
  it("should not display hotels before useEffect", () => {
    // Arrange

    // Act
    const { queryAllByTestId } = render(<HotelCollectionContainer />);
    const hotels = queryAllByTestId("hotel-card");

    // Assert
    expect(hotels.length).toStrictEqual(0);
  });

  it("should display two hotels after useEffect", async () => {
    // Arrange
    const loadHotelCollectionSpy = jest.fn();
    const useHotelCollectionStub = jest
      .spyOn(hooks, "useHotelCollection")
      .mockReturnValue({
        hotelCollection: [
          {
            id: "hotel1",
            picture: `${basePicturesUrl}/thumbnails/50947_264_t.jpg`,
            name: "Motif Seattle",
            description: "With a stay at Motif Seattle, you will be centrally located in Seattle, steps from 5th Avenue Theater and minutes from Pike Place Market. This 4-star hotel is within",
            rating: 4,
            address: "1415 5th Ave",
          },
          {
            id: "hotel2",
            picture: `${basePicturesUrl}/thumbnails/50947_264_t.jpg`,
            name: "Motif Seattle",
            description: "With a stay at Motif Seattle, you will be centrally located in Seattle, steps from 5th Avenue Theater and minutes from Pike Place Market. This 4-star hotel is within",
            rating: 4,
            address: "1415 5th Ave",
          }
        ],
        loadHotelCollection: loadHotelCollectionSpy
      });

    // Act
    const { getAllByTestId } = render(<HotelCollectionContainer />);
    const hotels = await waitForElement(() => getAllByTestId("hotel-card"));

    // Assert
    expect(loadHotelCollectionSpy).toHaveBeenCalled();
    expect(hotels.length).toStrictEqual(2);
  });
});