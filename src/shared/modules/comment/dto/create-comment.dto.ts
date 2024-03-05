import { IsMongoId, IsString, Length, IsNumber, Min, Max } from 'class-validator';
import { CreateCommentMessages } from './create-comment.messages.js';
import {
  MIN_COMMENT_TEXT_LENGTH,
  MAX_COMMENT_TEXT_LENGTH,
  MIN_COMMENT_RATING,
  MAX_COMMENT_RATING
} from './comment.constant.js';

export class CreateCommentDto {
  @IsString({ message: CreateCommentMessages.text.invalidFormat })
  @Length(
    MIN_COMMENT_TEXT_LENGTH,
    MAX_COMMENT_TEXT_LENGTH,
    { message: CreateCommentMessages.text.lengthField }
  )
  public text: string;

  @IsMongoId({ message: CreateCommentMessages.offerId.invalidFormat })
  public offerId: string;

  @IsNumber({}, { message: CreateCommentMessages.rating.invalidFormat })
  @Min(MIN_COMMENT_RATING, { message: CreateCommentMessages.rating.minValue })
  @Max(MAX_COMMENT_RATING, { message: CreateCommentMessages.rating.maxValue })
  public rating: number;

  public userId: string;
}
