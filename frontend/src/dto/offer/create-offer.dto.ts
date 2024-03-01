import { Amenity, City, Property, Coordinates } from './offer-types';

export class CreateOfferDto {
  public title!: string;

  public description: string;

  public postDate!: Date;

  public city!: City;

  public propertyImages!: string[];

  public isPremium!: boolean;

  public propertyType!: Property;

  public roomsNumber!: number;

  public guestsNumber!: number;

  public price!: number;

  public amenities!: Amenity[];

  public userId!: string;

  public coordinates!: Coordinates;
}
