import { Expose } from 'class-transformer';
import { City } from '../../../types/city.enum.js';
import { Property } from '../../../types/property-type.enum.js';

export class OfferRdo {
  @Expose()
  public title: string;

  @Expose()
  public postDate: string;

  @Expose()
  public city: City;

  @Expose()
  public previewImage: string;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public price: number;

  @Expose()
  public propertyType: Property;

  @Expose()
  public commentsCount: number;
}
