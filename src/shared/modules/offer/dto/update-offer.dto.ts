import { Property } from '../../../types/property-type.enum.js';
import { Amenity } from '../../../types/amenity-type.enum.js';
import { City } from '../../../types/city.enum.js';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  IsArray,
  IsBoolean
} from 'class-validator';
import { UpdateOfferMessage } from './update-offer.messages.js';
import {
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  IMAGE_URL_MAX_LENGTH,
  MIN_ROOMS_NUMBER,
  MAX_ROOMS_NUMBER,
  MIN_GUESTS_NUMBER,
  MAX_GUESTS_NUMBER,
  MIN_PRICE,
  MAX_PRICE
} from './offer.constant.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(MIN_TITLE_LENGTH,{ message: UpdateOfferMessage.title.minLength })
  @MaxLength(MAX_TITLE_LENGTH, { message: UpdateOfferMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(MIN_DESCRIPTION_LENGTH, { message: UpdateOfferMessage.description.minLength })
  @MaxLength(MAX_DESCRIPTION_LENGTH, { message: UpdateOfferMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: UpdateOfferMessage.postDate.invalidFormat })
  public postDate?: Date;

  @IsOptional()
  @IsEnum(City, { message: UpdateOfferMessage.city.invalid })
  public city?: City;

  @IsOptional()
  @IsString({ message: UpdateOfferMessage.previewImage.invalidFormat })
  @MaxLength(IMAGE_URL_MAX_LENGTH, { message: UpdateOfferMessage.previewImage.maxLength })
  public previewImage?: string;

  @IsOptional()
  @IsArray({ message: UpdateOfferMessage.propertyImages.invalidFormat })
  @MaxLength(IMAGE_URL_MAX_LENGTH, { each: true, message: UpdateOfferMessage.propertyImages.maxLength })
  public propertyImages?: string[];

  @IsOptional()
  @IsBoolean({ message: UpdateOfferMessage.isPremium.invalidFormat })
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(Property, { message: UpdateOfferMessage.propertyType.invalid })
  public propertyType?: Property;

  @IsOptional()
  @IsInt({ message: UpdateOfferMessage.roomsNumber.invalidFormat })
  @Min(MIN_ROOMS_NUMBER, { message: UpdateOfferMessage.roomsNumber.minValue })
  @Max(MAX_ROOMS_NUMBER, { message: UpdateOfferMessage.roomsNumber.maxValue })
  public roomsNumber?: number;

  @IsOptional()
  @IsInt({ message: UpdateOfferMessage.guestsNumber.invalidFormat })
  @Min(MIN_GUESTS_NUMBER, { message: UpdateOfferMessage.guestsNumber.minValue })
  @Max(MAX_GUESTS_NUMBER, { message: UpdateOfferMessage.guestsNumber.maxValue })
  public guestsNumber?: number;

  @IsOptional()
  @IsInt({ message: UpdateOfferMessage.price.invalidFormat })
  @Min(MIN_PRICE, { message: UpdateOfferMessage.price.minValue })
  @Max(MAX_PRICE, { message: UpdateOfferMessage.price.maxValue })
  public price?: number;

  @IsOptional()
  @IsArray({ message: UpdateOfferMessage.amenities.invalidFormat })
  @IsEnum(Amenity, { each: true, message: UpdateOfferMessage.amenities.invalid })
  public amenities?: Amenity[];
}
