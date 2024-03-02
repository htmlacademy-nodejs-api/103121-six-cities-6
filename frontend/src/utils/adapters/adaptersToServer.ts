import CreateOfferDto from '../../dto/offer/create-offer.dto';
import CreateUserDto from '../../dto/user/create-user.dto';
import { Comment, UserRegister } from '../../types/types';
import { NewOffer, Offer } from '../../types/types';
import { City, Property } from '../../dto/offer/offer-types';
import { capitalize } from '../../utils';
import CreateCommentDto from '../../dto/comment/create-comment.dto';
import UpdateOfferDto from '../../dto/offer/update-offer.dto';

export const adaptSignupToServer =
  (user: UserRegister): CreateUserDto => ({
    name: user.name,
    email: user.email,
    password: user.password,
    userType: user.type,
  });

export const adaptAvatarToServer =
  (file: string) => {
    const formData = new FormData();
    formData.set('avatar', file);

    return formData;
  };

export const adaptCreateOfferToServer =
  (offer: NewOffer): CreateOfferDto => ({
    price: offer.price,
    title: offer.title,
    postDate: new Date(),
    isPremium: offer.isPremium,
    city: City[offer.city.name as keyof typeof City],
    previewImage: offer.previewImage,
    description: offer.description,
    coordinates: offer.location,
    propertyType: Property[capitalize(offer.type) as keyof typeof Property],
    roomsNumber: offer.bedrooms,
    amenities: offer.goods,
    propertyImages: offer.images,
    guestsNumber: offer.maxAdults,
  });

export const adaptUpdateOfferToServer =
(offer: Offer): UpdateOfferDto => ({
  price: offer.price,
  title: offer.title,
  postDate: new Date(),
  isPremium: offer.isPremium,
  city: City[offer.city.name as keyof typeof City],
  previewImage: offer.previewImage,
  description: offer.description,
  propertyType: Property[capitalize(offer.type) as keyof typeof Property],
  roomsNumber: offer.bedrooms,
  amenities: offer.goods,
  propertyImages: offer.images,
  guestsNumber: offer.maxAdults,
});

export const adaptCreateCommentToServer =
  (comment: Omit<Comment, 'date' | 'user'>): CreateCommentDto => ({
    offerId: comment.id,
    text: comment.comment,
    rating: comment.rating,
  });
