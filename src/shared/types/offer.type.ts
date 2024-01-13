import { Amenity } from './amenity-type.enum.js';
import { City } from './city.enum.js';
import { Coordinates } from './coordinates.type.js';
import { Property } from './property-type.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  previewImage: string;
  propertyImages: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  propertyType: Property;
  roomsNumber: number;
  guestsNumber: number;
  price: number;
  amenities: Amenity[];
  user: User;
  commentsCount: number;
  coordinates: Coordinates;
}
