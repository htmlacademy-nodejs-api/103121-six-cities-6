import { prop } from '@typegoose/typegoose';

export class Coordinates {
  @prop({ required: true })
    latitude: number;

  @prop({ required: true })
    longitude: number;
}
