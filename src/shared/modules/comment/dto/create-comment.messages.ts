import {
  MIN_COMMENT_TEXT_LENGTH,
  MAX_COMMENT_TEXT_LENGTH,
  MIN_COMMENT_RATING,
  MAX_COMMENT_RATING
} from './comment.constant.js';

export const CreateCommentMessages = {
  text: {
    invalidFormat: 'text is required',
    lengthField: `min length is ${MIN_COMMENT_TEXT_LENGTH}, max is ${MAX_COMMENT_TEXT_LENGTH}`
  },
  offerId: {
    invalidFormat: 'offerId field must be a valid id'
  },
  rating: {
    invalidFormat: 'rating must be a number',
    minValue: `Minimum rating is ${MIN_COMMENT_RATING}`,
    maxValue: `Maximum rating is ${MAX_COMMENT_RATING}`,
  },
} as const;
