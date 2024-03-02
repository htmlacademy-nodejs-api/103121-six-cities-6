import UserWithTokenDto from '../../dto/user/user-with-token.dto';
import { Comment, Offer, User } from '../../types/types';
import { DetailedOfferDto } from '../../dto/offer/detailed-offer.dto';
import { CityLocation } from '../../const';
import CommentDto from '../../dto/comment/comment.dto';

export const adaptLoginToClient =
  (user: UserWithTokenDto): User => ({
    name: user.name,
    email: user.email,
    avatarUrl: user.avatar,
    token: user.token,
    type: user.userType,
  });

export const adaptOfferToClient =
  (offer: DetailedOfferDto): Offer => ({
    id: offer.id,
    price: offer.price,
    rating: offer.rating,
    title: offer.title,
    isPremium: offer.isPremium,
    isFavorite: offer.isFavorite,
    city: {
      name: offer.city,
      location: CityLocation[offer.city],
    },
    previewImage: offer.previewImage,
    description: offer.description,
    location: offer.coordinates,
    type: offer.propertyType,
    bedrooms: offer.roomsNumber,
    goods: offer.amenities,
    images: offer.propertyImages,
    maxAdults: offer.guestsNumber,
    host: adaptLoginToClient(offer.user),
  });

export const adaptOffersToClient =
  (offers: DetailedOfferDto[]): Offer[] =>
    offers
      .map((offer: DetailedOfferDto) => ({
        id: offer.id,
        price: offer.price,
        rating: offer.rating,
        title: offer.title,
        isPremium: offer.isPremium,
        isFavorite: offer.isFavorite,
        city: {
          name: offer.city,
          location: CityLocation[offer.city],
        },
        previewImage: offer.previewImage,
        description: offer.description,
        publishedDate: offer.postDate,
        location: offer.coordinates,
        type: offer.propertyType,
        bedrooms: offer.roomsNumber,
        goods: offer.amenities,
        commentsCount: offer.commentsCount,
        images: offer.propertyImages,
        maxAdults: offer.guestsNumber,
        host: adaptLoginToClient(offer.user),
      }));

export const adaptCommentToClient =
  (comment: CommentDto): Comment => ({
    id: comment.id,
    comment: comment.text,
    date: comment.postDate,
    rating: comment.rating,
    user: adaptLoginToClient(comment.user),
  });

export const adaptCommentsToClient =
  (comments: CommentDto[]): Comment[] =>
    comments
      .map((comment: CommentDto) => ({
        id: comment.id,
        comment: comment.text,
        date: comment.postDate,
        rating: comment.rating,
        user: adaptLoginToClient(comment.user),
      }));
