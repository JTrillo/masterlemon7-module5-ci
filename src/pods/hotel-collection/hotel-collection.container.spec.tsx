import * as React from 'react';
import { render, waitForElement } from "@testing-library/react";
import { HotelCollectionContainer } from "./hotel-collection.container";
import * as api from "./hotel-collection.api";

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
    const getHotelCollectionStub = jest
      .spyOn(api, "getHotelCollection")
      .mockResolvedValue([
        {
          "id": "0248058a-27e4-11e6-ace6-a9876eff01b3",
          "type": "hotel",
          "name": "Motif Seattle",
          "created": new Date(1464777092568),
          "modified": new Date(1464777618676),
          "address1": "1415 5th Ave",
          "airportCode": "SEA",
          "amenityMask": 7798786,
          "city": "Seattle",
          "confidenceRating": 52,
          "countryCode": "US",
          "deepLink": "http://www.travelnow.com/templates/55505/hotels/125727/overview?lang=en&amp;currency=USD&amp;standardCheckin=null/null/null&amp;standardCheckout=null/null/null",
          "highRate": 289,
          "hotelId": 1257278,
          "hotelInDestination": true,
          "hotelRating": 4,
          "location": {
          "latitude": 47.60985,
          "longitude": -122.33475
          },
          "locationDescription": "Near Pike Place Market",
          "lowRate": 259,
          "metadata": {
          "path": "/hotels/0248058a-27e4-11e6-ace6-a9876eff01b3"
          },
          "postalCode": 98101,
          "propertyCategory": 1,
          "proximityDistance": 11.168453,
          "proximityUnit": "MI",
          "rateCurrencyCode": "USD",
          "shortDescription": "With a stay at Motif Seattle, you will be centrally located in Seattle, steps from 5th Avenue Theater and minutes from Pike Place Market. This 4-star hotel is within",
          "stateProvinceCode": "WA",
          "thumbNailUrl": "/thumbnails/50947_264_t.jpg",
          "tripAdvisorRating": 3.5,
          "tripAdvisorRatingUrl": "http://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/3.5-12345-4.gif"
          },
          {
          "id": "024bd61a-27e4-11e6-ad95-35ed01160e57",
          "type": "hotel",
          "name": "The Westin Seattle",
          "created": new Date(1464777092593),
          "modified": new Date(1464871217352),
          "address1": "1900 5th Ave",
          "airportCode": "SEA",
          "amenityMask": 7806977,
          "city": "Seattle",
          "confidenceRating": 5,
          "countryCode": "US",
          "deepLink": "http://www.travelnow.com/templates/55505/hotels/164122/overview?lang=en&amp;currency=USD&amp;standardCheckin=null/null/null&amp;standardCheckout=null/null/null",
          "highRate": 259,
          "hotelId": 164122,
          "hotelInDestination": true,
          "hotelRating": 4,
          "location": {
          "latitude": 47.61309,
          "longitude": -122.33788
          },
          "locationDescription": "Near Pike Place Market",
          "lowRate": 209,
          "metadata": {
          "path": "/hotels/024bd61a-27e4-11e6-ad95-35ed01160e57"
          },
          "postalCode": 98101,
          "propertyCategory": 1,
          "proximityDistance": 11.335604,
          "proximityUnit": "MI",
          "rateCurrencyCode": "USD",
          "shortDescription": "With a stay at The Westin Seattle, you'll be centrally laocated in Seattle, steps from Westlake Center and minutes from Pacific Place. This 4-star hotel is close to",
          "stateProvinceCode": "WA",
          "thumbNailUrl": "/thumbnails/16673_260_t.jpg",
          "tripAdvisorRating": 4,
          "tripAdvisorRatingUrl": "http://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.0-12345-4.gif"
          }
      ]);

    // Act
    const { getAllByTestId } = render(<HotelCollectionContainer />);
    const hotels = await waitForElement(() => getAllByTestId("hotel-card"));

    // Assert
    expect(getHotelCollectionStub).toHaveBeenCalled();
    expect(hotels.length).toStrictEqual(2);
  });
});