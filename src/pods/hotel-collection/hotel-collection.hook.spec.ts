import { renderHook, act } from "@testing-library/react-hooks";
import { useHotelCollection } from "./hotel-collection.hook";
import * as api from './hotel-collection.api';
import * as common from 'common/mappers';
import * as mapper from './hotel-collection.mapper';
import * as vm from './hotel-collection.vm';
import { basePicturesUrl } from "core";

describe('hotel collection hook specs', () => {
  it('should return empty array and loadHotelCollection function when it calls the hook', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useHotelCollection());

    // Assert
    expect(result.current.hotelCollection).toStrictEqual([]);
    expect(result.current.loadHotelCollection).toEqual(expect.any(Function));
  });

  it('should return an array with hotels when calls loadHotelCollection', async () => {
    // Arrange
    const hotelsApi: api.HotelEntityApi[] = [
      {
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
      }
    ];
    const getHotelCollectionStub = jest
      .spyOn(api, 'getHotelCollection')
      .mockResolvedValue(hotelsApi);
    
    const mapToCollectionSpy = jest
      .spyOn(common, 'mapToCollection');

    const mapFromApiToVmSpy = jest
      .spyOn(mapper, 'mapFromApiToVm');

    const hotelsVm: vm.HotelEntityVm[] = [
      {
        id: "0248058a-27e4-11e6-ace6-a9876eff01b3",
        picture: `${basePicturesUrl}/thumbnails/50947_264_t.jpg`,
        name: "Motif Seattle",
        description: "With a stay at Motif Seattle, you will be centrally located in Seattle, steps from 5th Avenue Theater and minutes from Pike Place Market. This 4-star hotel is within",
        rating: 4,
        address: "1415 5th Ave",
      },
    ];

    // Act
    const { result, waitForNextUpdate } = renderHook(() => useHotelCollection());
    
    act(() => {
      result.current.loadHotelCollection();
    });
    await waitForNextUpdate();

    // Assert
    expect(getHotelCollectionStub).toHaveBeenCalled();
    expect(mapToCollectionSpy).toHaveBeenCalled();
    expect(mapFromApiToVmSpy).toHaveBeenCalledTimes(hotelsApi.length);
    expect(result.current.hotelCollection).toStrictEqual(hotelsVm);
  })
});