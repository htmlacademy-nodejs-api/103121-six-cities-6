import {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  MIN_ROOMS_NUMBER,
  MAX_ROOMS_NUMBER,
  MIN_GUESTS_NUMBER,
  MAX_GUESTS_NUMBER,
  MIN_PRICE,
  MAX_PRICE
} from './offer.constant.js';

export const CreateOfferValidationMessage = {
  title: {
    minLength: `Minimum title length must be ${MIN_TITLE_LENGTH}`,
    maxLength: `Maximum title length must be ${MAX_TITLE_LENGTH}`,
  },
  description: {
    minLength: `Minimum description length must be ${MIN_DESCRIPTION_LENGTH}`,
    maxLength: `Maximum description length must be ${MAX_DESCRIPTION_LENGTH}`,
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
    minValue: `Minimum price is ${MIN_ROOMS_NUMBER}`,
    maxValue: `Maximum price is ${MAX_ROOMS_NUMBER}`,
  },
  guestsNumber: {
    invalidFormat: 'guestsNumber must be an integer',
    minValue: `Minimum price is ${MIN_GUESTS_NUMBER}`,
    maxValue: `Maximum price is ${MAX_GUESTS_NUMBER}`,
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: `Minimum price is ${MIN_PRICE}`,
    maxValue: `Maximum price is ${MAX_PRICE}`,
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
