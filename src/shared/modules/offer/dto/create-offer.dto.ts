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

export class CreateOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsDateString({}, { message: CreateOfferValidationMessage.postDate.invalidFormat })
  public postDate: Date;

  @IsEnum(City, { message: CreateOfferValidationMessage.city.invalid })
  public city: City;

  @MaxLength(256, { message: CreateOfferValidationMessage.previewImage.maxLength })
  public previewImage: string;

  @IsArray({ message: CreateOfferValidationMessage.propertyImages.invalidFormat })
  @MaxLength(256, { each: true, message: CreateOfferValidationMessage.propertyImages.maxLength })
  public propertyImages: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium: boolean;

  @IsEnum(Property, { message: CreateOfferValidationMessage.propertyType.invalid })
  public propertyType: Property;

  @IsInt({ message: CreateOfferValidationMessage.roomsNumber.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.roomsNumber.minValue })
  @Max(8, { message: CreateOfferValidationMessage.roomsNumber.maxValue })
  public roomsNumber: number;

  @IsInt({ message: CreateOfferValidationMessage.guestsNumber.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.guestsNumber.minValue })
  @Max(10, { message: CreateOfferValidationMessage.guestsNumber.maxValue })
  public guestsNumber: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsArray({ message: CreateOfferValidationMessage.amenities.invalidFormat })
  @IsEnum(Amenity, { each: true, message: CreateOfferValidationMessage.amenities.invalid })
  public amenities: Amenity[];

  public userId: string;

  @IsObject({ message: CreateOfferValidationMessage.coordinates.invalidFormat })

  @ValidateNested()
  public coordinates: Coordinates;
}
