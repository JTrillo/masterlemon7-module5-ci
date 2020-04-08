import * as React from 'react';
import { render } from "@testing-library/react";
import { basePicturesUrl } from "core";
import { HotelCollectionComponent } from "./hotel-collection.component";

describe('Hotel collection component specs', () => {
  it('should display component with zero hotels', () => {
    // Arrange
    const props = {
      hotelCollection: []
    };

    // Act
    const { getByTestId } = render(<HotelCollectionComponent {...props} />)
    const divElement = getByTestId("list-div") as HTMLDivElement;

    // Assert
    expect(divElement).toBeInTheDocument();
  });

  it('should display component with two hotels', () => {
    // Arrange
    const props = {
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
      ]
    };

    // Act
    const { getByTestId, queryAllByTestId } = render(<HotelCollectionComponent {...props} />)
    const divElement = getByTestId("list-div") as HTMLDivElement;
    const hotels = queryAllByTestId("hotel-card")

    // Assert
    expect(divElement).toBeInTheDocument();
    expect(hotels.length).toStrictEqual(2);
  });
});