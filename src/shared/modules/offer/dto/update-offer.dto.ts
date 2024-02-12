import { Property } from '../../../types/property-type.enum.js';
import { Amenity } from '../../../types/amenity-type.enum.js';
import { City } from '../../../types/city.enum.js';

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public postDate?: Date;
  public city?: City;
  public previewImage?: string;
  public propertyImages?: string[];
  public isPremium?: boolean;
  public propertyType?: Property;
  public roomsNumber?: number;
  public guestsNumber?: number;
  public price?: number;
  public amenities?: Amenity[];
}
