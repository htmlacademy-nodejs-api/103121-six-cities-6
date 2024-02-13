import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';
import { City } from '../../types/city.enum.js';
import { Property } from '../../types/property-type.enum.js';
import { Amenity } from '../../types/amenity-type.enum.js';
import { Coordinates } from '../../types/coordinates.type.js';

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
  }
})

export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({trim: true, required: true})
  public description!: string;

  @prop({required: true})
  public postDate!: Date;

  @prop({
    type: () => String,
    enum: City,
    required: true
  })
  public city!: City;

  @prop({required: true})
  public previewImage!: string;

  @prop({
    type: () => [String],
    default: [],
    required: true
  })
  public propertyImages!: string[];

  @prop({required: true})
  public isPremium!: boolean;

  @prop({
    type: () => String,
    enum: Property,
    required: true
  })
  public propertyType!: Property;

  @prop({required: true})
  public roomsNumber!: number;

  @prop({required: true})
  public guestsNumber!: number;

  @prop({required: true})
  public price!: number;

  @prop({
    default: [],
    type: () => [String],
    required: true,
  })
  public amenities!: Amenity[];

  @prop({default: 0})
  public commentsCount!: number;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({ required: true, type: () => Coordinates })
  public coordinates!: Coordinates;
}

export const OfferModel = getModelForClass(OfferEntity);
