export const CreateOfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  postDate: {
    invalidFormat: 'postDate must be a valid ISO date',
  },
  city: {
    invalid: 'City must be a valid city',
  },
  previewImage: {
    maxLength: 'Too long for previewImage',
  },
  propertyImages: {
    invalidFormat: 'Field propertyImages must be an array',
    maxLength: 'Too long for propertyImages',
  },
  isPremium: {
    invalidFormat: 'isPremium must be a boolean',
  },
  propertyType: {
    invalid: 'Property type must be a valid property type',
  },
  roomsNumber: {
    invalidFormat: 'roomsNumber must be an integer',
  },
  guestsNumber: {
    invalidFormat: 'guestsNumber must be an integer',
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 200000',
  },
  amenities: {
    invalidFormat: 'Field amenities must be an array',
    invalid: 'Amenity must be a valid amenity',
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  },
  coordinates: {
    invalidFormat: 'Field coordinates must be an object',
    invalidLatitude: 'Latitude must be a valid number',
    invalidLongitude: 'Longitude must be a valid number',
  },
} as const;
