export const UpdateOfferMessage = {
  title: {
    minLength: 'minimum title length is 10',
    maxLength: 'maximum title length is 100'
  },
  description: {
    minLength: 'minimum description length is 20',
    maxLength: 'maximum description length is 1024',
  },
  postDate: {
    invalidFormat: 'postData must be a valid ISO date',
  },
  city: {
    invalid: 'City must be a valid city',
  },
  previewImage: {
    invalidFormat: 'image is required',
    maxLength: 'too long for field image. Maximum length is 256'
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
    minValue: 'Minimum price is 1',
    maxValue: 'Maximum price is 8',
  },
  guestsNumber: {
    invalidFormat: 'guestsNumber must be an integer',
    minValue: 'Minimum price is 1',
    maxValue: 'Maximum price is 10',
  },
  price: {
    invalidFormat: 'price must be an integer',
    minValue: 'minimum price is 100',
    maxValue: 'maximum price is 20000'
  },
  amenities: {
    invalidFormat: 'Field amenities must be an array',
    invalid: 'Amenity must be a valid amenity',
  },
} as const;
