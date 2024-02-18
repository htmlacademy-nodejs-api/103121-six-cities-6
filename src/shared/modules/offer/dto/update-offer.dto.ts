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

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10,{ message: UpdateOfferMessage.title.minLength })
  @MaxLength(100, { message: UpdateOfferMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(20, { message: UpdateOfferMessage.description.minLength })
  @MaxLength(1024, { message: UpdateOfferMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: UpdateOfferMessage.postDate.invalidFormat })
  public postDate?: Date;

  @IsOptional()
  @IsEnum(City, { message: UpdateOfferMessage.city.invalid })
  public city?: City;

  @IsOptional()
  @IsString({ message: UpdateOfferMessage.previewImage.invalidFormat })
  @MaxLength(256, { message: UpdateOfferMessage.previewImage.maxLength })
  public previewImage?: string;

  @IsOptional()
  @IsArray({ message: UpdateOfferMessage.propertyImages.invalidFormat })
  @MaxLength(256, { each: true, message: UpdateOfferMessage.propertyImages.maxLength })
  public propertyImages?: string[];

  @IsOptional()
  @IsBoolean({ message: UpdateOfferMessage.isPremium.invalidFormat })
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(Property, { message: UpdateOfferMessage.propertyType.invalid })
  public propertyType?: Property;

  @IsOptional()
  @IsInt({ message: UpdateOfferMessage.roomsNumber.invalidFormat })
  @Min(1, { message: UpdateOfferMessage.roomsNumber.minValue })
  @Max(8, { message: UpdateOfferMessage.roomsNumber.maxValue })
  public roomsNumber?: number;

  @IsOptional()
  @IsInt({ message: UpdateOfferMessage.guestsNumber.invalidFormat })
  @Min(1, { message: UpdateOfferMessage.guestsNumber.minValue })
  @Max(10, { message: UpdateOfferMessage.guestsNumber.maxValue })
  public guestsNumber?: number;

  @IsOptional()
  @IsInt({ message: UpdateOfferMessage.price.invalidFormat })
  @Min(100, { message: UpdateOfferMessage.price.minValue })
  @Max(100000, { message: UpdateOfferMessage.price.maxValue })
  public price?: number;

  @IsOptional()
  @IsArray({ message: UpdateOfferMessage.amenities.invalidFormat })
  @IsEnum(Amenity, { each: true, message: UpdateOfferMessage.amenities.invalid })
  public amenities?: Amenity[];
}
