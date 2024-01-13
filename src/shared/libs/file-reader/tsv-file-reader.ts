import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Offer } from '../../types/offer.type.js';
import { City } from '../../types/city.enum.js';
import { Property } from '../../types/property-type.enum.js';
import { Amenity } from '../../types/amenity-type.enum.js';
import { UserType } from '../../types/user-type.enum.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, postDate, city, previewImage, propertyImages, isPremium, isFavorite, rating, propertyType, roomsNumber, guestsNumber, price, amenities, name, email, avatar, password, userType, commentsCount, latitude, longitude]) => ({
        title,
        description,
        postDate: new Date(postDate),
        city: City[city as keyof typeof City],
        previewImage,
        propertyImages: propertyImages.split(','),
        isPremium: Boolean(isPremium),
        isFavorite: Boolean(isFavorite),
        rating: Number.parseFloat(rating),
        propertyType: Property[propertyType as keyof typeof Property],
        roomsNumber: Number.parseInt(roomsNumber, 10),
        guestsNumber: Number.parseInt(guestsNumber, 10),
        price: Number.parseInt(price, 10),
        amenities: amenities.split(',').map((item) => Amenity[item as keyof typeof Amenity]),
        user: { name, email, avatar, password, userType: UserType[userType as keyof typeof UserType] },
        commentsCount: Number.parseInt(commentsCount, 10),
        coordinates: { latitude: Number.parseFloat(latitude), longitude: Number.parseFloat(longitude) },
      }));
  }
}
