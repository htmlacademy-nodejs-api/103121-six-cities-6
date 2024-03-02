import { City, Property, Coordinates } from './offer-types';

export default class CreateOfferDto {
  public title!: string;

  public description!: string;

  public postDate!: Date;

  public city!: City;

  public previewImage!: string;

  public propertyImages!: string[];

  public isPremium!: boolean;

  public propertyType!: Property;

  public roomsNumber!: number;

  public guestsNumber!: number;

  public price!: number;

  public amenities!: string[];

  public coordinates!: Coordinates;
}
