import { Amenity } from '../../../types/amenity-type.enum.js';
import { City } from '../../../types/city.enum.js';
import { Coordinates } from '../../../types/coordinates.type.js';
import { Property } from '../../../types/property-type.enum.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public postDate: Date;
  public city: City;
  public previewImage: string;
  public propertyImages: string[];
  public isPremium: boolean;
  public rating: number;
  public propertyType: Property;
  public roomsNumber: number;
  public guestsNumber: number;
  public price: number;
  public amenities: Amenity[];
  public userId: string;
  public commentsCount: number;
  public coordinates: Coordinates;
}
