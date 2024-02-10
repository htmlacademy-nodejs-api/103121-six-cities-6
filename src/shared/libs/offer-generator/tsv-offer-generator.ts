import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { generateRandomBoolean, generateRandomString, generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_RATING = 1;
const MAX_RATING = 5;
const RATING_DECIMALS = 1;

const MIN_ROOMS_NUMBER = 1;
const MAX_ROOMS_NUMBER = 8;

const MIN_GUESTS_NUMBER = 1;
const MAX_GUESTS_NUMBER = 8;

const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 12;

const MIN_COMMENTS_COUNT = 0;
const MAX_COMMENTS_COUNT = 100;

const MIN_LATITUDE = -90;
const MAX_LATITUDE = 90;
const MIN_LONGITUDE = -180;
const MAX_LONGITUDE = 180;
const COORDINATES_DECIMALS = 6;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const propertyImages = getRandomItem<string[]>(this.mockData.propertyImages).join(',');
    const isPremium = generateRandomBoolean().toString();
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, RATING_DECIMALS).toString();
    const propertyType = getRandomItem<string>(this.mockData.propertyTypes);
    const roomsNumber = generateRandomValue(MIN_ROOMS_NUMBER, MAX_ROOMS_NUMBER).toString();
    const guestsNumber = generateRandomValue(MIN_GUESTS_NUMBER, MAX_GUESTS_NUMBER).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const amenities = getRandomItems<string>(this.mockData.amenities).join(',');
    const name = getRandomItem(this.mockData.names);
    const email = getRandomItem(this.mockData.emails);
    const avatar = getRandomItem(this.mockData.avatars);
    const password = generateRandomString(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH);
    const userType = getRandomItem(this.mockData.userTypes);
    const commentsCount = generateRandomValue(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT).toString();
    const latitude = generateRandomValue(MIN_LATITUDE, MAX_LATITUDE, COORDINATES_DECIMALS).toString();
    const longitude = generateRandomValue(MIN_LONGITUDE, MAX_LONGITUDE, COORDINATES_DECIMALS).toString();

    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    return [
      title,
      description,
      postDate,
      city,
      previewImage,
      propertyImages,
      isPremium,
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
      longitude,
    ].join('\t');
  }
}
