import { Amenity, City, Property, Coordinates } from './offer-types';
import UserWithTokenDto from '../user/user-with-token.dto';

export class DetailedOfferDto {
  public id!: string;

  public title!: string;

  public description!: string;

  public postDate!: string;

  public city!: City;

  public previewImage!: string;

  public propertyImages!: string[];

  public isFavorite!: boolean;

  public isPremium!: boolean;

  public rating!: number;

  public price!: number;

  public propertyType!: Property;

  public commentsCount!: number;

  public roomsNumber!: number;

  public guestsNumber!: number;

  public amenities!: Amenity[];

  public user!: UserWithTokenDto;

  public coordinates!: Coordinates;
}
