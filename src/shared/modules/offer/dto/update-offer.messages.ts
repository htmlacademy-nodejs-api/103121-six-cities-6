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

export const UpdateOfferMessage = {
  title: {
    minLength: `minimum title length is ${MIN_TITLE_LENGTH}`,
    maxLength: `maximum title length is ${MAX_TITLE_LENGTH}`
  },
  description: {
    minLength: `minimum description length is ${MIN_DESCRIPTION_LENGTH}`,
    maxLength: `maximum description length is ${MAX_DESCRIPTION_LENGTH}`,
  },
  postDate: {
    invalidFormat: 'postData must be a valid ISO date',
  },
  city: {
    invalid: 'City must be a valid city',
  },
  previewImage: {
    invalidFormat: 'image is required',
    maxLength: 'Too long for field image'
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
    invalidFormat: 'price must be an integer',
    minValue: `minimum price is ${MIN_PRICE}`,
    maxValue: `maximum price is ${MAX_PRICE}`
  },
  amenities: {
    invalidFormat: 'Field amenities must be an array',
    invalid: 'Amenity must be a valid amenity',
  },
} as const;
