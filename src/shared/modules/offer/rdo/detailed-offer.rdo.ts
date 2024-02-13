import { Expose } from 'class-transformer';
import { City } from '../../../types/city.enum.js';
import { Property } from '../../../types/property-type.enum.js';
import { Amenity } from '../../../types/amenity-type.enum.js';
import { Coordinates } from '../../../types/coordinates.type.js';

export class DetailedOfferRdo {
  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public postDate: string;

  @Expose()
  public city: City;

  @Expose()
  public previewImage: string;

  @Expose()
  public propertyImages: string[];

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

  @Expose()
  public roomsNumber: number;

  @Expose()
  public guestsNumber: number;

  @Expose()
  public amenities: Amenity[];

  @Expose()
  public coordinates: Coordinates;
}
