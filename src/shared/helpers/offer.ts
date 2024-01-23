import { Offer, UserType, City, Property, Amenity } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    postDate,
    city,
    previewImage,
    propertyImages,
    isPremium,
    isFavorite,
    rating,
    propertyType,
    roomsNumber,
    guestsNumber,
    price,
    amenities,
    name,
    email,
    avatar,
    password,
    userType,
    commentsCount,
    latitude,
    longitude
  ] = offerData.replace('\n', '').split('\t');

  const user = {
    name,
    email,
    avatar,
    password,
    userType: UserType[userType as keyof typeof UserType]
  };

  const coordinates = {
    latitude: Number.parseFloat(latitude),
    longitude: Number.parseFloat(longitude)
  };

  return {
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
    user,
    commentsCount: Number.parseInt(commentsCount, 10),
    coordinates,
  };
}
