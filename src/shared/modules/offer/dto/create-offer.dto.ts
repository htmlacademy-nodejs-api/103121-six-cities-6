import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  Max,
  MaxLength,
  Min,
  MinLength,
  IsBoolean,
  IsObject,
  ValidateNested
} from 'class-validator';
import { Amenity } from '../../../types/amenity-type.enum.js';
import { City } from '../../../types/city.enum.js';
import { Coordinates } from '../../../types/coordinates.type.js';
import { Property } from '../../../types/property-type.enum.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
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

export class CreateOfferDto {
  @MinLength(MIN_TITLE_LENGTH, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(MAX_TITLE_LENGTH, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(MIN_DESCRIPTION_LENGTH, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(MAX_DESCRIPTION_LENGTH, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsDateString({}, { message: CreateOfferValidationMessage.postDate.invalidFormat })
  public postDate: Date;

  @IsEnum(City, { message: CreateOfferValidationMessage.city.invalid })
  public city: City;

  @MaxLength(IMAGE_URL_MAX_LENGTH, { message: CreateOfferValidationMessage.previewImage.maxLength })
  public previewImage: string;

  @IsArray({ message: CreateOfferValidationMessage.propertyImages.invalidFormat })
  @MaxLength(IMAGE_URL_MAX_LENGTH, { each: true, message: CreateOfferValidationMessage.propertyImages.maxLength })
  public propertyImages: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium: boolean;

  @IsEnum(Property, { message: CreateOfferValidationMessage.propertyType.invalid })
  public propertyType: Property;

  @IsInt({ message: CreateOfferValidationMessage.roomsNumber.invalidFormat })
  @Min(MIN_ROOMS_NUMBER, { message: CreateOfferValidationMessage.roomsNumber.minValue })
  @Max(MAX_ROOMS_NUMBER, { message: CreateOfferValidationMessage.roomsNumber.maxValue })
  public roomsNumber: number;

  @IsInt({ message: CreateOfferValidationMessage.guestsNumber.invalidFormat })
  @Min(MIN_GUESTS_NUMBER, { message: CreateOfferValidationMessage.guestsNumber.minValue })
  @Max(MAX_GUESTS_NUMBER, { message: CreateOfferValidationMessage.guestsNumber.maxValue })
  public guestsNumber: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(MIN_PRICE, { message: CreateOfferValidationMessage.price.minValue })
  @Max(MAX_PRICE, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsArray({ message: CreateOfferValidationMessage.amenities.invalidFormat })
  @IsEnum(Amenity, { each: true, message: CreateOfferValidationMessage.amenities.invalid })
  public amenities: Amenity[];

  public userId: string;

  @IsObject({ message: CreateOfferValidationMessage.coordinates.invalidFormat })

  @ValidateNested()
  public coordinates: Coordinates;
}
