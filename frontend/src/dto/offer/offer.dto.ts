import { City, Property } from './offer-types';

export class OfferDto {
  public title!: string;

  public postDate!: string;

  public city!: City;

  public previewImage!: string;

  public isFavorite!: boolean;

  public isPremium!: boolean;

  public rating!: number;

  public price!: number;

  public propertyType!: Property;

  public commentsCount!: number;
}
