import { mapToCollection } from "./collection.mapper";

describe('collection mapper specs', () => {
  it('should return empty array when it feeds null', () => {
    // Arrange
    const fn = jest.fn();
    
    // Act
    const result = mapToCollection(null, fn);

    // Assert
    expect(result).toStrictEqual([]);
    expect(fn).not.toHaveBeenCalled();
  });

  it('should return empty array when it feeds undefined', () => {
    // Arrange
    const fn = jest.fn();
    
    // Act
    const result = mapToCollection(undefined, fn);

    // Assert
    expect(result).toStrictEqual([]);
    expect(fn).not.toHaveBeenCalled();
  });

  it('should execute map function when feeds an array', () => {
    // Arrange
    const array = [1, 2, 3]
    const mapFn = jest.fn();
    
    // Act
    const result = mapToCollection(array, mapFn);

    // Assert
    expect(mapFn).toHaveBeenCalled();
  });
});