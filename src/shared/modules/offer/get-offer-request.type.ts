import { Request } from 'express';
import { RequestBody } from '../../libs/rest/index.js';
import { DetailedOfferRdo } from './rdo/detailed-offer.rdo.js';
import { ParamOfferId } from './types/param-offerid.type.js';

export type GetOfferRequestType = Request<ParamOfferId, RequestBody, DetailedOfferRdo>;
