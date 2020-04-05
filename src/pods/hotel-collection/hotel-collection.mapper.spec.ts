import { mapFromApiToVm } from "./hotel-collection.mapper";
import * as apiModel from './hotel-collection.api';
import * as viewModel from './hotel-collection.vm';
import { basePicturesUrl } from 'core';

describe('hotel collection mapper specs', () => {
  it('mapFromApiToVm should map hotel properly from api model to view model', () => {
    // Arrange
    const apiHotel: apiModel.HotelEntityApi = {
      "id" : "0248058a-27e4-11e6-ace6-a9876eff01b3",
      "type" : "hotel",
      "name" : "Motif Seattle",
      "created" : new Date(1464777092568),
      "modified" : new Date(1464777618676),
      "address1" : "1415 5th Ave",
      "airportCode" : "SEA",
      "amenityMask" : 7798786,
      "city" : "Seattle",
      "confidenceRating" : 52,
      "countryCode" : "US",
      "deepLink" : "http://www.travelnow.com/templates/55505/hotels/125727/overview?lang=en&amp;currency=USD&amp;standardCheckin=null/null/null&amp;standardCheckout=null/null/null",
      "highRate" : 289,
      "hotelId" : 1257278,
      "hotelInDestination" : true,
      "hotelRating" : 4,
      "location" : {
        "latitude" : 47.60985,
        "longitude" : -122.33475
      },
      "locationDescription" : "Near Pike Place Market",
      "lowRate" : 259,
      "metadata" : {
        "path" : "/hotels/0248058a-27e4-11e6-ace6-a9876eff01b3"
      },
      "postalCode" : 98101,
      "propertyCategory" : 1,
      "proximityDistance" : 11.168453,
      "proximityUnit" : "MI",
      "rateCurrencyCode" : "USD",
      "shortDescription" : "With a stay at Motif Seattle, you will be centrally located in Seattle, steps from 5th Avenue Theater and minutes from Pike Place Market. This 4-star hotel is within",
      "stateProvinceCode" : "WA",
      "thumbNailUrl" : "/thumbnails/50947_264_t.jpg",
      "tripAdvisorRating" : 3.5,
      "tripAdvisorRatingUrl" : "http://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/3.5-12345-4.gif"
    };

    const vmHotel: viewModel.HotelEntityVm = {
      id: apiHotel.id,
      picture: `${basePicturesUrl}${apiHotel.thumbNailUrl}`,
      name: apiHotel.name,
      description: apiHotel.shortDescription,
      rating: apiHotel.hotelRating,
      address: apiHotel.address1,
    };

    // Act
    const result = mapFromApiToVm(apiHotel)

    // Assert
    expect(result).toStrictEqual(vmHotel);
  });
});